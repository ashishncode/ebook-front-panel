import { useState, useEffect } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import editprofileStyle from "../../assets/css/editprofile.module.css";
import { Tooltip } from "antd";
import Sidebar from "../common/Sidebar";
import { useForm, useWatch } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Modal } from "antd";
import { notification } from "antd";
import {
  updateAuthorProfie,
  updateUserProfile,
  getEditAuthorData,
  getEditUserData,
} from "../../utility/api";

const Editprofile = () => {
  const userEmail = localStorage.getItem("userEmail");
  const authorEmail = localStorage.getItem("authorEmail");
  const author = localStorage.getItem("authortype");
  const authorToken = localStorage.getItem("authorToken");

  const emailValue = author ? authorEmail : userEmail;
  const [getUserData, setUserData] = useState([]);
  const [getAuthorData, setAuthorData] = useState([]);

  const navigate = useNavigate();
  const defaultValues = {
    email: "",
    password: "",
    myCheckbox: "",
  };
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    setError,
    formState: { errors },
  } = useForm();
  const text = <span>View</span>;
  const refund = <span>Download</span>;

  const handleProfilePictureUpload = async (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        // Set the base64 data in the form field
        setValue("profilePicture", reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const showUserProfileNotification = () => {
    notification.success({
      message: "Update Successfully",
      description: "User Profile updated Successfully.",
    });
  };
  const showAthorProfileNotification = () => {
    notification.success({
      message: "Update Successfully",
      description: "Author Profile updated Successfully.",
    });
  };

  const showLogoutConfirmationModal = () => {
    Modal.confirm({
      title: "Confirmation",
      content: "Are you sure want to change profile ?",
      onOk: () => {
        if (author) {
          const modifiedData = {
            firstName: watch("firstName"),
            lastName: watch("lastName"),
            profilePicture: watch("profilePicture"),
            email: emailValue,
          };

          updateAuthorProfie(modifiedData).then((response) => {
            if (response.status === 200) {
              showAthorProfileNotification();
            }
          });
        } else {
          const modifiedDataUser = {
            firstName: watch("firstName"),
            lastName: watch("lastName"),
            profilePicture: watch("profilePicture"),
            email: emailValue,
            bio: watch("bio"),
          };

          updateUserProfile(modifiedDataUser).then((response) => {
            if (response.status === 200) {
              showUserProfileNotification();
            }
          });
        }
        navigate("/");
      },
      onCancel: () => {},
      okText: "OK",
      cancelText: "Cancel",
    });
  };
  useEffect(() => {
    if (author) {
      getEditAuthorData(authorEmail).then((res) => {
        if (res.status === 200) {
          setAuthorData(res?.data);
          setValue("firstName", res?.data?.firstName);
          setValue("lastName", res?.data?.lastName);
          setValue("email", res?.data?.email);
          setValue("profilePicture", res?.data?.profilePicture);
          // setValue("bio", res?.data?.bio);
        }
      });
    } else {
      getEditUserData(userEmail).then((res) => {
        if (res.status === 200) {
          setUserData(res?.data);
          setValue("firstName", res?.data?.firstName);
          setValue("lastName", res?.data?.lastName);
          setValue("email", res?.data?.email);
          setValue("profilePicture", res?.data?.profilePicture);
          setValue("bio", res?.data?.bio);
        }
      });
    }
  }, []);
  return (
    <>
      <div className="common-container">
        <div className={editprofileStyle.change_password_page}>
          <Sidebar />
          <div className={editprofileStyle.change_password_right}>
            <div className={editprofileStyle.mybook_top_section}>
              <h2>Edit Profile</h2>
            </div>
            <div className={editprofileStyle.editprofile_from}>
              <Form>
                <Row className={`mb-12 ${editprofileStyle.book_details_fild}`}>
                  <Form.Group as={Col} md="6" controlId="validationCustom01">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                      name="firstName"
                      value={watch("firstName")}
                      type="text"
                      placeholder="First Name"
                      {...register("firstName", {
                        required: "please enter your name",
                      })}
                    />
                    {errors?.firstName && (
                      <span className="text-danger">
                        {errors?.firstName?.message}
                      </span>
                    )}
                  </Form.Group>
                  <Form.Group as={Col} md="6" controlId="validationCustom02">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                      name="lastName"
                      value={watch("lastName")}
                      type="text"
                      placeholder="Last Name"
                      {...register("lastName", {
                        required: "Please enter your last name",
                      })}
                    />
                    {errors?.lastName && (
                      <span className="text-danger">
                        {errors?.lastName?.message}
                      </span>
                    )}
                  </Form.Group>
                </Row>
                <Row className={`mb-12 ${editprofileStyle.book_details_fild}`}>
                  <Form.Group
                    as={Col}
                    md="12"
                    controlId="validationCustomSubject"
                  >
                    <Form.Label>Email</Form.Label>

                    <Form.Control
                      type="email"
                      name="email"
                      value={emailValue}
                      placeholder="example@email.com"
                      {...register("email", {
                        required: "Please enter your email",
                      })}
                    />
                    {errors?.email && (
                      <span className="text-danger">
                        {errors?.email?.message}
                      </span>
                    )}
                  </Form.Group>
                </Row>
                <Row className={`mb-12 ${editprofileStyle.book_details_fild}`}>
                  <div className={editprofileStyle.profile_picture_section}>
                    <label className={editprofileStyle.profile_picture_label}>
                      Profile Picture
                    </label>
                    <div className={editprofileStyle.profile_picture}>
                      <input
                        type="file"
                        id="upload"
                        // value={watch("profilePicture")}
                        hidden
                        onChange={handleProfilePictureUpload}
                        // {...register("newProfilePicture")}
                      />
                      <label for="upload">Upload</label>
                    </div>
                  </div>
                </Row>
                <Row className={`mb-12 ${editprofileStyle.book_details_fild}`}>
                  <Form.Label>Description</Form.Label>
                  <Form.Group as={Col} md="12">
                    <Form.Control
                      name="bio"
                      value={watch("bio")}
                      as="textarea"
                      placeholder="Enter text here..."
                      rows={3}
                      {...register("bio")}
                    />
                  </Form.Group>
                </Row>
                <div className={editprofileStyle.submit_cancel_btn}>
                  <Button
                    className="submit_btn"
                    type="button"
                    onClick={showLogoutConfirmationModal}
                  >
                    Save
                  </Button>
                  <Button
                    className="cancel_btn"
                    type="button"
                    onClick={() => navigate("/")}
                  >
                    Cancel
                  </Button>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Editprofile;
