// import React from "react";
// import Container from "react-bootstrap/Container";
// import Nav from "react-bootstrap/Nav";
// import Navbar from "react-bootstrap/Navbar";
// import logo from "../../assets/images/common-logo.png";
// import wellicon from "../../assets/images/well_icon.png";
// import welcomeimg from "../../assets/images/welcome-img.png";
// import headerStyle from "../../assets/css/header.module.css";
// import { NavLink } from "react-router-dom";
// import Spinner from "react-bootstrap/Spinner";
// import Dropdown from "react-bootstrap/Dropdown";
// import { useNavigate } from "react-router-dom";
// import { Button, Modal, notification } from "antd";
// import axios from "axios";
// import { useState, useEffect } from "react";
// import {
//   deleteAuthorData,
//   deleteUserData,
//   getUserProfile,
//   getAuthorProfile,
//   logOutAuthor,
//   logOutUser,
// } from "../../utility/api";
// import io from "socket.io-client";
// const socket = io.connect("http://10.16.16.108:7000", { transports: ['websocket'], upgrade: false, cors: true });

// const HeaderLogin = () => {
//   const token = localStorage.getItem("authorToken");
//   const author = localStorage.getItem("authortype");
//   const userEmail = localStorage.getItem("userEmail");
//   const authorEmail = localStorage.getItem("authorEmail");

//   const [authorProfile, setAuthorProfile] = useState({});

//   const [userProfile, setUserProfile] = useState([]);

//   const navigate = useNavigate();

//   const showLogoutSuccessNotification = () => {
//     notification.success({
//       message: "Logout Successful",
//       description: "You have been successfully logged out.",
//     });
//   };
//   const showDeleteSuccessNotification = () => {
//     notification.success({
//       message: "Delete account Successfully",
//       description: "User and related data deleted successfully",
//     });
//   };
//   const showDeleteConfirmationModal = () => {
//     Modal.confirm({
//       title: "Confirmation",
//       content:
//         "Are you sure want to delete account? You will loss your all data.",
//       onOk: () => {
//         if (author) {
//           deleteAuthorData(authorEmail).then((res) => {
//             if (res.status === 200) {
//               localStorage.clear();
//               showDeleteSuccessNotification();
//             }
//           });
//           localStorage.clear();
//           navigate("/signupauthor");
//         } else {
//           deleteUserData(userEmail).then((res) => {
//             if (res.status === 200) {
//               localStorage.clear();
//               showDeleteSuccessNotification();
//             }
//           });
//           localStorage.clear();
//           navigate("/SignUp");
//         }
//       },
//       onCancel: () => {},
//       okText: "OK",
//       cancelText: "Cancel",
//     });
//   };
//   const getProfileData = async () => {
//     if (author) {
//       getAuthorProfile(token).then((res) => {
//         if (res.status === 200) {
//           setAuthorProfile(res?.data);
//         }
//       });
//     } else {
//       getUserProfile(userEmail).then((res) => {
//         if (res.status === 200) {
//           setUserProfile(res?.data);
//         }
//       });
//     }
//   };

