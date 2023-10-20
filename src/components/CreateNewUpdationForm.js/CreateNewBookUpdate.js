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
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { notification } from "antd";
import HeaderLogin from "../common/Header_login";

const CreatenewbookUpdate = () => {
  const navigate = useNavigate();
  const { _id } = useParams();
  const [bookData, setBookData] = useState({});
  const [loading, setLoading] = useState(true);
  const addNewBookSuccessfully = () => {
    notification.success({
      message: "Your new book update Successfully",
    });
  };
  // Fetch the existing book details when the component mounts
  useEffect(() => {
    axios
      .get(`http://10.16.16.108:7000/api/editbook/${_id}`) // Replace `bookId` with the actual book ID
      .then((response) => {
        setBookData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching book data:", error);
        setLoading(false);
      });
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send a PUT request to update the book details
      await axios.post(
        `http://10.16.16.108:7000/api/updatebook/${_id}`,
        bookData
      ); // Replace `bookId` with the actual book ID
      // Redirect to another page or handle the update success as needed
      addNewBookSuccessfully();
      navigate("/mybooks");
    } catch (error) {
      console.error("Error updating book:", error);
    }
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
              <Stepper activeStep={1} disabledColor={"#cccccc"}>
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
              </Stepper>
            </div>
            <div className={createnewbookStyle.book_details_from_section}>
              <h2>Book Details</h2>
              <div className={createnewbookStyle.book_details_from}>
                {/* <Form noValidate validated={validated} onSubmit={handleSubmit}> */}
                <Form onSubmit={handleSubmit}>
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
                        value={bookData.bookTitle} // Pre-fill with existing data
                        onChange={(e) =>
                          setBookData({
                            ...bookData,
                            bookTitle: e.target.value,
                          })
                        }
                      />
                    </Form.Group>
                  </Row>
                  <Row>
                    <Form.Group as={Col} md="12" controlId="validationCustom04">
                      <Form.Control type="hidden" name="email" />
                    </Form.Group>
                  </Row>
                  <Row
                    className={`mb-12 ${createnewbookStyle.book_details_select}`}
                  >
                    <Col md="6">
                      <Form.Label>Genre</Form.Label>
                      <Form.Select
                        aria-label="Fiction"
                        as="select"
                        name="genre"
                        value={bookData.genre} // Pre-fill with existing data
                        onChange={(e) =>
                          setBookData({ ...bookData, genre: e.target.value })
                        }
                      >
                        <option>Fiction</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                      </Form.Select>
                    </Col>
                    <Col md="6">
                      <Form.Label>Target audience</Form.Label>
                      <Form.Select
                        aria-label="Children"
                        as="select"
                        name="targetAudience"
                        value={bookData.targetAudience} // Pre-fill with existing data
                        onChange={(e) =>
                          setBookData({
                            ...bookData,
                            targetAudience: e.target.value,
                          })
                        }
                      >
                        <option>Children</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                      </Form.Select>
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
                      checked={bookData.chapterIntroductions} // Pre-fill with existing data
                      onChange={(e) =>
                        setBookData({
                          ...bookData,
                          chapterIntroductions: e.target.checked,
                        })
                      }
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
                      checked={bookData.chapterConclusions} // Pre-fill with existing data
                      onChange={(e) =>
                        setBookData({
                          ...bookData,
                          chapterConclusions: e.target.checked,
                        })
                      }
                    />
                  </Form.Group>
                  <div className={createnewbookStyle.next_cancel_btns}>
                    <Button
                      type="submit"
                      className={createnewbookStyle.next_btn}
                    >
                      Save Changes
                    </Button>
                    <Button
                      type="submit"
                      className={createnewbookStyle.cancel_btn}
                    >
                      Cancel
                    </Button>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreatenewbookUpdate;
