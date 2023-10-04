import { useState, useContext } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import ContinueGoogle from "../../assets/images/continue_google.png";
import ContinueFacebook from "../../assets/images/continue_facebook.png";
import EmailIcon from "../../assets/images/email_icon.png";
import ViewIcon from "../../assets/images/view_icon.png";
import LoginStyle from "../../assets/css/LogIn.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { useForm } from 'react-hook-form';
import { notification } from 'antd';
// import ChangePassword from "../../pages/ChangePassword";

function Login(props) {
  // const [email, setEmail] = useState('')
  // console.log(email, "this is email")
  // const navigate = useNavigate()
  // const defaultValues = {
  //   email: '',
  //   password: '',
  //   myCheckbox: '',
  // };
  // const {
  //   register,
  //   handleSubmit,
  //   reset,
  //   setError,
  //   formState: { errors } } =
  //   useForm({ defaultValues });

  // const showLoginSuccessNotification = () => {
  //   notification.success({
  //     message: 'Login Successful',
  //     description: 'You have been successfully logged in.',
  //   });
  // };
  // const incorrectPasswordNotification = () => {
  //   notification.success({
  //     message: 'incorrect password',
  //     description: 'Please enter valid password.',
  //   });
  // };

  // const onSubmit = async (data) => {
  //   setEmail(data.email)
  //   try {
  //     const response = await axios.post('http://10.16.16.108:7000/loginnewuser', data, {
  //       headers: {
  //         'Authorization': `Bearer ${localStorage.getItem('token')}` // Add your token
  //       }
  //     }).then((response) => {
  //       // console.log(data.email, "Data found here");
  //       showLoginSuccessNotification();
  //       reset();
  //       localStorage.setItem('userEmail', data.email);
  //       console.log(localStorage, "localll storage")
  //       setEmail(localStorage.userEmail)
  //       navigate('/dashboard')
  //       // navigate(`/changePassword/${email}`, { userEmail: email })
  //       console.log(response.data.message, "My login data"); // Password changed successfully
  //     })
  //   } catch (error) {
  //     if (error.response && error.response.data) {
  //       setError('currentPassword', { type: 'manual', message: error.response.data.message });
  //       incorrectPasswordNotification()
  //     }
  //   }
  // };

  const [email, setEmail] = useState('');
  console.log(email, "this is email");
  const navigate = useNavigate();
  const defaultValues = {
    email: '',
    password: '',
    myCheckbox: '',
  };
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors }
  } = useForm({ defaultValues });

  const showLoginSuccessNotification = () => {
    notification.success({
      message: 'Login Successful',
      description: 'You have been successfully logged in.',
    });
  };
  const showUserNotFoundNotification = () => {
    notification.error({
      message: 'User Not Found',
      description: 'The provided email does not exist.',
    });
  };
  const showIncorrectPasswordNotification = () => {
    notification.error({
      message: 'Incorrect Password',
      description: 'Please enter a valid password.',
    });
  };

  const onSubmit = async (data) => {
    setEmail(data.email);
    try {
      const response = await axios.post('http://10.16.16.108:7000/loginnewuser', data, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}` // Add your token
        }
      });
      if (response.status === 200) {
        // Login successful
        showLoginSuccessNotification();
        reset();
        localStorage.setItem('userEmail', data.email);
        setEmail(localStorage.userEmail);
        navigate('/dashboard');
      } else if (response.status === 404) {
        // User not found
        showUserNotFoundNotification();
      } else {
        // Other status codes or errors
        showUserNotFoundNotification();
      }
      console.log(response.data.message, "My login data");
    } catch (error) {
      if (error.response && error.response.data) {
        // setError('password', { type: 'manual', message: error.response.data.message });
        showIncorrectPasswordNotification();
      }
    }
  };


  return (
    <>
      <div className={LoginStyle.login_main}>
        <div className={LoginStyle.login_page}>
          <h2>Log In</h2>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Row className={`mb-12 ${LoginStyle.contactus_fild}`}>
              <Form.Group as={Col} md="12" controlId="email">
                <Form.Label>Email*</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="example@email.com"
                  defaultValue="example@email.com"
                  {...register("email", { required: 'Email is required' })}
                  isInvalid={errors?.email}
                />
                <div className={LoginStyle.email_icon}>
                  <a href="/">
                    <img src={EmailIcon} />
                  </a>
                </div>
                {/* <Form.Control.Feedback>Email is required</Form.Control.Feedback> */}
                {errors?.email && (
                  <Form.Control.Feedback type="invalid">
                    {errors?.email?.message}
                  </Form.Control.Feedback>
                )}
              </Form.Group>
            </Row>
            <Row className={`mb-12 ${LoginStyle.contactus_fild}`}>
              <Form.Group as={Col} md="12" controlId="password">
                <Form.Label>Password*</Form.Label>
                <Form.Control
                  type="text"
                  name="password"
                  placeholder="Enter your password"
                  {...register("password", { required: 'Password is required' })}
                  isInvalid={errors?.password}
                />
                <div className={LoginStyle.email_icon}>
                  <a href="/">
                    <img src={ViewIcon} />
                  </a>
                </div>
                {/* <Form.Control.Feedback type="invalid">
                  Password is required
                </Form.Control.Feedback> */}
                {errors?.password && (
                  <Form.Control.Feedback type="invalid">
                    {errors?.password?.message}
                  </Form.Control.Feedback>
                )}
              </Form.Group>
            </Row>
            <div className={LoginStyle.keep_logged_text}>
              <Form.Group className={`mb-3 ${LoginStyle.keep_logged}`}>
                <Form.Check
                  required
                  type="checkbox"
                  label="Keep me logged in"
                  feedbackType="invalid"
                  {...register('myCheckbox')}
                />
              </Form.Group>
              <div className={LoginStyle.forget_password}>
                <NavLink to="/ForgotPassword">Forget password?</NavLink>
              </div>
            </div>
            <div className={LoginStyle.login_btn}>
              <Button type="submit">Log In</Button>
            </div>
          </Form>
          <div className={LoginStyle.login_or_text}>
            <span>Or</span>
          </div>
          <div className={LoginStyle.continue_google_facebook}>
            <div className={LoginStyle.continue_google}>
              <a href="/">
                <img src={ContinueGoogle} />
              </a>
            </div>
            <div className={LoginStyle.continue_facebook}>
              <a href="/">
                <img src={ContinueFacebook} />
              </a>
            </div>
          </div>
          <div className={LoginStyle.have_an_account_text}>
            Have an account? <NavLink to="/SignUp">Sign up</NavLink>
          </div>
        </div>
      </div>
      {/* <ChangePassword
        email={email}
      /> */}
    </>
  );
}

export default Login;
