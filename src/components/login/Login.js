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
import { useForm } from "react-hook-form";
import { notification } from "antd";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";

const Login = (props) => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(true);
  const togglePassword = () => {
    setShowPassword(false);
    setTimeout(() => {
      setShowPassword(true);
    }, 1000); // 3000 milliseconds (3 seconds)
  };
  const defaultValues = {
    email: "",
    password: "",
    myCheckbox: "",
  };
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm({ defaultValues });

  const showLoginSuccessNotification = () => {
    notification.success({
      message: "Login Successful",
      description: "You have been successfully logged in.",
    });
  };
  const showUserNotFoundNotification = () => {
    notification.error({
      message: "User Not Found",
      description: "Please signup first after login.",
    });
  };
  const showIncorrectPasswordNotification = () => {
    notification.error({
      message: "Incorrect Password",
      description: "Please enter a valid password.",
    });
  };

  const showInnternalServerNotification = () => {
    notification.error({
      message: "Internal Server Error",
      description: "Something went wrong",
    });
  };
  const showInactiveAccountNotification = () => {
    notification.error({
      message: "Inactive Account error",
      description:
        "Inactive account not permitted for login first do active your account.",
    });
  };

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        "http://10.16.16.108:7000/api/loginnewuser",
        data,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Add your token
          },
        }
      );
      if (response.status === 200) {
        console.log(response, "login response");
        // Login successful
        showLoginSuccessNotification();
        reset();
        console.log(response, "user detail");
        localStorage.setItem("userEmail", data.email);

        navigate("/dashboard");
      }
    } catch (error) {
      if (error?.response?.status === 404) {
        showUserNotFoundNotification();
      } else if (error?.response?.status === 401) {
        showIncorrectPasswordNotification();
      } else if (error?.response?.status === 500) {
        showInnternalServerNotification();
      } else if (error?.response?.status === 406) {
        showInactiveAccountNotification();
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
                  {...register("email", {
                    required: "Please enter your email",
                  })}
                  isInvalid={errors?.email}
                />
                <div className={LoginStyle.email_icon}>
                  <a>
                    <img src={EmailIcon} />
                  </a>
                </div>
                {/* <Form.Control.Feedback>Email is required</Form.Control.Feedback> */}
                {errors?.email && (
                  <span className="text-danger">{errors?.email?.message}</span>
                )}
              </Form.Group>
            </Row>
            <Row className={`mb-12 ${LoginStyle.contactus_fild}`}>
              <Form.Group as={Col} md="12" controlId="password">
                <Form.Label>Password*</Form.Label>
                <Form.Control
                  type={showPassword ? "password" : "text"}
                  name="password"
                  placeholder="Enter your password"
                  {...register("password", {
                    required: "Please enter your password",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters long",
                    },
                    pattern: {
                      value:
                        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
                      message:
                        "Password must be strong (at least one uppercase letter, one lowercase letter, one digit and one special character from [@$!%*?&])",
                    },
                  })}
                />
                {/* <div className={LoginStyle.email_icon}>
                  <a href="/">
                    <img src={ViewIcon} />
                  </a>
                </div> */}
                <div className={LoginStyle.email_icon}>
                  <a onClick={togglePassword}>
                    {showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                  </a>
                </div>

                {errors?.password && (
                  <span className="text-danger">
                    {errors?.password?.message}
                  </span>
                )}
              </Form.Group>
            </Row>
            <div className={LoginStyle.keep_logged_text}>
              <Form.Group className={`mb-3 ${LoginStyle.keep_logged}`}>
                <Form.Check
                  type="checkbox"
                  label="Keep me logged in"
                  feedbackType="invalid"
                  {...register("myCheckbox")}
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
};

export default Login;
