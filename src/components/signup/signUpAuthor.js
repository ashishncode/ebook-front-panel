import React from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import Row from "react-bootstrap/Row";
import { useForm } from "react-hook-form";
import ContinueGoogle from "../../assets/images/continue_google.png";
import ContinueFacebook from "../../assets/images/continue_facebook.png";
import EmailIcon from "../../assets/images/email_icon.png";
import ViewIcon from "../../assets/images/view_icon.png";
import LoginStyle from "../../assets/css/LogIn.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import { notification } from "antd";

const SignupAuthor = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(true);
  const [showConfirmPassword, setShowConfirmPassword] = useState(true);
  const togglePassword = () => {
    setShowPassword(false);
    setTimeout(() => {
      setShowPassword(true);
    }, 1000); // 3000 milliseconds (3 seconds)
  };
  const toggleConfirmPassword = () => {
    setShowConfirmPassword(false);
    setTimeout(() => {
      setShowConfirmPassword(true);
    }, 1000); // 3000 milliseconds (3 seconds)
  };
  const defaultValues = {
    email: "",
    password: "",
  };
  const {
    register,
    watch,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ defaultValues });
  const signUpSuccessfullyNotification = () => {
    notification.success({
      message: "Signed Up Successfully",
      description: "You have successfully created your account.",
    });
  };
  const emailAlreadyRegistredNotification = () => {
    notification.success({
      message: "SignUp Cancel",
      description: "Email already registered please enter new email.",
    });
  };
  const onSubmit = async (data) => {
    try {
      // Make a POST request to your signup API endpoint.
      delete data.confirmPassword;
      const response = await axios.post(
        "http://10.16.16.108:7000/api/signupnew-author",
        data
      );
      // If the signup is successful, show a success notification.
      if (response.status === 201) {
        signUpSuccessfullyNotification();
        reset(); // Clear the form
        navigate("/authorloginpage");
      } else {
        // Handle other success cases or errors here if needed.
      }
    } catch (error) {
      // Handle errors, such as a duplicate email or password mismatch.
      if (error.response) {
        if (error?.response?.status === 400) {
          emailAlreadyRegistredNotification();
        } else if (error?.response?.status === 401) {
          toast.error("Password and confirm password do not match.");
        } else {
          toast.error("Signup failed. Please try again later.");
        }
      } else {
        toast.error("Signup failed. Please try again later.");
      }
    }
  };

  return (
    <>
      <div className={LoginStyle.login_main}>
        <div className={LoginStyle.login_page}>
          <h2>Author Sign Up</h2>
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
                />
                <div className={LoginStyle.email_icon}>
                  <a>
                    <img alt="logo" src={EmailIcon} />
                  </a>
                </div>
                {errors?.email && (
                  <span className="text-danger">{errors?.email?.message}</span>
                )}
              </Form.Group>
            </Row>
            <Row className={`mb-12 ${LoginStyle.contactus_fild}`}>
              <Form.Group as={Col} md="12" controlId="validationCustom04">
                <Form.Label>Password*</Form.Label>
                <Form.Control
                  type={showPassword ? "password" : "text"}
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
                        "Password must be strong (at least one uppercase letter, one lowercase letter, one digit, and 8 characters long)",
                    },
                  })}
                />
                <div className={LoginStyle.email_icon}>
                  <a onClick={togglePassword}>
                    {showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                  </a>
                </div>
                {errors.password && (
                  <span className="text-danger">{errors.password.message}</span>
                )}
              </Form.Group>
            </Row>
            <Row className={`mb-12 ${LoginStyle.contactus_fild}`}>
              <Form.Group as={Col} md="12" controlId="validationCustom04">
                <Form.Label>Confirm password*</Form.Label>
                <Form.Control
                  type={showConfirmPassword ? "password" : "text"}
                  name="confirmPassword"
                  placeholder="Confirm your password"
                  {...register("confirmPassword", {
                    required: "Please enter your confirm password",
                    validate: (match) => {
                      if (match !== watch("password")) {
                        return "The password that you entered do not match!";
                      }
                    },
                  })}
                />
                <div className={LoginStyle.email_icon}>
                  <a onClick={toggleConfirmPassword}>
                    {showConfirmPassword ? (
                      <EyeOutlined />
                    ) : (
                      <EyeInvisibleOutlined />
                    )}
                  </a>
                </div>
                {errors.confirmPassword && (
                  <span className="text-danger">
                    {errors.confirmPassword.message}
                  </span>
                )}
              </Form.Group>
            </Row>
            <div className={LoginStyle.login_btn}>
              <Button type="submit">Sign Up</Button>
            </div>
          </Form>
          <div className={LoginStyle.login_or_text}>
            <span>Or</span>
          </div>
          <div className={LoginStyle.continue_google_facebook}>
            <div className={LoginStyle.continue_google}>
              <a href="/">
                <img alt="logo" src={ContinueGoogle} />
              </a>
            </div>
            <div className={LoginStyle.continue_facebook}>
              <a href="/">
                <img alt="logo" src={ContinueFacebook} />
              </a>
            </div>
          </div>
          <div className={LoginStyle.have_an_account_text}>
            Have an account? <NavLink to="/authorloginpage">Log In</NavLink>
          </div>
        </div>
      </div>
      {/* {email}
      <br />
      {password}
      <br />
      {confirmPassword} */}
    </>
  );
};

export default SignupAuthor;
