// import React, { useState, useEffect } from "react";
// import Button from "react-bootstrap/Button";
// import Col from "react-bootstrap/Col";
// import Form from "react-bootstrap/Form";
// import Row from "react-bootstrap/Row";
// import Modal from "react-bootstrap/Modal";
// import MybookPro from "../../assets/images/mybook_pro_img.png";
// import Editicon from "../../assets/images/edit_icon.png";
// import Deleteicon from "../../assets/images/delete_icon.png";
// import Viewsicon from "../../assets/images/views_icon.png";
// import Collicon from "../../assets/images/coll_icon.png";
// import Exporticon from "../../assets/images/export_icon.png";
// import mybookStyle from "../../assets/css/mybook.module.css";
// import Livesupport from "../../assets/images/live_support.png";
// import { Tooltip } from "antd";
// import Sidebar from "../common/Sidebar";
// import axios from "axios";
// import { Link, useNavigate } from "react-router-dom";
// import { notification } from "antd";

// const Mybook = () => {
//   const userEmail = localStorage.getItem("userEmail");
//   const [loading, setLoading] = useState(true);

//   const [data, setData] = useState([]);
//   const [acceptdata, setAcceptData] = useState([]);

//   // State to store the book ID to be deleted
//   const [bookToDeleteId, setBookToDeleteId] = useState(null);
//   const [show, setShow] = useState(false);
//   const handleClose = () => setShow(false);
//   const navigate = useNavigate();
//   const [viewBookData, setViewBookData] = useState([]);
//   const author = localStorage.getItem("authortype");
//   const authorEmail = localStorage.getItem("authorEmail");
//   const authorId = localStorage.getItem("authorId");
//   console.log(authorId, "authorId");

//   var viewBookpage = localStorage.getItem("bookdata");

//   var bookDatanew = JSON.parse(viewBookpage);

//   const deleteDataSuccessfully = () => {
//     notification.success({
//       message: "Delete Successfully",
//     });
//   };

//   const getAcceptBookforAuthor = async () => {
//     axios
//       .get(`http://10.16.16.108:7000/api/acceptedbooksdetails/${authorEmail}`)
//       .then((response) => {
//         if (response.status === 200) {
//           setAcceptData(response.data);
//         }
//         setLoading(false);
//       })
//       .catch((error) => {
//         setLoading(false);
//       });
//   };

//   useEffect(() => {
//     axios
//       .get(`http://10.16.16.108:7000/api/readbooksbyuser/${userEmail}`)
//       .then((response) => {
//         setData(response.data); // Assuming the API response is an object
//         setLoading(false);
//       })
//       .catch((error) => {
//         setLoading(false);
//       });
//   }, [userEmail]);

//   const handleDelete = (_id) => {
//     setBookToDeleteId(_id); // Store the _id of the book to be deleted
//     setShow(true); // Show the confirmation modal
//   };
//   const handleDeleteConfirmed = async (_id) => {
//     try {
//       // Send a DELETE request to the API to delete the book by its ID
//       const response = await axios.delete(
//         `http://10.16.16.108:7000/api/deletebook/${_id}`
//       );

//       deleteDataSuccessfully();
//       // Update the books state to remove the deleted book
//       setData((prevBooks) => prevBooks.filter((item) => item._id !== _id));

//       // Close the confirmation modal
//       setShow(false);
//     } catch (error) {}
//   };

//   const viewBook = (id) => {
//     axios
//       .get(`http://10.16.16.108:7000/api/authorviewbook/${id}`)
//       .then((res) => {
//         if (res?.data?.role === "view") {
//           setViewBookData(res?.data);
//           localStorage.setItem("bookdata", JSON.stringify(res?.data));

//           navigate("/previewexportpage");
//         } else {
//           console.log("View Permissionis not Allowed.");
//         }
//       });
//   };

//   useEffect(() => {
//     author && getAcceptBookforAuthor();
//     localStorage.removeItem("bookdata");
//   }, []);

