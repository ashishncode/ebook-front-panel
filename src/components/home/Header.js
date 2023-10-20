import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import logo from "../../assets/images/home-logo.png";
import headerStyle from "../../assets/css/header.module.css";
import footerStyle from "../../assets/css/footer.module.css";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button, Modal, notification } from "antd";

const Header = () => {
  const token = localStorage.getItem("authorToken");

  const author = localStorage.getItem("authortype");
  const storedEmail = localStorage.getItem("userEmail");

  const navigate = useNavigate();

  const showLogoutSuccessNotification = () => {
    notification.success({
      message: "Logout Successful",
      description: "You have been successfully logged out.",
    });
  };

  const showLogoutConfirmationModal = () => {
    Modal.confirm({
      title: "Are you sure you want to logout?",
      content: "Logging out will end your current session.",
      onOk: () => {
        if (author) {
          axios
            .post(`http://10.16.16.108:7000/api/logout/author/${token}`)
            .then(() => {
              showLogoutSuccessNotification();
              localStorage.removeItem("authortype");
              navigate("/AuthorLoginPage");
            })
            .catch((error) => {});
        } else {
          axios
            .post("http://10.16.16.108:7000/api/logoutuser")
            .then(() => {
              showLogoutSuccessNotification();
              localStorage.removeItem("userEmail");
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
        <div className={headerStyle.header_login_singup}>
          <NavLink to="/Login">Login</NavLink>
          <NavLink to="/SignUp">/Sign up</NavLink>
          {/* <NavLink onClick={showLogoutConfirmationModal}>/Logout</NavLink>
          <NavLink to="/changePassword">/Change Passwowd</NavLink> */}
        </div>
      </div>
    </div>
  );
};

export default Header;
