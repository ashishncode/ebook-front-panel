import { useState, useRef } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import EmailIcon from "../../assets/images/email_icon.png";
import ForgotpasswordStyle from "../../assets/css/LogIn.module.css";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { notification } from 'antd';
// import ResetPassword from "./resetPassword";


function Forgotpassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const forgetRef = useRef(null);
  // const showErrorNotification = (error) => {
  //   notification.error({
  //     message: 'Login Error',
  //     description: error.message || 'An error occurred during login.',
  //   });
  // };
  const sendEmailNotification = () => {
    notification.success({
      message: 'Email sent successfully',
      description: 'Check the email in your inbox.',
    });
  };
  const handleForgotPassword = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post('http://10.16.16.108:7000/api/forgot-password', { email });
      setMessage(response.data.message, "fogot password successfully");
      sendEmailNotification()
      if (forgetRef.current) {
        forgetRef.current.value = '';
      }
    } catch (error) {
      setMessage('Error sending email. Please check the email address.');
      window.alert("Error sending mail");
    }
  };
  //For validation code
  const [validated, setValidated] = useState(false);
  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
  };

  return (
    <>
      <div className={ForgotpasswordStyle.login_main}>
        <div className={ForgotpasswordStyle.login_page}>
          <h2>Forgot Password?</h2>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Row className={`mb-12 ${ForgotpasswordStyle.contactus_fild}`}>
              <Form.Group as={Col} md="12" controlId="validationCustom01">
                <Form.Label>Email*</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="example@email.com"
                  defaultValue="example@email.com"
                  value={email}
                  ref={forgetRef}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <div className={ForgotpasswordStyle.email_icon}>
                  <a href="/">
                    <img src={EmailIcon} />
                  </a>
                </div>
                <Form.Control.Feedback>Email is required</Form.Control.Feedback>
              </Form.Group>
            </Row>
            <div className={ForgotpasswordStyle.login_btn}>
              <Button type="submit" onClick={handleForgotPassword}>Forgot Password</Button>
            </div>
            <div className={ForgotpasswordStyle.have_an_account_text}>
              Have an account? <NavLink to="/Login">Log In</NavLink>
            </div>
          </Form>
        </div>
      </div>
      {/* <ResetPassword
        email={email}
      /> */}
    </>
  );
}

export default Forgotpassword;
