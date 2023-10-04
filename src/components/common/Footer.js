import React from "react";
import FooterLogo from "../../assets/images/footer-logo.png";
import FooterImg from "../../assets/images/footer-img.png";
import Facebook from "../../assets/images/facebook.png";
import Instagram from "../../assets/images/instagram.png";
import Pinterest from "../../assets/images/pinterest.png";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <div className="footer">
      <div className="common-container">
        <div className="footer-content">
          <div className="footer-logo">
            <NavLink to="/">
              <img src={FooterLogo} />
            </NavLink>
          </div>
          <div className="footer-links-section">
            <div className="footer-links">
              <h2>Quick links</h2>
              <ul>
                <li>
                  <NavLink to="/">Home</NavLink>
                </li>
                <li>
                  <NavLink to="/">Packages</NavLink>
                </li>
                <li>
                  <NavLink to="/">Blog</NavLink>
                </li>
                <li>
                  <NavLink to="/AuthorLoginPage">Author Log In</NavLink>
                </li>
              </ul>
            </div>
            <div className="footer-links">
              <h2>Links</h2>
              <ul>
                <li>
                  <NavLink to="/services">Services</NavLink>
                </li>
                <li>
                  <NavLink to="/">Packages</NavLink>
                </li>
                <li>
                  <NavLink to="/">About Us</NavLink>
                </li>
                <li>
                  <NavLink to="/ContactUs">Contact Us</NavLink>
                </li>
              </ul>
            </div>
            <div className="footer-links">
              <h2>Legal</h2>
              <ul>
                <li>
                  <NavLink to="/">Terms of use</NavLink>
                </li>
                <li>
                  <NavLink to="/">Terms & conditions</NavLink>
                </li>
                <li>
                  <NavLink to="/">Privacy</NavLink>
                </li>
                <li>
                  <NavLink to="/">Cookie policy</NavLink>
                </li>
              </ul>
            </div>
          </div>
          <div className="footer-img">
            <img src={FooterImg} />
          </div>
        </div>
        <div className="footer-bottom">
          <div className="footer-privacy-link">
            <NavLink to="/">Privacy & Terms.</NavLink>
            <NavLink to="/ContactUs">Contact Us</NavLink>
          </div>
          <div className="copyright-text">Copyright @2023 eBook inc.</div>
          <div className="footer-social">
            <NavLink to="/">
              <img src={Facebook} />
            </NavLink>
            <NavLink to="/">
              <img src={Instagram} />
            </NavLink>
            <NavLink to="/">
              <img src={Pinterest} />
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
