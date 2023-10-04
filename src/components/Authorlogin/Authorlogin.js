import { useState } from "react";
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

function Authorlogin() {
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
      <div className={LoginStyle.login_main}>
        <div className={LoginStyle.login_page}>
          <h2>Author Log In</h2>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Row className={`mb-12 ${LoginStyle.contactus_fild}`}>
              <Form.Group as={Col} md="12" controlId="validationCustom01">
                <Form.Label>Email*</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="example@email.com"
                  defaultValue="example@email.com"
                />
                <div className={LoginStyle.email_icon}>
                  <a href="/">
                    <img src={EmailIcon} />
                  </a>
                </div>
                <Form.Control.Feedback>Email is required</Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row className={`mb-12 ${LoginStyle.contactus_fild}`}>
              <Form.Group as={Col} md="12" controlId="validationCustom04">
                <Form.Label>Password*</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your password"
                  required
                />
                <div className={LoginStyle.email_icon}>
                  <a href="/">
                    <img src={ViewIcon} />
                  </a>
                </div>
                <Form.Control.Feedback type="invalid">
                  Password is required
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <div className={LoginStyle.keep_logged_text}>
              <Form.Group className={`mb-3 ${LoginStyle.keep_logged}`}>
                <Form.Check
                  required
                  label="Keep me logged in"
                  feedbackType="invalid"
                />
              </Form.Group>
              <div className={LoginStyle.forget_password}>
                <a href="/">Forget password?</a>
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
            Have an account? <a href="/">Sign Up</a>
          </div>
        </div>
      </div>
    </>
  );
}

export default Authorlogin;
