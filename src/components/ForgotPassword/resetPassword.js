import React, { useState, useRef, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import Col from "react-bootstrap/Col";
import LoginStyle from "../../assets/css/LogIn.module.css";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import { decode } from 'base-64'; // Base64 decoding library
import CryptoJS from 'crypto-js'; // AES decryption library
import ColumnGroup from 'antd/es/table/ColumnGroup';
import jwt_decode from "jwt-decode";
import jwtDecode from 'jwt-decode';
import { notification } from 'antd';

const ResetPassword = ({ match }) => {
    const [isTokenExpired, setIsTokenExpired] = useState(true);
    const [password, setPassword] = useState('');
    // const { email, token, timestampFromURL } = useParams();
    const { email, token } = useParams();
    const [isTokenValid, setIsTokenValid] = useState(true);
    console.log(token, "my token")
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    // const { email } = useParams();
    const passwordRef = useRef(null);
    const confirmPasswordRef = useRef(null)
    const navigate = useNavigate()
    const showChangePasswordNotification = () => {
        notification.success({
            message: 'Password Reset Successfully',
            description: 'You have successfully reset your password.',
        });
    };
    const handlePasswordReset = async (e) => {
        e.preventDefault();
        if (password == confirmPassword) {
            const response = await axios.post(`http://10.16.16.108:7000/api/reset-password/${token}`, { email: email, password, confirmPassword });
            setMessage(response.data.message);
            setPassword('');
            setConfirmPassword('');
            passwordRef.current.value = '';
            confirmPasswordRef.current.value = '';
            setMessage("Passwords Reset Successfully.");
            showChangePasswordNotification()
            navigate('/login')
        } else {
            setMessage('Your password does not match.');
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
                                        type="text"
                                        name="password"
                                        ref={passwordRef}
                                        placeholder="Enter new password"
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </Form.Group>
                            </Row>
                            <Row className={`mb-12 ${LoginStyle.contactus_fild}`}>
                                <Form.Group as={Col} md="12" controlId="validationCustom04">
                                    <Form.Label>Confirm Password</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="password"
                                        ref={confirmPasswordRef}
                                        placeholder="Enter your confirm password"
                                        required
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                    />
                                </Form.Group>
                            </Row>
                            <Button onClick={handlePasswordReset}>Reset Password</Button>
                            {/* <Row className={`mb-12 ${LoginStyle.contactus_fild}`}>
                                <Form.Group as={Col} md="12" controlId="validationCustom04">
                                    <Form.Control
                                        type="hidden"
                                        name="email"
                                        value={email}
                                    // onChange={e => setEmail(e.target.value)}
                                    />
                                </Form.Group>
                            </Row> */}
                            {/* <Row className={`mb-12 ${LoginStyle.contactus_fild}`}>
                                <Form.Group as={Col} md="12" controlId="validationCustom04">
                                    <Form.Control
                                        type="text"
                                        name="token"
                                        value={token}
                                    // onChange={e => setEmail(e.target.value)}
                                    />
                                </Form.Group>
                            </Row> */}
                            <p>{message}</p>
                        </Form>
                    </div>
                </div>
            ) : (
                <p>Sorry, this link has expired. Please request a new password reset link.</p>
            )
            }
        </div >
    );
};

export default ResetPassword;