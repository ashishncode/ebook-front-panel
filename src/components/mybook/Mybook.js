import React, { useState, useEffect } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import Modal from "react-bootstrap/Modal";
import MybookPro from "../../assets/images/mybook_pro_img.png";
import Editicon from "../../assets/images/edit_icon.png";
import Deleteicon from "../../assets/images/delete_icon.png";
import Viewsicon from "../../assets/images/views_icon.png";
import Collicon from "../../assets/images/coll_icon.png";
import Exporticon from "../../assets/images/export_icon.png";
import mybookStyle from "../../assets/css/mybook.module.css";
import { Tooltip } from "antd";
import Sidebar from "../common/Sidebar";
import axios from 'axios';
import { Link } from "react-router-dom";
import { notification } from 'antd';



function Mybook() {
  const email = localStorage.getItem('userEmail');
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});


  // State to store the book ID to be deleted
  const [bookToDeleteId, setBookToDeleteId] = useState(null);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const deleteDataSuccessfully = () => {
    notification.success({
      message: 'Delete Successfully',
    });
  };
  useEffect(() => {
    axios
      .get(`http://10.16.16.108:7000/api/readbooksbyuser/${email}`)
      .then((response) => {
        setData(response.data); // Assuming the API response is an object
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, [email]);


  const handleDelete = (_id) => {
    setBookToDeleteId(_id); // Store the _id of the book to be deleted
    setShow(true); // Show the confirmation modal
  };
  const handleDeleteConfirmed = async (_id) => {
    try {
      // Send a DELETE request to the API to delete the book by its ID
      const response = await axios.delete(`http://10.16.16.108:7000/api/deletebook/${_id}`);
      console.log('Book deleted:', response);
      deleteDataSuccessfully()
      // Update the books state to remove the deleted book
      setData((prevBooks) => prevBooks.filter((item) => item._id !== _id));

      // Close the confirmation modal
      setShow(false);
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };

  const text = <span>managing collaborators</span>;
  const editicon = <span>Edit</span>;
  const deleteicon = <span>Delete</span>;
  const viewsicon = <span>views</span>;
  const collicon = <span>Collicon</span>;
  const exporticon = <span>Export</span>;
  function storeDataInLocalStorage(item) {
    localStorage.setItem('editBookData', JSON.stringify(item));
  }


  return (
    <>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <h2>Data from API</h2>
          {/* {data.map((item, index) => (
            <div key={index}>
              {console.log(item, "iteemmmmm")} */}
          <div className="common-container">
            <div className={mybookStyle.change_password_page}>
              <Sidebar />
              <div className={mybookStyle.change_password_right}>
                <div className={mybookStyle.mybook_top_section}>
                  <h2>My Books</h2>
                  <Row >
                    <Form.Group as={Col} md="12" controlId="validationCustom04">
                      <Form.Control
                        type="hidden"
                        name="email"
                        value={email}
                      />
                    </Form.Group>
                  </Row>
                  <a href="/createnewbookpage" className={mybookStyle.add_to_new_book}>
                    Add new book
                  </a>
                </div>
                <div className={mybookStyle.mybook_pro_section}>
                  {data.map((item, index) => (
                    <div key={index} className={mybookStyle.mybook_product}>
                      <div >
                        <div className={mybookStyle.mybook_product_content}>
                          <div className={mybookStyle.mybook_pro_img}>
                            <img src={MybookPro} alt="Book cover" />
                          </div>
                          <div className={mybookStyle.mybook_pro_text}>
                            <span className={mybookStyle.mybook_text01}>Title:</span>
                            <span className={mybookStyle.mybook_text02}>{item?.bookTitle}</span>
                          </div>
                          <div className={mybookStyle.mybook_pro_text}>
                            <span className={mybookStyle.mybook_text01}>Genre:</span>
                            <span className={mybookStyle.mybook_text02}>{item?.genre}</span>
                          </div>
                          <div className={mybookStyle.mybook_pro_text}>
                            <span className={mybookStyle.mybook_text01}>Role:</span>
                            <span className={mybookStyle.mybook_text02}>{item?.Role}</span>
                          </div>
                          <div className={mybookStyle.mybook_pro_text}>
                            <span className={mybookStyle.mybook_text01}>Chapter:</span>
                            <span className={mybookStyle.mybook_text02}>
                              {item?.Description}
                            </span>
                          </div>
                          <div className={mybookStyle.mybook_tooltip_btns}>
                            <div className={mybookStyle.edit_icon}>
                              <Link to={`/createnewbookpage/${item._id}`}
                                onClick={() => storeDataInLocalStorage(item)}
                              >
                                <Tooltip placement="top" title={editicon}>
                                  <Button>
                                    <img src={Editicon} alt="Edit" />
                                  </Button>
                                </Tooltip>
                              </Link>

                            </div>
                            <div className={mybookStyle.edit_icon}>
                              <Tooltip placement="top" title={deleteicon}>
                                <Button variant="primary" onClick={() => handleDelete(item._id)}>
                                  <img src={Deleteicon} alt="Delete" />
                                </Button>
                              </Tooltip>
                            </div>
                            <div className={mybookStyle.edit_icon}>
                              <Tooltip placement="top" title={viewsicon}>
                                <Button>
                                  <img src={Viewsicon} alt="Views" />
                                </Button>
                              </Tooltip>
                            </div>
                            <div className={mybookStyle.edit_icon}>
                              <Tooltip placement="top" title={collicon}>
                                <Button>
                                  <img src={Collicon} alt="Collaborators" />
                                </Button>
                              </Tooltip>
                            </div>
                            <div className={mybookStyle.edit_icon}>
                              <Tooltip placement="top" title={exporticon}>
                                <Button>
                                  <img src={Exporticon} alt="Export" />
                                </Button>
                              </Tooltip>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          {/* </div>
          ))} */}
          <Modal show={show} onHide={handleClose} centered>
            <div className={mybookStyle.popup_content_box}>
              <div className={mybookStyle.popup_text_content}>
                Are you sure you want to delete?
              </div>
              <div className={mybookStyle.popup_btns}>
                <Button
                  className={mybookStyle.popup_ok_btn}
                  variant="secondary"
                  onClick={() => handleDeleteConfirmed(bookToDeleteId)}
                >
                  Ok
                </Button>
                <Button
                  className={mybookStyle.popup_cancel_btn}
                  variant="primary"
                  onClick={handleClose}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </Modal>
        </div >
      )
      }
    </>
  );
}

export default Mybook;
