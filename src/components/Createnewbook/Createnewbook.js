import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import Dropdown from "react-bootstrap/Dropdown";
import createnewbookStyle from "../../assets/css/createnewbook.module.css";
import { Stepper, Step } from "react-form-stepper";
import Sidebar from "../common/Sidebar";
import axios from 'axios';
import { notification } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import MainCharacters from "../Createnewbook/Maincharacters";
import { useDispatch, useSelector } from 'react-redux';
import { updateCreateNewBookField, selectCreateNewBookData } from '../../redux/createnewbookSlice';
import CustomStepper from "./CustomStepper";


function Createnewbook() {
  const { id } = useParams(); // Get the ID from the URL
  const navigate = useNavigate();
  const email = localStorage.getItem('userEmail');
  const dispatch = useDispatch();
  const formData = useSelector(selectCreateNewBookData);
  const [validationErrors, setValidationErrors] = useState({
    bookTitle: "",
    genre: "",
    targetAudience: "",
  });

  const [bookData, setBookData] = useState({});
  const [validated, setValidated] = useState(false);
  const [bookDetails, setBookDetails] = useState(null);
  const [nextButtonClicked, setNextButtonClicked] = useState(false);
  useEffect(() => {
    // Fetch the existing record based on the ID if it exists
    if (id) {
      axios.get(`http://10.16.16.108:7000/api/editbook/${id}`)
        .then((response) => {
          console.log("response", response.data);
          setBookData(response.data);

          // Populate form fields with data from the existing record
          dispatch(updateCreateNewBookField({ field: 'bookTitle', value: response.data.bookTitle }));
          dispatch(updateCreateNewBookField({ field: 'genre', value: response.data.genre }));
          dispatch(updateCreateNewBookField({ field: 'targetAudience', value: response.data.targetAudience }));
          dispatch(updateCreateNewBookField({ field: 'chapterIntroductions', value: response.data.chapterIntroductions }));
          dispatch(updateCreateNewBookField({ field: 'chapterConclusions', value: response.data.chapterConclusions }));
          // Add similar lines for other fields
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [id]);
  useEffect(() => {
    if (nextButtonClicked) {
      // Navigate to the next step or do any other logic here
      navigate('/maincharacters');
    }
  }, [nextButtonClicked]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    dispatch(updateCreateNewBookField({ field: name, value: type === 'checkbox' ? checked : value }));
    if (id) {
      const updatedBookData = { ...bookData, [name]: type === 'checkbox' ? checked : value };
      setBookData(updatedBookData);
    }
    // Clear the validation error for the changed field
    setValidationErrors({
      ...validationErrors,
      [name]: "", // Clear the error for the changed field
    });
  };

  const addNewBookSuccessfully = () => {
    notification.success({
      message: 'Create new book Successfully',
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      formData.email = email;
      const response = await axios.post('http://10.16.16.108:7000/api/createbooks', formData);
      // setBookDetails(response.data);
      addNewBookSuccessfully()
      navigate('/mybooks')
      // navigate('/Maincharacters')
    } catch (error) {
      console.error(error);
    }
  };

  const handleNext = (e) => {
    e.preventDefault();
    console.log("formData.bookTitle", formData)
    const errors = {};
    if (!formData.formData.bookTitle) {
      errors.bookTitle = "Please enter book title.";
    }
    if (!formData.formData.genre) {
      errors.genre = "Please select a genre.";
    }
    if (!formData.formData.targetAudience) {
      errors.targetAudience = "Please select a target audience.";
    }

    if (Object.keys(errors).length === 0) {
      // Form is valid, submit data or proceed
      navigate('/maincharacters');
    } else {
      // Update the validation errors state
      setValidationErrors(errors);
    }
  };
  const handleNextUpdate = (e) => {
    // e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
    }
    else {
      navigate(`/maincharacters/${id}`);
      setValidated(false);
    }
  };

  const handleCancel = (e) => {
    navigate('/mybooks');
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
              {/* <Stepper activeStep={1} disabledColor={"#cccccc"}>
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
              </Stepper> */}
              <CustomStepper activeStep={1} disabledColor={"#cccccc"} />
            </div>
            <div className={createnewbookStyle.book_details_from_section}>
              <h2>Book Details</h2>
              <div className={createnewbookStyle.book_details_from}>
                {/* <Form noValidate validated={validated} onSubmit={handleSubmit}> */}
                {/* <Form >  //onSubmit={handleSubmit} */}
                <Form validated={validated} >
                  <Row
                    className={`mb-12 ${createnewbookStyle.book_details_fild}`}
                  >
                    <Form.Group as={Col} md="12" controlId="bookTitle">
                      <Form.Label>Book title</Form.Label>
                      <Form.Control
                        required
                        type="text"
                        placeholder="Enter your book title"
                        name="bookTitle"
                        value={id ? bookData.bookTitle : formData.bookTitle}
                        onChange={handleChange}
                        isInvalid={!!validationErrors.bookTitle}
                      />
                      <Form.Control.Feedback type="invalid"> {validationErrors.bookTitle}</Form.Control.Feedback>
                    </Form.Group>
                  </Row>
                  <Row>
                    <Form.Group as={Col} md="12" controlId="validationCustom04">
                      <Form.Control
                        type="hidden"
                        name="email"
                        value={email}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Row>
                  <Row
                    className={`mb-12 ${createnewbookStyle.book_details_select}`}
                  >
                    <Col md="6">
                      <Form.Label>Genre</Form.Label>
                      <Form.Select aria-label="Fiction"
                        as="select"
                        name="genre"
                        value={id ? bookData.genre : formData.genre}
                        onChange={handleChange}
                        required
                        isInvalid={!!validationErrors.genre}
                      >
                        <option value="">Select an option</option>
                        <option value="Fiction">Fiction</option>
                        <option value="Non-Fiction">Non-Fiction</option>
                        <option value="Mystery">Mystery</option>
                        <option value="Romance">Romance</option>
                        <option value="Science Fiction">Science Fiction</option>
                        <option value="Fantasy">Fantasy</option>
                        <option value="Thriller">Thriller</option>
                        <option value="Biography">Biography</option>
                        <option value="History">History</option>
                        <option value="Self-help">Self-help</option>
                        <option value="Children's">Children's</option>
                        <option value="Young Adult">Young Adult</option>
                        <option value="Poetry">Poetry</option>
                      </Form.Select>
                      <Form.Control.Feedback type="invalid"> {validationErrors.genre}</Form.Control.Feedback>

                    </Col>
                    <Col md="6">
                      <Form.Label>Target audience</Form.Label>
                      <Form.Select aria-label="Children"
                        as="select"
                        name="targetAudience"
                        value={id ? bookData.targetAudience : formData.targetAudience}
                        onChange={handleChange}
                        required
                        isInvalid={!!validationErrors.targetAudience}
                      >
                        <option value="">Select an option</option>
                        <option value="Children">Children</option>
                        <option value="Teens">Teens</option>
                        <option value="Young Adults">Young Adults</option>
                        <option value="Adults">Adults</option>
                        <option value="All Ages">All Ages</option>
                      </Form.Select>
                      <Form.Control.Feedback type="invalid"> {validationErrors.targetAudience}</Form.Control.Feedback>

                    </Col>
                  </Row>
                  <Form.Group
                    className={`mb-12 ${createnewbookStyle.book_details_introductions}`}
                  >
                    <Form.Check
                      required
                      label="Do you need chapter introductions ?"
                      feedbackType="invalid"
                      type="checkbox"
                      name="chapterIntroductions"
                      checked={id ? bookData.chapterIntroductions : formData.chapterIntroductions}
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Form.Group
                    className={`mb-12 ${createnewbookStyle.book_details_introductions}`}
                  >
                    <Form.Check
                      required
                      label="Do you need chapter conclusions with CTA?"
                      feedbackType="invalid"
                      type="checkbox"
                      name="chapterConclusions"
                      checked={id ? bookData.chapterConclusions : formData.chapterConclusions}
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <div className={createnewbookStyle.next_cancel_btns}>
                    <Button
                      type="submit"
                      className={createnewbookStyle.next_btn}
                      // onClick={() => setNextButtonClicked(true)}
                      onClick={id ? handleNextUpdate : handleNext}
                    >
                      Next
                    </Button>
                    <Button
                      type="button"
                      className={createnewbookStyle.cancel_btn}
                      onClick={handleCancel}
                    >
                      Cancel
                    </Button>

                  </div>
                </Form>
                {/* {bookDetails && (
                  <div>
                    <h2>Book Details</h2>
                    <pre>{JSON.stringify(bookDetails, null, 2)}</pre>
                  </div>
                )} */}

              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Createnewbook;
