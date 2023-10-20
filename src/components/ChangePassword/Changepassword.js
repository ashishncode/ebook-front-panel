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
import axios from "axios";
import { useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { notification } from "antd";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";

const Changepassword = () => {
  const navigate = useNavigate();
  const [Oldpassword, setOldpassword] = useState("");
  const [newpassword, setNewpassword] = useState("");
  const [PasswordConfirm, setPasswordConfirm] = useState("");
  const [oldPasswordError, setOldPasswordError] = useState("");
  const [newPasswordError, setNewPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const oldPass = useRef(null);
  const newPass = useRef(null);
  const confirmPass = useRef(null);
  const [showCurrentPassword, setShowCurrentPassword] = useState(true);
  const [showNewPassword, setShowNewPassword] = useState(true);
  const [showConfirmPassword, setShowConfirmPassword] = useState(true);

  const toggleCurrentPassword = () => {
    setShowCurrentPassword(false);
    setTimeout(() => {
      setShowCurrentPassword(true);
    }, 1000); // 3000 milliseconds (3 seconds)
  };
  const toggleNewPassword = () => {
    setShowNewPassword(false);
    setTimeout(() => {
      setShowNewPassword(true);
    }, 1000); // 3000 milliseconds (3 seconds)
  };
  const toggleConfirmPassword = () => {
    setShowConfirmPassword(false);
    setTimeout(() => {
      setShowConfirmPassword(true);
    }, 1000); // 3000 milliseconds (3 seconds)
  };
  const validateOldPassword = () => {
    if (!Oldpassword) {
      setOldPasswordError("Please enter your current password");
      return false;
    }
    setOldPasswordError("");
    return true;
  };

  const validateNewPassword = () => {
    const passwordRegex =
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    if (!newpassword) {
      setNewPasswordError("Please enter your new password");
      return false;
    } else if (newpassword.length < 6) {
      setNewPasswordError("Password should be at least 6 characters long.");
      return false;
    } else if (!passwordRegex?.test(newpassword)) {
      setNewPasswordError(
        "Password must be strong (at least one uppercase letter, one lowercase letter, one digit and one special character from [@$!%*?&])"
      );
      return false;
    }
    setNewPasswordError("");
    return true;
  };

  const validateConfirmPassword = () => {
    if (!PasswordConfirm) {
      setConfirmPasswordError("Please enter your confirm new password");
      return false;
    } else if (newpassword !== PasswordConfirm) {
      setConfirmPasswordError("Passwords does not match.");
      return false;
    }
    setConfirmPasswordError("");
    return true;
  };

  const showChangePasswordNotification = () => {
    notification.success({
      message: "Password Changed Successfully",
      description: "You have successfully changed your password.",
    });
  };
  const InCorrectPasswordNotification = () => {
    notification.success({
      message: "Password Error",
      description: "Old password is wrong.",
    });
  };

  const author = localStorage.getItem("authortype");

  const email = author
    ? localStorage.getItem("authorEmail")
    : localStorage.getItem("userEmail");

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const isOldPasswordValid = validateOldPassword();
    const isNewPasswordValid = validateNewPassword();
    const isConfirmPasswordValid = validateConfirmPassword();

    if (isOldPasswordValid && isNewPasswordValid && isConfirmPasswordValid) {
      try {
        if (author) {
          await axios
            .post(`http://10.16.16.108:7000/api/changepassword/author`, {
              Oldpassword,
              newpassword,
              PasswordConfirm,
              email,
            })
            .then((response) => {
              showChangePasswordNotification();
              oldPass.current.value = "";
              newPass.current.value = "";
              confirmPass.current.value = "";
              localStorage.removeItem("authortype");
              navigate("/AuthorLoginPage");
            });
        } else {
          await axios
            .post(`http://10.16.16.108:7000/api/changepassword`, {
              Oldpassword,
              newpassword,
              PasswordConfirm,
              email,
            })
            .then((response) => {
              showChangePasswordNotification();
              oldPass.current.value = "";
              newPass.current.value = "";
              confirmPass.current.value = "";
              localStorage.removeItem("userEmail");
              navigate("/login");
            });
        }
      } catch (error) {
        if (error?.response?.status === 401) {
          InCorrectPasswordNotification();
        }
      }
    } else {
      <p>Hello</p>;
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
                        // required
                        type={showCurrentPassword ? "password" : "text"}
                        placeholder="Current password"
                        ref={oldPass}
                        name="Oldpassword"
                        value={Oldpassword}
                        onChange={(e) => setOldpassword(e.target.value)}
                      />
                      <div className={ChangepasswordStyle.email_icon}>
                        <a onClick={toggleCurrentPassword}>
                          {showCurrentPassword ? (
                            <EyeOutlined />
                          ) : (
                            <EyeInvisibleOutlined />
                          )}
                        </a>
                      </div>
                      {oldPasswordError && (
                        <span className="text-danger">{oldPasswordError}</span>
                      )}
                    </Form.Group>
                  </Row>
                  <Row
                    className={`mb-12 ${ChangepasswordStyle.contactus_fild}`}
                  >
                    <Form.Group as={Col} md="12" controlId="validationCustom01">
                      <Form.Label>New password*</Form.Label>
                      <Form.Control
                        // required
                        type={showNewPassword ? "password" : "text"}
                        placeholder="New password"
                        ref={newPass}
                        name="newpassword"
                        value={newpassword}
                        onChange={(e) => setNewpassword(e.target.value)}
                      />
                      <div className={ChangepasswordStyle.email_icon}>
                        <a onClick={toggleNewPassword}>
                          {showNewPassword ? (
                            <EyeOutlined />
                          ) : (
                            <EyeInvisibleOutlined />
                          )}
                        </a>
                      </div>
                      {newPasswordError && (
                        <span className="text-danger">{newPasswordError}</span>
                      )}
                    </Form.Group>
                  </Row>
                  <Row
                    className={`mb-12 ${ChangepasswordStyle.contactus_fild}`}
                  >
                    <Form.Group as={Col} md="12" controlId="validationCustom01">
                      <Form.Label>Confirm new password</Form.Label>
                      <Form.Control
                        // required
                        type={showConfirmPassword ? "password" : "text"}
                        ref={confirmPass}
                        placeholder="Confirm new password"
                        name="PasswordConfirm"
                        value={PasswordConfirm}
                        onChange={(e) => setPasswordConfirm(e.target.value)}
                      />
                      <div className={ChangepasswordStyle.email_icon}>
                        <a onClick={toggleConfirmPassword}>
                          {showConfirmPassword ? (
                            <EyeOutlined />
                          ) : (
                            <EyeInvisibleOutlined />
                          )}
                        </a>
                      </div>
                      {confirmPasswordError && (
                        <span className="text-danger">
                          {confirmPasswordError}
                        </span>
                      )}
                    </Form.Group>
                  </Row>
                  <div className={ChangepasswordStyle.login_btn}>
                    <Button type="submit">Submit</Button>
                  </div>
                  <Row>
                    <Form.Group as={Col} md="12" controlId="validationCustom04">
                      <Form.Control type="hidden" name="email" value={email} />
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
};
export default Changepassword;
