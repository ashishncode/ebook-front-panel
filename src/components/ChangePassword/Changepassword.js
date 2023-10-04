import { useState, useRef } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import ViewIcon from "../../assets/images/view_icon.png";
import ChangepasswordStyle from "../../assets/css/changepassword.module.css";
import Sidebar from "../common/Sidebar";
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import { notification } from 'antd';


function Changepassword() {
  const navigate = useNavigate()
  const [Oldpassword, setOldpassword] = useState('');
  const [newpassword, setNewpassword] = useState('');
  const [PasswordConfirm, setPasswordConfirm] = useState('');
  const oldPass = useRef(null);
  const newPass = useRef(null);
  const confirmPass = useRef(null);
  const showChangePasswordNotification = () => {
    notification.success({
      message: 'Password Changed Successfully',
      description: 'You have successfully changed your password.',
    });
  };
  const email = localStorage.getItem('userEmail');
  console.log('username gggg:', email);
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (newpassword !== PasswordConfirm) {
      console.log('Password do not match');
      return;
    }
    try {
      const response = await axios.post(`http://10.16.16.108:7000/api/changepassword`, {
        Oldpassword,
        newpassword,
        PasswordConfirm,
        email,
      }).then((response) => {
        console.log('Password changed successfully');
        showChangePasswordNotification();
        oldPass.current.value = '';
        newPass.current.value = '';
        confirmPass.current.value = '';
        navigate('/login')
      })
      if (response.data.success) {
        console.log('Password changed successfully');
      } else {
        console.error('Error changing password:', response.data.error);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  return (
    <>
      <div className="common-container">
        <div className={ChangepasswordStyle.change_password_page}>
          <Sidebar />
          <div className={ChangepasswordStyle.change_password_right}>
            <div className={ChangepasswordStyle.login_main}>
              <div className={ChangepasswordStyle.login_page}>
                <h2>Change Password</h2>
                <Form onSubmit={handleFormSubmit}>
                  <Row
                    className={`mb-12 ${ChangepasswordStyle.contactus_fild}`}
                  >
                    <Form.Group as={Col} md="12" controlId="validationCustom01">
                      <Form.Label>Current password*</Form.Label>
                      <Form.Control
                        required
                        type="text"
                        placeholder="Current password"
                        defaultValue="Current password"
                        ref={oldPass}
                        name="Oldpassword"
                        value={Oldpassword}
                        onChange={(e) => setOldpassword(e.target.value)}
                      />
                      <div className={ChangepasswordStyle.email_icon}>
                        <a href="/">
                          <img src={ViewIcon} />
                        </a>
                      </div>
                      <Form.Control.Feedback>
                        Current password is required
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Row>
                  <Row
                    className={`mb-12 ${ChangepasswordStyle.contactus_fild}`}
                  >
                    <Form.Group as={Col} md="12" controlId="validationCustom01">
                      <Form.Label>New password*</Form.Label>
                      <Form.Control
                        required
                        type="text"
                        placeholder="New password"
                        defaultValue="New password"
                        ref={newPass}
                        name="newpassword"
                        value={newpassword}
                        onChange={(e) => setNewpassword(e.target.value)}
                      />
                      <div className={ChangepasswordStyle.email_icon}>
                        <a href="/">
                          <img src={ViewIcon} />
                        </a>
                      </div>
                      <Form.Control.Feedback>
                        Current password is required
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Row>
                  <Row
                    className={`mb-12 ${ChangepasswordStyle.contactus_fild}`}
                  >
                    <Form.Group as={Col} md="12" controlId="validationCustom01">
                      <Form.Label>Confirm new password</Form.Label>
                      <Form.Control
                        required
                        type="text"
                        ref={confirmPass}
                        placeholder="Confirm new password"
                        defaultValue="Confirm new password"
                        name="PasswordConfirm"
                        value={PasswordConfirm}
                        onChange={(e) => setPasswordConfirm(e.target.value)}
                      />
                      <div className={ChangepasswordStyle.email_icon}>
                        <a href="/">
                          <img src={ViewIcon} />
                        </a>
                      </div>
                      <Form.Control.Feedback>
                        Current password is required
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Row>
                  <div className={ChangepasswordStyle.login_btn}>
                    <Button type="submit">Submit</Button>
                  </div>
                  <Row >
                    <Form.Group as={Col} md="12" controlId="validationCustom04">
                      <Form.Control
                        type="hidden"
                        name="email"
                        value={email}
                      />
                    </Form.Group>
                  </Row>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}
export default Changepassword;