//   useEffect(() => {
//     getProfileData();
//   }, []);
//   const showLogoutConfirmationModal = () => {
//     Modal.confirm({
//       title: "Are you sure you want to logout?",
//       content: "Logging out will end your current session.",
//       onOk: () => {
//         if (author) {
//           logOutAuthor(token)
//             .then(() => {
//               showLogoutSuccessNotification();
//               localStorage.removeItem("authortype");
//               localStorage.clear();
//               navigate("/AuthorLoginPage");
//             })
//             .catch((error) => {});
//         } else {
//           logOutUser()
//             .then(() => {
//               showLogoutSuccessNotification();
//               localStorage.removeItem("userEmail");
//               localStorage.clear();
//               navigate("/login");
//             })
//             .catch((error) => {});
//         }
//       },
//       onCancel: () => {
//         // Handle cancel action if needed
//       },
//       okText: "OK", // Customize the "OK" button text
//       cancelText: "Cancel", // Customize the "Cancel" button text
//     });
//   };
//   return (
//     <div className={headerStyle.common_header}>
//       <div className={headerStyle.header_container}>
//         <div className={headerStyle.header_main}>
//           <div className={headerStyle.logo}>
//             <NavLink to="/">
//               <img src={logo} />
//             </NavLink>
//           </div>
//           <div className={headerStyle.header_menu}>
//             <Navbar expand="lg" className={headerStyle.bg_body_tertiary}>
//               <Container>
//                 <Navbar.Toggle aria-controls="basic-navbar-nav" />
//                 <Navbar.Collapse id="basic-navbar-nav">
//                   <Nav className={`${headerStyle.link_wrapper} "me-auto" `}>
//                     <NavLink to="/">Home</NavLink>
//                     <NavLink to="/services">Services</NavLink>
//                     <NavLink to="/dashboard">Packages</NavLink>
//                     <NavLink to="/">About Us</NavLink>
//                     <NavLink to="/ContactUs">Contact Us</NavLink>
//                   </Nav>
//                 </Navbar.Collapse>
//               </Container>
//             </Navbar>
//           </div>
//           <div className={headerStyle.header_login_welcome}>
//             <div className={headerStyle.header_welcome_img}>
//               <div className={headerStyle.wellicon}>
//                 <img alt="logo" src={wellicon} />
//               </div>
//               <div className={headerStyle.welcomeimg}>
//                 <img
//                   alt="Profile"
//                   className={headerStyle.profile_img}
//                   src={
//                     author
//                       ? `${authorProfile?.profilePicture}`
//                       : `${userProfile?.profilePicture}`
//                   }
//                 />
//               </div>
//               <Dropdown className={headerStyle.dropdown}>
//                 <Dropdown.Toggle variant="success" id="dropdown-basic">
//                   {author
//                     ? `${authorProfile?.firstName} ${authorProfile?.lastName}`
//                     : `${userProfile?.firstName} ${userProfile?.lastName}`}
//                 </Dropdown.Toggle>
//                 <Dropdown.Menu>
//                   <Dropdown.Item href="/Dashboard">Dashboard</Dropdown.Item>
//                   <Dropdown.Item href="/editprofilepage">
//                     Edit Profile
//                   </Dropdown.Item>
//                   <Dropdown.Item href="/changePassword">
//                     Change Password
//                   </Dropdown.Item>
//                   <Dropdown.Item onClick={showDeleteConfirmationModal}>
//                     Delete Account
//                   </Dropdown.Item>
//                   <Dropdown.Item onClick={showLogoutConfirmationModal}>
//                     Log out
//                     {/* <NavLink onClick={showLogoutConfirmationModal}>/Logout</NavLink> */}
//                   </Dropdown.Item>
//                 </Dropdown.Menu>
//               </Dropdown>
//             </div>
//           </div>
//         </div>
//         {/* <div className="d-flex justify-content-center">
//           <div className={headerStyle.spinner_main_section}>
//             <Spinner animation="border" role="status">
//               <span className="visually-hidden">Loading...</span>
//             </Spinner>
//           </div>
//         </div> */}
//       </div>
//     </div>
//   );
// };

// export default HeaderLogin;

import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import logo from "../../assets/images/common-logo.png";
import wellicon from "../../assets/images/well_icon.png";
import welcomeimg from "../../assets/images/welcome-img.png";
import headerStyle from "../../assets/css/header.module.css";
import { NavLink } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
import Dropdown from "react-bootstrap/Dropdown";
import { useNavigate } from "react-router-dom";
import { Button, Modal, notification } from "antd";
import axios from "axios";
import { useState, useEffect } from "react";
import {
  deleteAuthorData,
  deleteUserData,
  getUserProfile,
  getAuthorProfile,
  logOutAuthor,
  logOutUser,
} from "../../utility/api";

