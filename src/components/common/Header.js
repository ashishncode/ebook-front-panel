import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import logo from "../../assets/images/common-logo.png";
import headerStyle from "../../assets/css/header.module.css";
import footerStyle from "../../assets/css/footer.module.css";
import { NavLink } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";

const Header = () => {
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
          <div className={headerStyle.header_login_singup}>
            <NavLink to="/Login">Login</NavLink>
            <NavLink to="/SignUp">/Sign up</NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
