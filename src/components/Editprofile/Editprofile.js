import { useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import editprofileStyle from "../../assets/css/editprofile.module.css";
import { Tooltip } from "antd";
import Sidebar from "../common/Sidebar";

function Editprofile() {
  const [validated, setValidated] = useState(false);
  const text = <span>View</span>;
  const refund = <span>Download</span>;

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
  };

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
              <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Row className={`mb-12 ${editprofileStyle.book_details_fild}`}>
                  <Form.Group as={Col} md="6" controlId="validationCustom01">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      placeholder="First Name"
                      defaultValue="First Name"
                    />
                    <Form.Control.Feedback>
                      First Name is required
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as={Col} md="6" controlId="validationCustom02">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      placeholder="Last Name"
                      defaultValue="Last Name"
                    />
                    <Form.Control.Feedback>
                      Last Name is required
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>
                <Row className={`mb-12 ${editprofileStyle.book_details_fild}`}>
                  <Form.Group
                    as={Col}
                    md="12"
                    controlId="validationCustomSubject"
                  >
                    <Form.Label>Email</Form.Label>
                    <InputGroup hasValidation>
                      <Form.Control
                        type="text"
                        placeholder="example@email.com"
                        aria-describedby="example@email.com"
                        required
                      />
                      <Form.Control.Feedback type="invalid">
                        Please choose a Email.
                      </Form.Control.Feedback>
                    </InputGroup>
                  </Form.Group>
                </Row>
                <Row className={`mb-12 ${editprofileStyle.book_details_fild}`}>
                  <div className={editprofileStyle.profile_picture_section}>
                    <label className={editprofileStyle.profile_picture_label}>
                      Profile Picture
                    </label>
                    <div className={editprofileStyle.profile_picture}>
                      <input type="file" id="upload" hidden />
                      <label for="upload">Upload</label>
                    </div>
                  </div>
                </Row>
                <Row className={`mb-12 ${editprofileStyle.book_details_fild}`}>
                  <Form.Label>Description</Form.Label>
                  <Form.Group as={Col} md="12">
                    <Form.Control
                      as="textarea"
                      placeholder="Enter text here..."
                      rows={3}
                    />
                  </Form.Group>
                </Row>
                <div className={editprofileStyle.submit_cancel_btn}>
                  <Button className="submit_btn" type="submit">
                    Save
                  </Button>
                  <Button className="cancel_btn" type="submit">
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
}

export default Editprofile;
