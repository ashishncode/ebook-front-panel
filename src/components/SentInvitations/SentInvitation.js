import { useState, useEffect } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import sentinvitationsStyle from "../../assets/css/sentinvitations.module.css";
import Sidebar from "../common/Sidebar";
import { Tooltip } from "antd";
import axios from 'axios';
import { notification } from 'antd';


function SentInvitation() {
  const [validated, setValidated] = useState(false);
  const text = <span>View</span>;
  const refund = <span>Download</span>;
  const [formData, setFormData] = useState({
    BookId: '',
    receiver: '',
    Role: '',
    message: '',
  });
  const [authors, setAuthors] = useState([]);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const showSuccessRequest = () => {
    notification.success({
      message: 'Request sent Successfully',
      description: 'You have sent request successfully to Author.',
    });
  };


  useEffect(() => {
    // Fetch authors from the API
    axios.get('http://10.16.16.108:7000/list/author/frontend') // You may need to specify the full URL here
      .then((response) => {
        setAuthors(response.data.getAllAuthorData);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching authors:', error);
        setLoading(false);
      });
  }, []);
  const userID = localStorage.getItem("userEmail");
  if (userID) {
    // Use the userID as needed
  } else {
    // Handle the case where the ID is not available
    console.log("User ID not found in local storage.");
  }
  useEffect(() => {

    // Fetch book from the API
    axios.get(`http://10.16.16.108:7000/api/readbooksbyuser/${userID}`)
      .then((response) => {
        setBooks(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching authors:', error);
        setLoading(false);
      });
  }, []);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value, sender: userID });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
    } else {
      try {
        await axios.post('http://10.16.16.108:7000/send/request', formData);
        console.log('Invitation submitted successfully');
        showSuccessRequest();
        // Reset the form
        setFormData({
          BookId: '',
          receiver: '',
          Role: '',
          message: '',
        });
        setValidated(false);
      } catch (error) {
        console.error('Error submitting invitation:', error);
      }
    }
  };

  return (
    <>
      <div className="common-container">
        <div className={sentinvitationsStyle.change_password_page}>
          <Sidebar />
          <div className={sentinvitationsStyle.change_password_right}>
            <div className={sentinvitationsStyle.mybook_top_section}>
              <h2>Sent Invitations</h2>
            </div>
            <div className={sentinvitationsStyle.invitation_from}>
              <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Row
                  className={`mb-12 ${sentinvitationsStyle.book_details_select}`}
                >
                  <Col md="6">
                    <Form.Label>Select Book</Form.Label>
                    <Form.Select aria-label="Fiction"
                      as="select"
                      name="BookId"
                      value={formData.BookId}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Choose a Book</option>
                      {loading ? (
                        <option>Loading Books...</option>
                      ) : (
                        books.map((book) => (
                          <option key={book._id} value={book._id}>
                            {book.bookTitle}
                          </option>
                        ))
                      )}
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">Please select a book.</Form.Control.Feedback>
                  </Col>
                  <Col md="6">
                    <Form.Label>Select Author</Form.Label>
                    <Form.Select aria-label="Children"
                      as="select"
                      name="receiver"
                      value={formData.receiver}
                      onChange={handleChange}
                      required
                    >

                      <option value="">Choose an Author</option>
                      {loading ? (
                        <option>Loading Authors...</option>
                      ) : (
                        authors.map((author) => (
                          <option key={author._id} value={author.email}>
                            {author.firstName}
                          </option>
                        ))
                      )}
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">Please select an author.</Form.Control.Feedback>
                  </Col>
                </Row>
                <Row
                  className={`mb-12 ${sentinvitationsStyle.book_details_select}`}
                >
                  <Col md="12">
                    <Form.Label>Role Assign</Form.Label>
                    <Form.Select aria-label="Fiction"
                      as="select"
                      name="Role"
                      value={formData.Role}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select a role</option>
                      <option value="view">View</option>
                      <option value="Edit">Edit</option>
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">Please select a role.</Form.Control.Feedback>
                  </Col>
                </Row>
                <Row className={`mb-12 ${sentinvitationsStyle.contactus_fild}`}>
                  <Form.Label>Manage</Form.Label>
                  <Form.Group as={Col} md="12">
                    <Form.Control
                      as="textarea"
                      placeholder="Your Message"
                      rows={3}
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                    />
                    <Form.Control.Feedback type="invalid">Please enter a message.</Form.Control.Feedback>
                  </Form.Group>
                </Row>
                <div className={sentinvitationsStyle.submit_cancel_btn}>
                  <Button className="submit_btn" type="submit">
                    Submit
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

export default SentInvitation;
