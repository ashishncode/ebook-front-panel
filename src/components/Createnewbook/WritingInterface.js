import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import Dropdown from "react-bootstrap/Dropdown";
import TooltipIcon from "../../assets/images/tooltip_icon.png";
import createnewbookStyle from "../../assets/css/createnewbook.module.css";
import { Stepper, Step } from "react-form-stepper";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Sidebar from "../common/Sidebar";
import { useNavigate, useParams } from 'react-router-dom';
import CustomStepper from "./CustomStepper";
import { updateCreateNewBookField, selectCreateNewBookData } from '../../redux/createnewbookSlice';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';



function WritingInterface() {
  const { id } = useParams(); // Get the ID from the URL
  const navigate = useNavigate();

  const [validated, setValidated] = useState(false);
  const [value, setValue] = useState("");
  const [writingInterface, setWritingInterface] = useState({});
  const [validationErrors, setValidationErrors] = useState({
    editingtools: '',
  });

  const text = <span>Plot Summary</span>;
  const dispatch = useDispatch();
  const formData = useSelector(selectCreateNewBookData);

  const handleChange = (content) => {
    setValue(content); // Update the local state with the new value
    dispatch(updateCreateNewBookField({ field: 'editingtools', value: content }));
    if (id) {
      // If you have a specific id-related logic, update it here
      const updatedBookData = { ...writingInterface, editingtools: content };
      setWritingInterface(updatedBookData);
    }
    if (!content) {
      setValidationErrors({
        ...validationErrors,
        editingtools: "Please enter editing tools here.",
      });
    } else {
      setValidationErrors({
        ...validationErrors,
        editingtools: "", // Clear the validation error if content is valid
      });
    }
  };

  useEffect(() => {
    // Fetch the existing record based on the ID if it exists
    if (id) {
      axios.get(`http://10.16.16.108:7000/api/editbook/${id}`)
        .then((response) => {
          setWritingInterface(response.data);
          // Populate form fields with data from the existing record
          dispatch(updateCreateNewBookField({ field: 'editingtools', value: response.data.editingtools }));
          // Add similar lines for other fields
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [id]);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
    event.preventDefault(); // Prevent default form submission

    // Save the draft content (value) to a variable or send it to your server
    const draftContent = value;

    // You can perform further actions here, e.g., save the draft to a database
    console.log("Draft Content:", draftContent);
  };
  const handleNext = (e) => {
    e.preventDefault();
    const errors = {};
    if (!formData.formData.editingtools) {
      errors.editingtools = "Please enter editing tools here.";
    }
    if (Object.keys(errors).length === 0) {
      navigate('/chapter');

    } else {
      setValidationErrors(errors);
    }
    // navigate('/chapter');
  };
  const handleUpdateNext = (e) => {
    e.preventDefault();
    navigate(`/chapter/${id}`);
  };

  return (
    <>
      <div className="common-container">
        <div className={createnewbookStyle.change_password_page}>
          <Sidebar />
          <div className={createnewbookStyle.change_password_right}>
            <div className={createnewbookStyle.book_details_top_title}>
              <h2>Create New Book</h2>
              <p>Create a book & start adding chapters and characters</p>
            </div>
            <div className={createnewbookStyle.stepper_section}>
              <Stepper activeStep={1} disabledColor={""}>
                <Step
                  label="Book Details"
                  className={createnewbookStyle.step_active}
                />
                <Step
                  label="Main Characters"
                  className={createnewbookStyle.step_common}
                />
                <Step
                  label="Setting"
                  className={createnewbookStyle.step_common}
                />
                <Step
                  label="Plot Summary"
                  className={createnewbookStyle.step_common}
                />
                <Step
                  label="Writing Preferences"
                  className={createnewbookStyle.step_common}
                />
                <Step
                  label="Writing Interface"
                  className={createnewbookStyle.step_common}
                />
              </Stepper>
            </div>
            <div className={createnewbookStyle.book_details_from_section}>
              <h2>Writing Interface</h2>
              <div className={createnewbookStyle.book_details_from}>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                  <Row
                    className={`mb-12 ${createnewbookStyle.book_details_select}`}
                  >
                    <Col md="12">
                      <Form.Label>Editing Tools</Form.Label>
                      <div className={`mb-12 ${createnewbookStyle.book_details_select}`}>
                        {/* <Col md="12">
                          <Form.Label>Editing Tools</Form.Label>
                          <ReactQuill
                            theme="snow"
                            value={id ? writingInterface.editingtools : value}
                            onChange={handleChange}
                            name="editingtools"
                            style={{
                              height: 120,
                            }}
                            isInvalid={!!validationErrors.location}
                          />
                          <Form.Control.Feedback type="invalid">
                            {validationErrors.editingtools}
                          </Form.Control.Feedback>
                        </Col> */}
                        <Col md="12">
                          <Form.Label>Editing Tools</Form.Label>
                          <div className={`mb-12 ${createnewbookStyle.book_details_select}`}>
                            <ReactQuill
                              theme="snow"
                              value={id ? writingInterface.editingtools : value}
                              onChange={handleChange}
                              name="editingtools"
                              // modules={{
                              //   toolbar: [
                              //     [{ 'font': [] }],
                              //     [{ 'header': '1' }, { 'header': '2' }],
                              //     ['bold', 'italic', 'underline'],
                              //     [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                              //     [{ 'align': [] }],
                              //     ['link', 'image'],
                              //   ],
                              // }}
                              isInvalid={!!validationErrors.location}
                              style={{
                                border: validationErrors.editingtools ? '1px solid red' : '1px solid #e5e5e5',
                                height: '120px',
                                // Add other styles as needed
                              }}
                            />
                            {validationErrors.editingtools && (
                              <div className="invalid-feedback d-block">
                                {validationErrors.editingtools}
                              </div>
                            )}
                          </div>
                          {/* <Form.Control.Feedback type="invalid">
                            {validationErrors.editingtools}
                          </Form.Control.Feedback> */}
                        </Col>
                      </div>

                    </Col>
                  </Row>
                  <div className={createnewbookStyle.save_draft_btns_section}>
                    <div className={createnewbookStyle.next_cancel_btns}>
                      <Button
                        type="submit"
                        className={createnewbookStyle.finish_btn}
                      >
                        Save Draft
                      </Button>
                      <Button
                        type="submit"
                        className={createnewbookStyle.finish_btn}
                      >
                        Export as PDF
                      </Button>
                      <Button
                        type="submit"
                        className={createnewbookStyle.finish_btn}
                      >
                        Export as ePub
                      </Button>
                      <Button
                        type="submit"
                        className={createnewbookStyle.next_btn}
                      >
                        Export as docx
                      </Button>
                      <Button
                        type="submit"
                        className={createnewbookStyle.cancel_btn}
                        onClick={id ? handleUpdateNext : handleNext}
                      >
                        Next
                      </Button>
                    </div>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default WritingInterface;
