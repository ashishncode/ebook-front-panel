import { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import { useForm } from 'react-hook-form';
import ContinueGoogle from "../../assets/images/continue_google.png";
import ContinueFacebook from "../../assets/images/continue_facebook.png";
import EmailIcon from "../../assets/images/email_icon.png";
import ViewIcon from "../../assets/images/view_icon.png";
import LoginStyle from "../../assets/css/LogIn.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import SignupWithGoogle from "../common/googleSignUp";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { notification } from 'antd';


function Signup() {
  const navigate = useNavigate()
  const defaultValues = {
    email: '',
    password: '',
    confirmPassword: '',
  };
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors } } =
    useForm({ defaultValues });
  const signUpSuccessfullyNotification = () => {
    notification.success({
      message: 'Signed Up Successfully',
      description: 'You have successfully created your account.',
    });
  };
  const onSubmit = async (data) => {
    try {
      // Make a POST request to your signup API endpoint.
      const response = await axios.post('http://10.16.16.108:7000/signupnewuser', data);
      // If the signup is successful, show a success notification.
      if (response.status === 201) {
        signUpSuccessfullyNotification()
        reset(); // Clear the form
        navigate("/Login")
      } else {
        // Handle other success cases or errors here if needed.
      }
    } catch (error) {
      // Handle errors, such as a duplicate email or password mismatch.
      if (error.response) {
        if (error.response.status === 400) {
          toast.error('Email is already registered.');
        } else if (error.response.status === 401) {
          toast.error('Password and confirm password do not match.');
        } else {
          toast.error('Signup failed. Please try again later.');
        }
      } else {
        toast.error('Signup failed. Please try again later.');
      }
    }
  };

  return (
    <>
      <div className={LoginStyle.login_main}>
        <div className={LoginStyle.login_page}>
          <h2>Sign Up</h2>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Row className={`mb-12 ${LoginStyle.contactus_fild}`}>
              <Form.Group as={Col} md="12" controlId="email">
                <Form.Label>Email*</Form.Label>
                <Form.Control
                  type="text"
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
                {errors?.email && (
                  <Form.Control.Feedback type="invalid">
                    {errors?.email?.message}
                  </Form.Control.Feedback>
                )}
              </Form.Group>
            </Row>
            <Row className={`mb-12 ${LoginStyle.contactus_fild}`}>
              <Form.Group as={Col} md="12" controlId="validationCustom04">
                <Form.Label>Password*</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your password"
                  required
                  {...register("password")}
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
            <Row className={`mb-12 ${LoginStyle.contactus_fild}`}>
              <Form.Group as={Col} md="12" controlId="validationCustom04">
                <Form.Label>Confirm password*</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Confirm your password"
                  required
                  {...register("confirmPassword")}
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
            Have an account? <NavLink to="/Login">Log In</NavLink>
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
}

export default Signup;
