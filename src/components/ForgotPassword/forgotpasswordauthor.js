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
import { notification } from "antd";
import { useFormik } from "formik";
import * as Yup from "yup";
import { forgotPasswordAuthor } from "../../utility/api";

const ForgotPasswordAuthor = () => {
  const [message, setMessage] = useState("");
  const forgetRef = useRef(null);

  const sendEmailNotification = () => {
    notification.success({
      message: "Email sent successfully",
      description: "Check the email in your inbox.",
    });
  };

  // Create a Yup validation schema
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email")
      .required("Please enter your registered email"),
  });

  // Initialize useFormik hook with the validation schema
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (data) => {
      try {
        forgotPasswordAuthor(data).then((response) => {
          if (response.status === 200) {
            sendEmailNotification();
            if (forgetRef.current) {
              forgetRef.current.value = "";
            }
          }
        });
      } catch (error) {
        setMessage("Error sending email. Please check the email address.");
      }
    },
  });

  return (
    <>
      <div className={ForgotpasswordStyle.login_main}>
        <div className={ForgotpasswordStyle.login_page}>
          <h2>Forgot Password?</h2>
          <Form noValidate onSubmit={formik.handleSubmit}>
            <Row className={`mb-12 ${ForgotpasswordStyle.contactus_fild}`}>
              <Form.Group as={Col} md="12" controlId="validationCustom01">
                <Form.Label>Email*</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="example@email.com"
                  name="email"
                  value={formik.values.email}
                  ref={forgetRef}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  isInvalid={formik.touched.email && formik.errors.email}
                />
                <div className={ForgotpasswordStyle.email_icon}>
                  <a>
                    <img src={EmailIcon} alt="Email Icon" />
                  </a>
                </div>
                <Form.Control.Feedback type="invalid">
                  {formik.errors.email}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <div className={ForgotpasswordStyle.login_btn}>
              <Button type="submit">Forgot Password</Button>
            </div>
            <div className={ForgotpasswordStyle.have_an_account_text}>
              Have an account? <NavLink to="/authorloginpage">Log In</NavLink>
            </div>
            <div className="text-danger">{message}</div>
          </Form>
        </div>
      </div>
    </>
  );
};

export default ForgotPasswordAuthor;