//   const text = <span>managing collaborators</span>;
//   const editicon = <span>Edit</span>;
//   const deleteicon = <span>Delete</span>;
//   const viewsicon = <span>views</span>;
//   const collicon = <span>Collicon</span>;
//   const exporticon = <span>Export</span>;
//   const LiveChat = <span>Live Chat</span>;
//   const storeDataInLocalStorage = (item) => {
//     localStorage.setItem("editBookData", JSON.stringify(item));
//   };
//   // const storeViewBookData = (item) => {
//   //   localStorage.setItem("viewbookdata", JSON.stringify(item));
//   //   navigate("/viewbook");
//   // };

//   return (
//     <>
//       {loading ? (
//         <p>Loading...</p>
//       ) : (
//         <div>
//           <div className="common-container">
//             <div className={mybookStyle.change_password_page}>
//               <Sidebar />
//               {author ? (
//                 <div className={mybookStyle.change_password_right}>
//                   <div className={mybookStyle.mybook_top_section}>
//                     <h2>Book list</h2>
//                     <Row>
//                       <Form.Group
//                         as={Col}
//                         md="12"
//                         controlId="validationCustom04"
//                       >
//                         <Form.Control
//                           type="hidden"
//                           name="email"
//                           value={userEmail}
//                         />
//                       </Form.Group>
//                     </Row>
//                     {/* <a href="/" className={mybookStyle.add_to_new_book}>
//                       Add new book
//                     </a> */}
//                   </div>
//                   {acceptdata?.length > 0 ? (
//                     <div className={mybookStyle.mybook_pro_section}>
//                       {acceptdata &&
//                         acceptdata?.map((item, index) => (
//                           <div
//                             key={index}
//                             className={mybookStyle.mybook_product}
//                           >
//                             <div>
//                               <div
//                                 className={mybookStyle.mybook_product_content}
//                               >
//                                 <div className={mybookStyle.mybook_pro_img}>
//                                   <img src={MybookPro} alt="Book cover" />
//                                 </div>
//                                 <div className={mybookStyle.mybook_pro_text}>
//                                   <span className={mybookStyle.mybook_text01}>
//                                     Title:
//                                   </span>
//                                   <span className={mybookStyle.mybook_text02}>
//                                     {item?.bookTitle}
//                                   </span>
//                                 </div>
//                                 <div className={mybookStyle.mybook_pro_text}>
//                                   <span className={mybookStyle.mybook_text01}>
//                                     Genre:
//                                   </span>
//                                   <span className={mybookStyle.mybook_text02}>
//                                     {item?.genre}
//                                   </span>
//                                 </div>
//                                 <div className={mybookStyle.mybook_pro_text}>
//                                   <span className={mybookStyle.mybook_text01}>
//                                     Role:
//                                   </span>
//                                   <span className={mybookStyle.mybook_text02}>
//                                     {item?.Role}
//                                   </span>
//                                 </div>
//                                 <div className={mybookStyle.mybook_pro_text}>
//                                   <span className={mybookStyle.mybook_text01}>
//                                     Chapter:
//                                   </span>
//                                   <span className={mybookStyle.mybook_text02}>
//                                     {item?.Description}
//                                   </span>
//                                 </div>
//                                 <div
//                                   className={mybookStyle.mybook_tooltip_btns}
//                                 >
//                                   <div className={mybookStyle.edit_icon}>
//                                     <Link
//                                       // to={`/createnewbookpage/${item._id}`}
//                                       onClick={() =>
//                                         storeDataInLocalStorage(item)
//                                       }
//                                     >
//                                       <Tooltip placement="top" title={editicon}>
//                                         <Button>
//                                           <img src={Editicon} alt="Edit" />
//                                         </Button>
//                                       </Tooltip>
//                                     </Link>
//                                   </div>
//                                   <div className={mybookStyle.edit_icon}>
//                                     <Tooltip placement="top" title={deleteicon}>
//                                       <Button
//                                         variant="primary"
//                                         onClick={() => handleDelete(item._id)}
//                                       >
//                                         <img src={Deleteicon} alt="Delete" />
//                                       </Button>
//                                     </Tooltip>
//                                   </div>
//                                   <div className={mybookStyle.edit_icon}>
//                                     <Tooltip placement="top" title={viewsicon}>
//                                       <Button
//                                         onClick={() => viewBook(item?._id)}
//                                       >
//                                         <img src={Viewsicon} alt="Views" />
//                                       </Button>
//                                     </Tooltip>
//                                   </div>
//                                   <div className={mybookStyle.edit_icon}>
//                                     <Tooltip placement="top" title={collicon}>
//                                       <Button>
//                                         <img
//                                           src={Collicon}
//                                           alt="Collaborators"
//                                         />
//                                       </Button>
//                                     </Tooltip>
//                                   </div>
//                                   <div className={mybookStyle.edit_icon}>
//                                     <Tooltip placement="top" title={exporticon}>
//                                       <Button>
//                                         <img src={Exporticon} alt="Export" />
//                                       </Button>
//                                     </Tooltip>
//                                   </div>
//                                   <div className={mybookStyle.edit_icon}>
//                                     <Tooltip placement="top" title={LiveChat}>
//                                       <Button
//                                         onClick={() => {
//                                           localStorage.setItem(
//                                             "userEmail",
//                                             item?.createdBy
//                                           );
//                                           navigate("/chatboat");
//                                         }}
//                                       >
//                                         <img src={Livesupport} alt="Export" />
//                                       </Button>
//                                     </Tooltip>
//                                   </div>
//                                 </div>
//                               </div>
//                             </div>
//                           </div>
//                         ))}
//                     </div>
//                   ) : (
//                     <h6 className="request-book-not-found-msg">
//                       Request accepted Book not found!
//                     </h6>
//                   )}
//                 </div>
//               ) : (
//                 <div className={mybookStyle.change_password_right}>
//                   <div className={mybookStyle.mybook_top_section}>
//                     <h2>My Books</h2>
//                     <Row>
//                       <Form.Group
//                         as={Col}
//                         md="12"
//                         controlId="validationCustom04"
//                       >
//                         <Form.Control
//                           type="hidden"
//                           name="email"
//                           value={userEmail}
//                         />
//                       </Form.Group>
//                     </Row>
//                     <a
//                       href="/createnewbookpage"
//                       className={mybookStyle.add_to_new_book}
//                     >
//                       Add new book
//                     </a>
//                   </div>
//                   <div className={mybookStyle.mybook_pro_section}>
//                     {data?.map((item, index) => (
//                       <div key={index} className={mybookStyle.mybook_product}>
//                         <div>
//                           <div className={mybookStyle.mybook_product_content}>
//                             <div className={mybookStyle.mybook_pro_img}>
//                               <img src={MybookPro} alt="Book cover" />
//                             </div>
//                             <div className={mybookStyle.mybook_pro_text}>
//                               <span className={mybookStyle.mybook_text01}>
//                                 Title:
//                               </span>
//                               <span className={mybookStyle.mybook_text02}>
//                                 {item?.bookTitle}
//                               </span>
//                             </div>
//                             <div className={mybookStyle.mybook_pro_text}>
//                               <span className={mybookStyle.mybook_text01}>
//                                 Genre:
//                               </span>
//                               <span className={mybookStyle.mybook_text02}>
//                                 {item?.genre}
//                               </span>
//                             </div>
//                             <div className={mybookStyle.mybook_pro_text}>
//                               <span className={mybookStyle.mybook_text01}>
//                                 Role:
//                               </span>
//                               <span className={mybookStyle.mybook_text02}>
//                                 {item?.Role}
//                               </span>
//                             </div>
//                             <div className={mybookStyle.mybook_pro_text}>
//                               <span className={mybookStyle.mybook_text01}>
//                                 Chapter:
//                               </span>
//                               <span className={mybookStyle.mybook_text02}>
//                                 {item?.Description}
//                               </span>
//                             </div>
//                             <div className={mybookStyle.mybook_tooltip_btns}>
//                               <div className={mybookStyle.edit_icon}>
//                                 <Link
//                                   to={`/createnewbookpage/${item._id}`}
//                                   onClick={() => storeDataInLocalStorage(item)}
//                                 >
//                                   <Tooltip placement="top" title={editicon}>
//                                     <Button>
//                                       <img src={Editicon} alt="Edit" />
//                                     </Button>
//                                   </Tooltip>
//                                 </Link>
//                               </div>
//                               <div className={mybookStyle.edit_icon}>
//                                 <Tooltip placement="top" title={deleteicon}>
//                                   <Button
//                                     variant="primary"
//                                     onClick={() => handleDelete(item._id)}
//                                   >
//                                     <img src={Deleteicon} alt="Delete" />
//                                   </Button>
//                                 </Tooltip>
//                               </div>
//                               <div className={mybookStyle.edit_icon}>
//                                 <Tooltip placement="top" title={viewsicon}>
//                                   <Button
//                                   // onClick={() => storeViewBookData(item)}
//                                   >
//                                     <img src={Viewsicon} alt="Views" />
//                                   </Button>
//                                 </Tooltip>
//                               </div>
//                               <div className={mybookStyle.edit_icon}>
//                                 <Tooltip placement="top" title={collicon}>
//                                   <Button>
//                                     <img src={Collicon} alt="Collaborators" />
//                                   </Button>
//                                 </Tooltip>
//                               </div>
//                               <div className={mybookStyle.edit_icon}>
//                                 <Tooltip placement="top" title={exporticon}>
//                                   <Button>
//                                     <img src={Exporticon} alt="Export" />
//                                   </Button>
//                                 </Tooltip>
//                               </div>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>
//           {/* </div>
//           ))} */}
//           <Modal show={show} onHide={handleClose} centered>
//             <div className={mybookStyle.popup_content_box}>
//               <div className={mybookStyle.popup_text_content}>
//                 Are you sure you want to delete?
//               </div>
//               <div className={mybookStyle.popup_btns}>
//                 <Button
//                   className={mybookStyle.popup_ok_btn}
//                   variant="secondary"
//                   onClick={() => handleDeleteConfirmed(bookToDeleteId)}
//                 >
//                   Ok
//                 </Button>
//                 <Button
//                   className={mybookStyle.popup_cancel_btn}
//                   variant="primary"
//                   onClick={handleClose}
//                 >
//                   Cancel
//                 </Button>
//               </div>
//             </div>
//           </Modal>
//         </div>
//       )}
//     </>
//   );
// };

