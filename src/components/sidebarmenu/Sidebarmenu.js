import { useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import createnewbookStyle from "../../assets/css/createnewbook.module.css";

return (
  <>
    <div className="common-container">
      <div className={createnewbookStyle.change_password_page}>
        <div className={createnewbookStyle.change_password_left}>
          <ul>
            <li>
              <a href="/">Dashboard1</a>
            </li>
            <li>
              <a href="/">My Books</a>
            </li>
            <li>
              <a href="/">Create New Book</a>
            </li>
            <li>
              <a href="/">Collaboration</a>
            </li>
            <li>
              <a href="/">Book Templates</a>
            </li>
            <li>
              <a href="/">Images & Media</a>
            </li>
            <li>
              <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                  Billing & Subscription
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item href="/">Subscription Plans</Dropdown.Item>
                  <Dropdown.Item href="/">Current Subscription</Dropdown.Item>
                  <Dropdown.Item href="/">Billing History</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </li>
            <li>
              <a href="/">Help & Support</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </>
);

export default Sidebarmenu;
