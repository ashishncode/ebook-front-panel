import React, { useState, useRef, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Col from "react-bootstrap/Col";
import LoginStyle from "../../assets/css/LogIn.module.css";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { decode } from "base-64"; // Base64 decoding library
import CryptoJS from "crypto-js"; // AES decryption library
import ColumnGroup from "antd/es/table/ColumnGroup";
import jwt_decode from "jwt-decode";
import jwtDecode from "jwt-decode";
import { notification } from "antd";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import { resetPasswordUser } from "../../utility/api";

const ResetPassword = ({ match }) => {
  const [isTokenExpired, setIsTokenExpired] = useState(true);
  const [password, setPassword] = useState("");

  const { email, token } = useParams();
  const [isTokenValid, setIsTokenValid] = useState(true);

  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);
  const navigate = useNavigate();
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const showChangePasswordNotification = () => {
    notification.success({
      message: "Password Reset Successfully",
      description: "You have successfully reset your password.",
    });
  };
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

  const validatePassword = () => {
    const passwordRegex =
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

    if (password?.trim() === "") {
      setPasswordError("Please enter your new password");
      return false;
    } else if (password?.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      return false;
    } else if (!passwordRegex?.test(password)) {
      setPasswordError(
        "Password must be strong (at least one uppercase letter, one lowercase letter, one digit and one special character from [@$!%*?&])"
      );
      return false;
    }
    setPasswordError("");
    return true;
  };

  const validateConfirmPassword = () => {
    if (confirmPassword?.trim() === "") {
      setConfirmPasswordError("Please enter your confirm password");
      return false;
    } else if (confirmPassword !== password) {
      setConfirmPasswordError("Your password does not match");
      return false;
    }
    setConfirmPasswordError("");
    return true;
  };
  const tokenExpiredNotification = () => {
    notification.success({
      message: "Your Password Can't Change!",
      description:
        "Your Password token has expired please resend email and try again.",
    });
  };
  const handlePasswordReset = async (e) => {
    e.preventDefault();

    const isPasswordValid = validatePassword();
    const isConfirmPasswordValid = validateConfirmPassword();
    try {
      if (isPasswordValid && isConfirmPasswordValid) {
        const data = {
          email: email,
          password,
          confirmPassword,
        };

        resetPasswordUser(token, data).then((response) => {
          if (response.status === 200) {
            setMessage(response.data.message);
            setPassword("");
            setConfirmPassword("");
            passwordRef.current.value = "";
            confirmPasswordRef.current.value = "";
            setMessage("Passwords Reset Successfully.");
            showChangePasswordNotification();
            navigate("/login");
          }
        });
      } else {
        setMessage("Your password does not match.");
      }
    } catch (error) {
      if (error.response) {
        if (error?.response?.status === 400) {
          tokenExpiredNotification();
        }
      }
    }
  };
  return (
    <div>
      {isTokenExpired ? (
        <div className={LoginStyle.login_main}>
          <div className={LoginStyle.login_page}>
            <h2>Reset Password</h2>
            <Form>
              <Row className={`mb-12 ${LoginStyle.contactus_fild}`}>
                <Form.Group as={Col} md="12" controlId="validationCustom01">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    required
                    type={showPassword ? "password" : "text"}
                    name="password"
                    ref={passwordRef}
                    placeholder="Enter new password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <div className={LoginStyle.email_icon}>
                    <a onClick={togglePassword}>
                      {showPassword ? (
                        <EyeOutlined />
                      ) : (
                        <EyeInvisibleOutlined />
                      )}
                    </a>
                  </div>
                  {passwordError && (
                    <span className="text-danger">{passwordError}</span>
                  )}
                </Form.Group>
              </Row>
              <Row className={`mb-12 ${LoginStyle.contactus_fild}`}>
                <Form.Group as={Col} md="12" controlId="validationCustom04">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    type={showConfirmPassword ? "password" : "text"}
                    name="password"
                    ref={confirmPasswordRef}
                    placeholder="Enter your confirm password"
                    required
                    onChange={(e) => setConfirmPassword(e.target.value)}
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

                  {confirmPasswordError && (
                    <span className="text-danger">{confirmPasswordError}</span>
                  )}
                </Form.Group>
              </Row>
              <Button onClick={handlePasswordReset}>Reset Password</Button>
            </Form>
          </div>
        </div>
      ) : (
        <p>
          Sorry, this link has expired. Please request a new password reset
          link.
        </p>
      )}
    </div>
  );
};

export default ResetPassword;