// export default Mybook;

import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Modal from "react-bootstrap/Modal";
import MybookPro from "../../assets/images/mybook_pro_img.png";
import Editicon from "../../assets/images/edit_icon.png";
import Deleteicon from "../../assets/images/delete_icon.png";
import Viewsicon from "../../assets/images/views_icon.png";
import Collicon from "../../assets/images/coll_icon.png";
import Exporticon from "../../assets/images/export_icon.png";
import mybookStyle from "../../assets/css/mybook.module.css";
import Livesupport from "../../assets/images/live_support.png";
import { Tooltip } from "antd";
import Sidebar from "../common/Sidebar";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { notification } from "antd";
import ColumnGroup from "antd/es/table/ColumnGroup";

const Mybook = () => {
  const userEmail = localStorage.getItem("userEmail");
  const [loading, setLoading] = useState(true);

  const [data, setData] = useState([]);
  const [acceptdata, setAcceptData] = useState([]);

  // State to store the book ID to be deleted
  const [bookToDeleteId, setBookToDeleteId] = useState(null);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const navigate = useNavigate();
  const [viewBookData, setViewBookData] = useState([]);
  const author = localStorage.getItem("authortype");
  const authorEmail = localStorage.getItem("authorEmail");
  const authorId = localStorage.getItem("authorId");
  console.log(authorId, "authorId");

  var viewBookpage = localStorage.getItem("bookdata");

  var bookDatanew = JSON.parse(viewBookpage);

  const deleteDataSuccessfully = () => {
    notification.success({
      message: "Delete Successfully",
    });
  };

  const getAcceptBookforAuthor = async () => {
    axios
      .get(`http://10.16.16.108:7000/api/acceptedbooksdetails/${authorEmail}`)
      .then((response) => {
        if (response.status === 200) {
          setAcceptData(response.data);
        }
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
      });
  };

  useEffect(() => {
    axios
      .get(`http://10.16.16.108:7000/api/readbooksbyuser/${userEmail}`)
      .then((response) => {
        setData(response.data); // Assuming the API response is an object
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
      });
  }, [userEmail]);

  const handleDelete = (_id) => {
    setBookToDeleteId(_id); // Store the _id of the book to be deleted
    setShow(true); // Show the confirmation modal
  };
  const handleDeleteConfirmed = async (_id) => {
    try {
      // Send a DELETE request to the API to delete the book by its ID
      const response = await axios.delete(
        `http://10.16.16.108:7000/api/deletebook/${_id}`
      );

      deleteDataSuccessfully();
      // Update the books state to remove the deleted book
      setData((prevBooks) => prevBooks.filter((item) => item._id !== _id));

      // Close the confirmation modal
      setShow(false);
    } catch (error) {}
  };

  const viewBook = (id) => {
    axios
      .get(`http://10.16.16.108:7000/api/authorviewbook/${id}`)
      .then((res) => {
        if (res?.data?.role === "view") {
          setViewBookData(res?.data);
          localStorage.setItem("bookdata", JSON.stringify(res?.data));

          navigate("/previewexportpage");
        } else {
          console.log("View Permissionis not Allowed.");
        }
      });
  };

  useEffect(() => {
    author && getAcceptBookforAuthor();
    localStorage.removeItem("bookdata");
  }, []);

  const text = <span>managing collaborators</span>;
  const editicon = <span>Edit</span>;
  const deleteicon = <span>Delete</span>;
  const viewsicon = <span>views</span>;
  const collicon = <span>Collicon</span>;
  const exporticon = <span>Export</span>;
  const LiveChat = <span>Live Chat</span>;
  const storeDataInLocalStorage = (item) => {
    localStorage.setItem("editBookData", JSON.stringify(item));
  };
  // const storeViewBookData = (item) => {
  //   localStorage.setItem("viewbookdata", JSON.stringify(item));
  //   navigate("/viewbook");
  // };

  return (
    <>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <div className="common-container">
            <div className={mybookStyle.change_password_page}>
              <Sidebar />
              {author ? (
                <div className={mybookStyle.change_password_right}>
                  <div className={mybookStyle.mybook_top_section}>
                    <h2>Book list</h2>
                    <Row>
                      <Form.Group
                        as={Col}
                        md="12"
                        controlId="validationCustom04"
                      >
                        <Form.Control
                          type="hidden"
                          name="email"
                          value={userEmail}
                        />
                      </Form.Group>
                    </Row>
                    {/* <a href="/" className={mybookStyle.add_to_new_book}>
                      Add new book
                    </a> */}
                  </div>
                  {acceptdata?.length > 0 ? (
                    <div className={mybookStyle.mybook_pro_section}>
                      {acceptdata &&
                        acceptdata?.map((item, index) => (
                          <div
                            key={index}
                            className={mybookStyle.mybook_product}
                          >
                            <div>
                              <div
                                className={mybookStyle.mybook_product_content}
                              >
                                <div className={mybookStyle.mybook_pro_img}>
                                  <img src={MybookPro} alt="Book cover" />
                                </div>
                                <div className={mybookStyle.mybook_pro_text}>
                                  <span className={mybookStyle.mybook_text01}>
                                    Title:
                                  </span>
                                  <span className={mybookStyle.mybook_text02}>
                                    {item?.bookTitle}
                                  </span>
                                </div>
                                <div className={mybookStyle.mybook_pro_text}>
                                  <span className={mybookStyle.mybook_text01}>
                                    Genre:
                                  </span>
                                  <span className={mybookStyle.mybook_text02}>
                                    {item?.genre}
                                  </span>
                                </div>
                                <div className={mybookStyle.mybook_pro_text}>
                                  <span className={mybookStyle.mybook_text01}>
                                    Role:
                                  </span>
                                  <span className={mybookStyle.mybook_text02}>
                                    {item?.Role}
                                  </span>
                                </div>
                                <div className={mybookStyle.mybook_pro_text}>
                                  <span className={mybookStyle.mybook_text01}>
                                    Chapter:
                                  </span>
                                  <span className={mybookStyle.mybook_text02}>
                                    {item?.Description}
                                  </span>
                                </div>
                                <div
                                  className={mybookStyle.mybook_tooltip_btns}
                                >
                                  <div className={mybookStyle.edit_icon}>
                                    <Link
                                      // to={`/createnewbookpage/${item._id}`}
                                      onClick={() =>
                                        storeDataInLocalStorage(item)
                                      }
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
                                      <Button
                                        variant="primary"
                                        onClick={() => handleDelete(item._id)}
                                      >
                                        <img src={Deleteicon} alt="Delete" />
                                      </Button>
                                    </Tooltip>
                                  </div>
                                  <div className={mybookStyle.edit_icon}>
                                    <Tooltip placement="top" title={viewsicon}>
                                      <Button
                                        onClick={() => viewBook(item?._id)}
                                      >
                                        <img src={Viewsicon} alt="Views" />
                                      </Button>
                                    </Tooltip>
                                  </div>
                                  <div className={mybookStyle.edit_icon}>
                                    <Tooltip placement="top" title={collicon}>
                                      <Button>
                                        <img
                                          src={Collicon}
                                          alt="Collaborators"
                                        />
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
                                  <div className={mybookStyle.edit_icon}>
                                    <Tooltip placement="top" title={LiveChat}>
                                      <Button
                                        onClick={() => {
                                          localStorage.setItem(
                                            "userEmail",
                                            item?.createdBy
                                          );
                                          navigate("/chatboat");
                                        }}
                                      >
                                        <img src={Livesupport} alt="Export" />
                                      </Button>
                                    </Tooltip>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  ) : (
                    <h6 className="request-book-not-found-msg">
                      Request accepted Book not found!
                    </h6>
                  )}
                </div>
              ) : (
                <div className={mybookStyle.change_password_right}>
                  <div className={mybookStyle.mybook_top_section}>
                    <h2>My Books</h2>
                    <Row>
                      <Form.Group
                        as={Col}
                        md="12"
                        controlId="validationCustom04"
                      >
                        <Form.Control
                          type="hidden"
                          name="email"
                          value={userEmail}
                        />
                      </Form.Group>
                    </Row>
                    <a
                      href="/createnewbookpage"
                      className={mybookStyle.add_to_new_book}
                    >
                      Add new book
                    </a>
                  </div>
                  <div className={mybookStyle.mybook_pro_section}>
                    {data?.map((item, index) => (
                      <div key={index} className={mybookStyle.mybook_product}>
                        <div>
                          <div className={mybookStyle.mybook_product_content}>
                            <div className={mybookStyle.mybook_pro_img}>
                              <img src={MybookPro} alt="Book cover" />
                            </div>
                            <div className={mybookStyle.mybook_pro_text}>
                              <span className={mybookStyle.mybook_text01}>
                                Title:
                              </span>
                              <span className={mybookStyle.mybook_text02}>
                                {item?.bookTitle}
                              </span>
                            </div>
                            <div className={mybookStyle.mybook_pro_text}>
                              <span className={mybookStyle.mybook_text01}>
                                Genre:
                              </span>
                              <span className={mybookStyle.mybook_text02}>
                                {item?.genre}
                              </span>
                            </div>
                            <div className={mybookStyle.mybook_pro_text}>
                              <span className={mybookStyle.mybook_text01}>
                                Role:
                              </span>
                              <span className={mybookStyle.mybook_text02}>
                                {item?.Role}
                              </span>
                            </div>
                            <div className={mybookStyle.mybook_pro_text}>
                              <span className={mybookStyle.mybook_text01}>
                                Chapter:
                              </span>
                              <span className={mybookStyle.mybook_text02}>
                                {item?.Description}
                              </span>
                            </div>
                            <div className={mybookStyle.mybook_tooltip_btns}>
                              <div className={mybookStyle.edit_icon}>
                                <Link
                                  to={`/createnewbookpage/${item._id}`}
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
                                  <Button
                                    variant="primary"
                                    onClick={() => handleDelete(item._id)}
                                  >
                                    <img src={Deleteicon} alt="Delete" />
                                  </Button>
                                </Tooltip>
                              </div>
                              <div className={mybookStyle.edit_icon}>
                                <Tooltip placement="top" title={viewsicon}>
                                  <Button
                                  // onClick={() => storeViewBookData(item)}
                                  >
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
              )}
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
        </div>
      )}
    </>
  );
};

export default Mybook;
