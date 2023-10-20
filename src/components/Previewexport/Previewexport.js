import { useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import previewexportStyle from "../../assets/css/previewexport.module.css";
import { Tooltip } from "antd";
import EbookCarousel from "../common/Carousel";
import Sidebar from "../common/Sidebar";

const Previewexport = () => {
  return (
    <>
      <div className="common-container">
        <div className={previewexportStyle.change_password_page}>
          <Sidebar />
          <div className={previewexportStyle.change_password_right}>
            <div className={previewexportStyle.mybook_top_section}>
              <h2>Preview and Export</h2>
            </div>
            <div className={previewexportStyle.previewexport_page}>
              <EbookCarousel />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Previewexport;