const HeaderLogin = () => {
  const token = localStorage.getItem("authorToken");
  const author = localStorage.getItem("authortype");
  const userEmail = localStorage.getItem("userEmail");
  const authorEmail = localStorage.getItem("authorEmail");

  const [authorProfile, setAuthorProfile] = useState({});

  const [userProfile, setUserProfile] = useState([]);
  const [onlineAuthorData, setOnlineAuthorData] = useState(null);
  const [authorId, setAuthorId] = useState(null);
  const [isOnline, setIsOnline] = useState(false); // Track online status

  const navigate = useNavigate();
  const updateOnlineStatus = (status) => {
    setIsOnline(status === "Online");
  };
  const showLogoutSuccessNotification = () => {
    notification.success({
      message: "Logout Successful",
      description: "You have been successfully logged out.",
    });
  };
  const showDeleteSuccessNotification = () => {
    notification.success({
      message: "Delete account Successfully",
      description: "User and related data deleted successfully",
    });
  };
  const showDeleteConfirmationModal = () => {
    Modal.confirm({
      title: "Confirmation",
      content:
        "Are you sure want to delete account? You will loss your all data.",
      onOk: () => {
        if (author) {
          deleteAuthorData(authorEmail).then((res) => {
            if (res.status === 200) {
              localStorage.clear();
              showDeleteSuccessNotification();
            }
          });
          localStorage.clear();
          navigate("/signupauthor");
        } else {
          deleteUserData(userEmail).then((res) => {
            if (res.status === 200) {
              localStorage.clear();
              showDeleteSuccessNotification();
            }
          });
          localStorage.clear();
          navigate("/SignUp");
        }
      },
      onCancel: () => {},
      okText: "OK",
      cancelText: "Cancel",
    });
  };
  const getProfileData = async () => {
    if (author) {
      getAuthorProfile(token).then((res) => {
        if (res.status === 200) {
          setAuthorProfile(res?.data);
        }
      });
    } else {
      getUserProfile(userEmail).then((res) => {
        if (res.status === 200) {
          setUserProfile(res?.data);
        }
      });
    }
  };

  useEffect(() => {
    getProfileData();
  }, []);

  useEffect(() => {
    const onlineAuthorsData = localStorage.getItem("onlineAuthors");
    console.log("onlineAuthorsData", onlineAuthorsData);
    if (onlineAuthorsData) {
      const parsedData = JSON.parse(onlineAuthorsData);

      setOnlineAuthorData(parsedData);
      updateOnlineStatus(parsedData?.status);
    }
  }, []);

  useEffect(() => {
    const authorData = localStorage.getItem("author");
    if (authorData) {
      const parsedData = JSON.parse(authorData);
      setAuthorId(parsedData);
    }
  }, []);

  const showLogoutConfirmationModal = () => {
    Modal.confirm({
      title: "Are you sure you want to logout?",
      content: "Logging out will end your current session.",
      onOk: () => {
        if (author) {
          logOutAuthor(token)
            .then(() => {
              showLogoutSuccessNotification();
              localStorage.removeItem("authortype");
              localStorage.clear();
              navigate("/AuthorLoginPage");
            })
            .catch((error) => {});
        } else {
          logOutUser()
            .then(() => {
              showLogoutSuccessNotification();
              localStorage.removeItem("userEmail");
              localStorage.clear();
              navigate("/login");
            })
            .catch((error) => {});
        }
      },
      onCancel: () => {
        // Handle cancel action if needed
      },
      okText: "OK", // Customize the "OK" button text
      cancelText: "Cancel", // Customize the "Cancel" button text
    });
  };
  return (
    <div className={headerStyle.common_header}>
      <div className={headerStyle.header_container}>
        <div className={headerStyle.header_main}>
          <div className={headerStyle.logo}>
            <NavLink to="/">
              <img src={logo} />
            </NavLink>
          </div>
          <div className={headerStyle.header_menu}>
            <Navbar expand="lg" className={headerStyle.bg_body_tertiary}>
              <Container>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                  <Nav className={`${headerStyle.link_wrapper} "me-auto" `}>
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="/services">Services</NavLink>
                    <NavLink to="/dashboard">Packages</NavLink>
                    <NavLink to="/">About Us</NavLink>
                    <NavLink to="/ContactUs">Contact Us</NavLink>
                  </Nav>
                </Navbar.Collapse>
              </Container>
            </Navbar>
          </div>
          <div className={headerStyle.header_login_welcome}>
            <div className={headerStyle.header_welcome_img}>
              {author ? (
                <div>Data</div>
              ) : (
                <div>
                  Hello
                  <br />
                  {onlineAuthorData ? (
                    <>
                      ID: {onlineAuthorData.Id}
                      <br />
                      Status: {isOnline ? "Online" : "Offline"}
                    </>
                  ) : null}
                </div>
              )}
              <div className={headerStyle.wellicon}>
                <img alt="logo" src={wellicon} />
              </div>
              <div className={headerStyle.welcomeimg}>
                <img
                  alt="Profile"
                  className={headerStyle.profile_img}
                  src={
                    author
                      ? `${authorProfile?.profilePicture}`
                      : `${userProfile?.profilePicture}`
                  }
                />
              </div>
              <Dropdown className={headerStyle.dropdown}>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                  {author
                    ? `${authorProfile?.firstName} ${authorProfile?.lastName}`
                    : `${userProfile?.firstName} ${userProfile?.lastName}`}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item href="/Dashboard">Dashboard</Dropdown.Item>
                  <Dropdown.Item href="/editprofilepage">
                    Edit Profile
                  </Dropdown.Item>
                  <Dropdown.Item href="/changePassword">
                    Change Password
                  </Dropdown.Item>
                  <Dropdown.Item onClick={showDeleteConfirmationModal}>
                    Delete Account
                  </Dropdown.Item>
                  <Dropdown.Item onClick={showLogoutConfirmationModal}>
                    Log out
                    {/* <NavLink onClick={showLogoutConfirmationModal}>/Logout</NavLink> */}
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>
        </div>
        {/* <div className="d-flex justify-content-center">
          <div className={headerStyle.spinner_main_section}>
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default HeaderLogin;
