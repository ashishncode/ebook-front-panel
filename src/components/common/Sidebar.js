import { useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { NavLink } from "react-router-dom";
import SidebarStyle from "../../assets/css/Sidebar.module.css";

const Sidebar = () => {
  const author = localStorage.getItem("authortype");
  return (
    <>
      <div className={SidebarStyle.change_password_left}>
        <div className={SidebarStyle.sidebar_content}>
          <ul>
            <li>
              <NavLink to="/dashboard">Dashboard</NavLink>
            </li>
            <li>
              <NavLink to="/mybooks">My Books</NavLink>
            </li>
            {!author && (
              <li>
                <NavLink to="/createnewbookpage">Create New Book</NavLink>
              </li>
            )}

            <li>
              <NavLink to="/collaborationpage">Collaboration</NavLink>
            </li>
            {!author && (
              <li>
                <NavLink to="/">Book Templates</NavLink>
              </li>
            )}
            {!author && (
              <li>
                <NavLink to="/">Images & Media</NavLink>
              </li>
            )}

            {!author && (
              <li>
                <Dropdown>
                  <Dropdown.Toggle variant="success" id="dropdown-basic">
                    Billing & Subscription
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item href="/subscriptionplan">
                      Subscription Plans
                    </Dropdown.Item>
                    <Dropdown.Item href="/currentsubscription">
                      Current Subscription
                    </Dropdown.Item>
                    <Dropdown.Item href="/billinghistorypage">
                      Billing History
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </li>
            )}

            <li>
              <a href="/">Help & Support</a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
