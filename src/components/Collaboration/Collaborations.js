// import { useState, useEffect } from "react";
// import Button from "react-bootstrap/Button";
// import { NavLink } from "react-router-dom";
// import MybookPro from "../../assets/images/collaboration_pro.png";
// import Acceptlogo from "../../assets/images/request_accept.png";
// import Declinelogo from "../../assets/images/request_decline.png";
// import Exporticon from "../../assets/images/review_icon.png";
// import mybookStyle from "../../assets/css/mybook.module.css";
// import Editicon from "../../assets/images/edit_icon.png";
// import Viewsicon from "../../assets/images/views_icon.png";
// import Collicon from "../../assets/images/coll_icon.png";
// import Deleteicon from "../../assets/images/delete_icon.png";
// import Livesupport from "../../assets/images/live_support.png";
// import { Tooltip } from "antd";
// import Sidebar from "../common/Sidebar";
// import axios from "axios";
// import { notification, message } from "antd";
// import { Link, useNavigate } from "react-router-dom";
// import {
//   getFriendRequest,
//   getAcceptedBookForUser,
//   viewBook,
// } from "../../utility/api";

// import io from "socket.io-client";

// // Now you can create the socket connection
// const socket = io.connect("http://10.16.16.108:7000");

// const Collaborations = () => {
//   const [validated, setValidated] = useState(false);
//   const [date, setDate] = useState([]);

//   const text = <span>Review</span>;
//   const author = localStorage.getItem("authortype");
//   const authorEmail = localStorage.getItem("authorEmail");
//   const authorId = localStorage.getItem("authorId");
//   const [acceptdataUser, setAcceptDataUser] = useState({});
//   console.log(acceptdataUser, "acceptdataUser");
//   const [loading, setLoading] = useState(false);
//   const [bookToDeleteId, setBookToDeleteId] = useState(null);
//   const [show, setShow] = useState(false);
//   const [viewBookData, setViewBookData] = useState([]);
//   const navigate = useNavigate();

//   const userEmail = localStorage.getItem("userEmail");
//   console.log(userEmail, "userEmail");

//   const [request, setRequest] = useState([]);

//   const formatDate = (dateString) => {
//     const date = new Date(dateString);

//     const year = date.getFullYear();
//     const month = String(date.getMonth() + 1).padStart(2, "0"); // Month is 0-indexed
//     const day = String(date.getDate()).padStart(2, "0");

//     const formattedDate = `${day}-${month}-${year}`;

//     return formattedDate;
//   };
//   useEffect(() => {
//     socket.on("newRequest", (invitationData) => {
//       console.log("Received new invitation:", invitationData);
//     });

//     // return () => {
//     //   socket.disconnect();
//     // };
//   }, []);

//   const getFriendRequestHandler = async (authorEmail) => {
//     // await axios
//     //   .get(
//     //     `http://10.16.16.108:7000/api/author/pending/requests/${authorEmail}`
//     //   )
//     getFriendRequest(authorEmail)
//       .then((response) => {
//         console.log(response, "response request");
//         if (response.status === 200) {
//           setRequest(response.data);

//           setDate(response?.data[0]?.createdAt);
//         }
//       })
//       .catch((err) => {});
//   };

//   const getAcceptBookforUserHandler = async () => {
//     getAcceptedBookForUser(userEmail)
//       .then((response) => {
//         console.log("user book detail", response);
//         if (response.status === 200) {
//           setAcceptDataUser(response.data);
//         }
//         setLoading(false);
//       })
//       .catch((error) => {
//         setLoading(false);
//       });
//   };
//   const storeDataInLocalStorage = (item) => {
//     localStorage.setItem("editBookData", JSON.stringify(item));
//   };
//   useEffect(() => {
//     getAcceptBookforUserHandler();
//   }, [!author]);

//   const showRequestErrorNotification = () => {
//     notification.error({
//       message: "Something went wrong",
//       description: "Internal server error.",
//     });
//   };

//   const handleDelete = (_id) => {
//     setBookToDeleteId(_id); // Store the _id of the book to be deleted
//     setShow(true); // Show the confirmation modal
//   };

//   const viewBookHandler = (id) => {
//     viewBook(id).then((res) => {
//       if (res?.data?.role === "view") {
//         setViewBookData(res?.data);
//         localStorage.setItem("bookdata", JSON.stringify(res?.data));

//         navigate("/previewexportpage");
//       } else {
//         console.log("View Permissionis not Allowed.");
//       }
//     });
//   };

//   const acceptRequest = (data) => {
//     try {
//       const modifiedData = {
//         ...data,
//         sender: data?.sender,
//         BookId: data?.BookId,
//         Requeststatus: "accepted",
//       };

//       axios
//         .put(`http://10.16.16.108:7000/api/accept/request`, modifiedData)
//         .then((res) => {
//           if (res.status === 200) {
//             message.success("Request accepted successfully");
//             socket.emit("acceptRequestWithUserData", modifiedData);
//           }

//           getFriendRequestHandler();
//         })
//         .catch((error) => {
//           if (error.response) {
//           } else if (error.request) {
//             showRequestErrorNotification();
//           }
//         });
//     } catch (err) {
//       console.error("Caught an exception:", err);
//     }
//   };

//   const editicon = <span>Edit</span>;
//   const deleteicon = <span>Delete</span>;
//   const viewsicon = <span>views</span>;
//   const exporticon = <span>Export</span>;
//   const collicon = <span>Collicon</span>;

//   const LiveChat = <span>Live Chat</span>;
//   const declineRequest = (data) => {
//     try {
//       const modifiedData = {
//         ...data,
//         sender: data?.sender,
//         BookId: data?.BookId,
//         Requeststatus: "decline",
//       };

//       axios
//         .put(`http://10.16.16.108:7000/api/accept/request`, modifiedData)
//         .then((res) => {
//           if (res.status === 200) {
//             message.success("Request decline successfully");
//           }
//           getFriendRequestHandler();
//         })
//         .catch((error) => {
//           if (error.request) {
//             showRequestErrorNotification();
//           }
//         });
//     } catch (err) {}
//   };
//   useEffect(() => {
//     author && getFriendRequestHandler();
//   }, []);

//   return (
//     <>
//       <div className="common-container">
//         <div className={mybookStyle.change_password_page}>
//           <Sidebar />

//           {author ? (
//             <div className={mybookStyle.change_password_right}>
//               <div className={mybookStyle.mybook_top_section}>
//                 <h2>Collaborations Invitation</h2>
//               </div>
//               {Object.keys(request)?.length > 0 ? (
//                 <div className={mybookStyle.mybook_pro_section}>
//                   {request?.map((item) => {
//                     return (
//                       <div className={mybookStyle.mybook_product}>
//                         <div className={mybookStyle.mybook_product_content}>
//                           <div className={mybookStyle.mybook_pro_img}>
//                             <img src={MybookPro} />
//                           </div>
//                           <div className={mybookStyle.mybook_pro_text}>
//                             <span className={mybookStyle.mybook_text01}>
//                               Title:
//                             </span>
//                             <span className={mybookStyle.mybook_text02}>
//                               Collaborator's name
//                             </span>
//                           </div>
//                           <div className={mybookStyle.mybook_pro_text}>
//                             <span className={mybookStyle.mybook_text01}>
//                               Book Title:
//                             </span>
//                             <span className={mybookStyle.mybook_text02}>
//                               {item?.Book}
//                             </span>
//                           </div>
//                           {/* <div className={mybookStyle.mybook_pro_text}>
//                       <span className={mybookStyle.mybook_text01}>Role:</span>
//                       <span className={mybookStyle.mybook_text02}>Editor</span>
//                     </div> */}
//                           <div className={mybookStyle.mybook_pro_text}>
//                             <span className={mybookStyle.mybook_text01}>
//                               Date:
//                             </span>
//                             <span className={mybookStyle.mybook_text02}>
//                               {formatDate(item?.createdAt)}
//                             </span>
//                           </div>
//                           <div className={mybookStyle.mybook_tooltip_btns}>
//                             <div className={mybookStyle.edit_icon}>
//                               <Tooltip placement="top" title="Accept">
//                                 <Button onClick={() => acceptRequest(item)}>
//                                   <img src={Acceptlogo} />
//                                 </Button>
//                               </Tooltip>
//                             </div>
//                             <div className={mybookStyle.edit_icon}>
//                               <Tooltip placement="top" title="Decline">
//                                 <Button onClick={() => declineRequest(item)}>
//                                   <img src={Declinelogo} />
//                                 </Button>
//                               </Tooltip>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     );
//                   })}
//                 </div>
//               ) : (
//                 <h6 className={mybookStyle.request_not_found_message}>
//                   You don't get any new request from user yet now.
//                 </h6>
//               )}
//             </div>
//           ) : (
//             <div className={mybookStyle.change_password_right}>
//               <div className={mybookStyle.mybook_top_section}>
//                 <h2>Collaborations</h2>
//                 <NavLink
//                   to="/sentinvitationspage"
//                   className={mybookStyle.add_to_new_book}
//                 >
//                   Sent Invitation
//                 </NavLink>
//               </div>
//               <div className={mybookStyle.mybook_pro_section}>
//                 {/* <div className={mybookStyle.mybook_product}>
//                   <div className={mybookStyle.mybook_product_content}>
//                     <div className={mybookStyle.mybook_pro_img}>
//                       <img src={MybookPro} />
//                     </div>
//                     <div className={mybookStyle.mybook_pro_text}>
//                       <span className={mybookStyle.mybook_text01}>Title:</span>
//                       <span className={mybookStyle.mybook_text02}>
//                         Collaborator's name
//                       </span>
//                     </div>
//                     <div className={mybookStyle.mybook_pro_text}>
//                       <span className={mybookStyle.mybook_text01}>
//                         Book Title:
//                       </span>
//                       <span className={mybookStyle.mybook_text02}>
//                         The Wool Trilogy
//                       </span>
//                     </div>
//                     <div className={mybookStyle.mybook_pro_text}>
//                       <span className={mybookStyle.mybook_text01}>Role:</span>
//                       <span className={mybookStyle.mybook_text02}>Editor</span>
//                     </div>
//                     <div className={mybookStyle.mybook_pro_text}>
//                       <span className={mybookStyle.mybook_text01}>
//                         Start Date:
//                       </span>
//                       <span className={mybookStyle.mybook_text02}>
//                         12-05-2023
//                       </span>
//                     </div>
//                     <div className={mybookStyle.mybook_tooltip_btns}>
//                       <div className={mybookStyle.edit_icon}>
//                         <Tooltip placement="top" title={text}>
//                           <Button>
//                             <img src={Exporticon} />
//                           </Button>
//                         </Tooltip>
//                       </div>
//                     </div>
//                   </div>
//                 </div> */}
//                 {/* <div className={mybookStyle.mybook_product}>
//                   <div className={mybookStyle.mybook_product_content}>
//                     <div className={mybookStyle.mybook_pro_img}>
//                       <img src={MybookPro} />
//                     </div>
//                     <div className={mybookStyle.mybook_pro_text}>
//                       <span className={mybookStyle.mybook_text01}>Title:</span>
//                       <span className={mybookStyle.mybook_text02}>
//                         Collaborator's name
//                       </span>
//                     </div>
//                     <div className={mybookStyle.mybook_pro_text}>
//                       <span className={mybookStyle.mybook_text01}>
//                         Book Title:
//                       </span>
//                       <span className={mybookStyle.mybook_text02}>
//                         The Wool Trilogy
//                       </span>
//                     </div>
//                     <div className={mybookStyle.mybook_pro_text}>
//                       <span className={mybookStyle.mybook_text01}>Role:</span>
//                       <span className={mybookStyle.mybook_text02}>Editor</span>
//                     </div>
//                     <div className={mybookStyle.mybook_pro_text}>
//                       <span className={mybookStyle.mybook_text01}>
//                         Start Date:
//                       </span>
//                       <span className={mybookStyle.mybook_text02}>
//                         12-05-2023
//                       </span>
//                     </div>
//                     <div className={mybookStyle.mybook_tooltip_btns}>
//                       <div className={mybookStyle.edit_icon}>
//                         <Tooltip placement="top" title={text}>
//                           <Button>
//                             <img src={Exporticon} />
//                           </Button>
//                         </Tooltip>
//                       </div>
//                     </div>
//                   </div>
//                 </div> */}
//                 {/* <div className={mybookStyle.mybook_product}>
//                   <div className={mybookStyle.mybook_product_content}>
//                     <div className={mybookStyle.mybook_pro_img}>
//                       <img src={MybookPro} />
//                     </div>
//                     <div className={mybookStyle.mybook_pro_text}>
//                       <span className={mybookStyle.mybook_text01}>Title:</span>
//                       <span className={mybookStyle.mybook_text02}>
//                         Collaborator's name
//                       </span>
//                     </div>
//                     <div className={mybookStyle.mybook_pro_text}>
//                       <span className={mybookStyle.mybook_text01}>
//                         Book Title:
//                       </span>
//                       <span className={mybookStyle.mybook_text02}>
//                         The Wool Trilogy
//                       </span>
//                     </div>
//                     <div className={mybookStyle.mybook_pro_text}>
//                       <span className={mybookStyle.mybook_text01}>Role:</span>
//                       <span className={mybookStyle.mybook_text02}>Editor</span>
//                     </div>
//                     <div className={mybookStyle.mybook_pro_text}>
//                       <span className={mybookStyle.mybook_text01}>
//                         Start Date:
//                       </span>
//                       <span className={mybookStyle.mybook_text02}>
//                         12-05-2023
//                       </span>
//                     </div>
//                     <div className={mybookStyle.mybook_tooltip_btns}>
//                       <div className={mybookStyle.edit_icon}>
//                         <Tooltip placement="top" title={text}>
//                           <Button>
//                             <img src={Exporticon} />
//                           </Button>
//                         </Tooltip>
//                       </div>
//                     </div>
//                   </div>
//                 </div> */}

//                 {acceptdataUser?.bookDetail?.length > 0 ? (
//                   <div className={mybookStyle.mybook_pro_section}>
//                     {acceptdataUser?.bookDetail &&
//                       acceptdataUser?.bookDetail?.map((item, index) => (
//                         <div key={index} className={mybookStyle.mybook_product}>
//                           <div>
//                             <div className={mybookStyle.mybook_product_content}>
//                               <div className={mybookStyle.mybook_pro_img}>
//                                 <img src={MybookPro} alt="Book cover" />
//                               </div>
//                               <div className={mybookStyle.mybook_pro_text}>
//                                 <span className={mybookStyle.mybook_text01}>
//                                   Title:
//                                 </span>
//                                 <span className={mybookStyle.mybook_text02}>
//                                   {item?.bookTitle}
//                                 </span>
//                               </div>
//                               <div className={mybookStyle.mybook_pro_text}>
//                                 <span className={mybookStyle.mybook_text01}>
//                                   Genre:
//                                 </span>
//                                 <span className={mybookStyle.mybook_text02}>
//                                   {item?.genre}
//                                 </span>
//                               </div>
//                               <div className={mybookStyle.mybook_pro_text}>
//                                 <span className={mybookStyle.mybook_text01}>
//                                   Role:
//                                 </span>
//                                 <span className={mybookStyle.mybook_text02}>
//                                   {item?.Role}
//                                 </span>
//                               </div>
//                               <div className={mybookStyle.mybook_pro_text}>
//                                 <span className={mybookStyle.mybook_text01}>
//                                   Chapter:
//                                 </span>
//                                 <span className={mybookStyle.mybook_text02}>
//                                   {item?.Description}
//                                 </span>
//                               </div>
//                               <div className={mybookStyle.mybook_tooltip_btns}>
//                                 <div className={mybookStyle.edit_icon}>
//                                   <Link
//                                     // to={`/createnewbookpage/${item._id}`}
//                                     onClick={() =>
//                                       storeDataInLocalStorage(item)
//                                     }
//                                   >
//                                     <Tooltip placement="top" title={editicon}>
//                                       <Button>
//                                         <img src={Editicon} alt="Edit" />
//                                       </Button>
//                                     </Tooltip>
//                                   </Link>
//                                 </div>
//                                 <div className={mybookStyle.edit_icon}>
//                                   <Tooltip placement="top" title={deleteicon}>
//                                     <Button
//                                       variant="primary"
//                                       onClick={() => handleDelete(item._id)}
//                                     >
//                                       <img src={Deleteicon} alt="Delete" />
//                                     </Button>
//                                   </Tooltip>
//                                 </div>
//                                 <div className={mybookStyle.edit_icon}>
//                                   <Tooltip placement="top" title={viewsicon}>
//                                     <Button
//                                       onClick={() => viewBookHandler(item?._id)}
//                                     >
//                                       <img src={Viewsicon} alt="Views" />
//                                     </Button>
//                                   </Tooltip>
//                                 </div>
//                                 <div className={mybookStyle.edit_icon}>
//                                   <Tooltip placement="top" title={collicon}>
//                                     <Button>
//                                       <img src={Collicon} alt="Collaborators" />
//                                     </Button>
//                                   </Tooltip>
//                                 </div>
//                                 <div className={mybookStyle.edit_icon}>
//                                   <Tooltip placement="top" title={exporticon}>
//                                     <Button>
//                                       <img src={Exporticon} alt="Export" />
//                                     </Button>
//                                   </Tooltip>
//                                 </div>
//                                 <div className={mybookStyle.edit_icon}>
//                                   <Tooltip placement="top" title={LiveChat}>
//                                     <Button
//                                       onClick={() => {
//                                         localStorage.setItem(
//                                           "authorEmail",
//                                           acceptdataUser?.receiver
//                                         );
//                                         navigate("/chatboat");
//                                       }}
//                                     >
//                                       <img src={Livesupport} alt="Export" />
//                                     </Button>
//                                   </Tooltip>
//                                 </div>
//                               </div>
//                             </div>
//                           </div>
//                         </div>
//                       ))}
//                   </div>
//                 ) : (
//                   <h6 className="request-book-not-found-msg">
//                     Request accepted Book not found!
//                   </h6>
//                 )}
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </>
//   );
// };

// export default Collaborations;

import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import { NavLink } from "react-router-dom";
import MybookPro from "../../assets/images/collaboration_pro.png";
import Acceptlogo from "../../assets/images/request_accept.png";
import Declinelogo from "../../assets/images/request_decline.png";
import Exporticon from "../../assets/images/review_icon.png";
import mybookStyle from "../../assets/css/mybook.module.css";
import Editicon from "../../assets/images/edit_icon.png";
import Viewsicon from "../../assets/images/views_icon.png";
import Collicon from "../../assets/images/coll_icon.png";
import Deleteicon from "../../assets/images/delete_icon.png";
import Livesupport from "../../assets/images/live_support.png";
import { Tooltip } from "antd";
import Sidebar from "../common/Sidebar";
import axios from "axios";
import { notification, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import {
  getFriendRequest,
  getAcceptedBookForUser,
  viewBook,
} from "../../utility/api";

import io from "socket.io-client";

// Now you can create the socket connection
const socket = io.connect("http://10.16.16.108:7000", {
  transports: ["websocket"],
  upgrade: false,
  cors: true,
});

const Collaborations = () => {
  const [validated, setValidated] = useState(false);
  const [date, setDate] = useState([]);

  const text = <span>Review</span>;
  const author = localStorage.getItem("authortype");
  const authorEmail = localStorage.getItem("authorEmail");
  const authorId = localStorage.getItem("authorId");
  const [acceptdataUser, setAcceptDataUser] = useState({});
  console.log(acceptdataUser, "acceptdataUser");
  const [loading, setLoading] = useState(false);
  const [bookToDeleteId, setBookToDeleteId] = useState(null);
  const [show, setShow] = useState(false);
  const [viewBookData, setViewBookData] = useState([]);
  const navigate = useNavigate();

  const userEmail = localStorage.getItem("userEmail");
  console.log(userEmail, "userEmail");

  const [request, setRequest] = useState([]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Month is 0-indexed
    const day = String(date.getDate()).padStart(2, "0");

    const formattedDate = `${day}-${month}-${year}`;

    return formattedDate;
  };
  useEffect(() => {
    socket.on("newRequest", (invitationData) => {
      console.log("Received new invitation:", invitationData);
    });

    // return () => {
    //   socket.disconnect();
    // };
  }, []);

  const getFriendRequestHandler = async (authorEmail) => {
    // await axios
    //   .get(
    //     `http://10.16.16.108:7000/api/author/pending/requests/${authorEmail}`
    //   )
    getFriendRequest(authorEmail)
      .then((response) => {
        console.log(response, "response request");
        if (response.status === 200) {
          setRequest(response.data);

          setDate(response?.data[0]?.createdAt);
        }
      })
      .catch((err) => {});
  };

  const getAcceptBookforUserHandler = async () => {
    getAcceptedBookForUser(userEmail)
      .then((response) => {
        console.log("user book detail", response);
        if (response.status === 200) {
          setAcceptDataUser(response.data);
        }
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
      });
  };
  const storeDataInLocalStorage = (item) => {
    localStorage.setItem("editBookData", JSON.stringify(item));
  };
  useEffect(() => {
    getAcceptBookforUserHandler();
  }, [!author]);

  const showRequestErrorNotification = () => {
    notification.error({
      message: "Something went wrong",
      description: "Internal server error.",
    });
  };

  const handleDelete = (_id) => {
    setBookToDeleteId(_id); // Store the _id of the book to be deleted
    setShow(true); // Show the confirmation modal
  };

  const viewBookHandler = (id) => {
    viewBook(id).then((res) => {
      if (res?.data?.role === "view") {
        setViewBookData(res?.data);
        localStorage.setItem("bookdata", JSON.stringify(res?.data));

        navigate("/previewexportpage");
      } else {
        console.log("View Permissionis not Allowed.");
      }
    });
  };

  const acceptRequest = (data) => {
    try {
      const modifiedData = {
        ...data,
        sender: data?.sender,
        BookId: data?.BookId,
        Requeststatus: "accepted",
      };

      axios
        .put(`http://10.16.16.108:7000/api/accept/request`, modifiedData)
        .then((res) => {
          if (res.status === 200) {
            message.success("Request accepted successfully");
            socket.emit("acceptRequestWithUserData", modifiedData);
          }

          getFriendRequestHandler();
        })
        .catch((error) => {
          if (error.response) {
          } else if (error.request) {
            showRequestErrorNotification();
          }
        });
    } catch (err) {
      console.error("Caught an exception:", err);
    }
  };

  const editicon = <span>Edit</span>;
  const deleteicon = <span>Delete</span>;
  const viewsicon = <span>views</span>;
  const exporticon = <span>Export</span>;
  const collicon = <span>Collicon</span>;

  const LiveChat = <span>Live Chat</span>;
  const declineRequest = (data) => {
    try {
      const modifiedData = {
        ...data,
        sender: data?.sender,
        BookId: data?.BookId,
        Requeststatus: "decline",
      };

      axios
        .put(`http://10.16.16.108:7000/api/accept/request`, modifiedData)
        .then((res) => {
          if (res.status === 200) {
            message.success("Request decline successfully");
          }
          getFriendRequestHandler();
        })
        .catch((error) => {
          if (error.request) {
            showRequestErrorNotification();
          }
        });
    } catch (err) {}
  };
  useEffect(() => {
    author && getFriendRequestHandler();
  }, []);

  return (
    <>
      <div className="common-container">
        <div className={mybookStyle.change_password_page}>
          <Sidebar />

          {author ? (
            <div className={mybookStyle.change_password_right}>
              <div className={mybookStyle.mybook_top_section}>
                <h2>Collaborations Invitation</h2>
              </div>
              {Object.keys(request)?.length > 0 ? (
                <div className={mybookStyle.mybook_pro_section}>
                  {request?.map((item) => {
                    return (
                      <div className={mybookStyle.mybook_product}>
                        <div className={mybookStyle.mybook_product_content}>
                          <div className={mybookStyle.mybook_pro_img}>
                            <img src={MybookPro} />
                          </div>
                          <div className={mybookStyle.mybook_pro_text}>
                            <span className={mybookStyle.mybook_text01}>
                              Title:
                            </span>
                            <span className={mybookStyle.mybook_text02}>
                              Collaborator's name
                            </span>
                          </div>
                          <div className={mybookStyle.mybook_pro_text}>
                            <span className={mybookStyle.mybook_text01}>
                              Book Title:
                            </span>
                            <span className={mybookStyle.mybook_text02}>
                              {item?.Book}
                            </span>
                          </div>
                          {/* <div className={mybookStyle.mybook_pro_text}>
                      <span className={mybookStyle.mybook_text01}>Role:</span>
                      <span className={mybookStyle.mybook_text02}>Editor</span>
                    </div> */}
                          <div className={mybookStyle.mybook_pro_text}>
                            <span className={mybookStyle.mybook_text01}>
                              Date:
                            </span>
                            <span className={mybookStyle.mybook_text02}>
                              {formatDate(item?.createdAt)}
                            </span>
                          </div>
                          <div className={mybookStyle.mybook_tooltip_btns}>
                            <div className={mybookStyle.edit_icon}>
                              <Tooltip placement="top" title="Accept">
                                <Button onClick={() => acceptRequest(item)}>
                                  <img src={Acceptlogo} />
                                </Button>
                              </Tooltip>
                            </div>
                            <div className={mybookStyle.edit_icon}>
                              <Tooltip placement="top" title="Decline">
                                <Button onClick={() => declineRequest(item)}>
                                  <img src={Declinelogo} />
                                </Button>
                              </Tooltip>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <h6 className={mybookStyle.request_not_found_message}>
                  You don't get any new request from user yet now.
                </h6>
              )}
            </div>
          ) : (
            <div className={mybookStyle.change_password_right}>
              <div className={mybookStyle.mybook_top_section}>
                <h2>Collaborations</h2>
                <NavLink
                  to="/sentinvitationspage"
                  className={mybookStyle.add_to_new_book}
                >
                  Sent Invitation
                </NavLink>
              </div>
              <div className={mybookStyle.mybook_pro_section}>
                {/* <div className={mybookStyle.mybook_product}>
                  <div className={mybookStyle.mybook_product_content}>
                    <div className={mybookStyle.mybook_pro_img}>
                      <img src={MybookPro} />
                    </div>
                    <div className={mybookStyle.mybook_pro_text}>
                      <span className={mybookStyle.mybook_text01}>Title:</span>
                      <span className={mybookStyle.mybook_text02}>
                        Collaborator's name
                      </span>
                    </div>
                    <div className={mybookStyle.mybook_pro_text}>
                      <span className={mybookStyle.mybook_text01}>
                        Book Title:
                      </span>
                      <span className={mybookStyle.mybook_text02}>
                        The Wool Trilogy
                      </span>
                    </div>
                    <div className={mybookStyle.mybook_pro_text}>
                      <span className={mybookStyle.mybook_text01}>Role:</span>
                      <span className={mybookStyle.mybook_text02}>Editor</span>
                    </div>
                    <div className={mybookStyle.mybook_pro_text}>
                      <span className={mybookStyle.mybook_text01}>
                        Start Date:
                      </span>
                      <span className={mybookStyle.mybook_text02}>
                        12-05-2023
                      </span>
                    </div>
                    <div className={mybookStyle.mybook_tooltip_btns}>
                      <div className={mybookStyle.edit_icon}>
                        <Tooltip placement="top" title={text}>
                          <Button>
                            <img src={Exporticon} />
                          </Button>
                        </Tooltip>
                      </div>
                    </div>
                  </div>
                </div> */}
                {/* <div className={mybookStyle.mybook_product}>
                  <div className={mybookStyle.mybook_product_content}>
                    <div className={mybookStyle.mybook_pro_img}>
                      <img src={MybookPro} />
                    </div>
                    <div className={mybookStyle.mybook_pro_text}>
                      <span className={mybookStyle.mybook_text01}>Title:</span>
                      <span className={mybookStyle.mybook_text02}>
                        Collaborator's name
                      </span>
                    </div>
                    <div className={mybookStyle.mybook_pro_text}>
                      <span className={mybookStyle.mybook_text01}>
                        Book Title:
                      </span>
                      <span className={mybookStyle.mybook_text02}>
                        The Wool Trilogy
                      </span>
                    </div>
                    <div className={mybookStyle.mybook_pro_text}>
                      <span className={mybookStyle.mybook_text01}>Role:</span>
                      <span className={mybookStyle.mybook_text02}>Editor</span>
                    </div>
                    <div className={mybookStyle.mybook_pro_text}>
                      <span className={mybookStyle.mybook_text01}>
                        Start Date:
                      </span>
                      <span className={mybookStyle.mybook_text02}>
                        12-05-2023
                      </span>
                    </div>
                    <div className={mybookStyle.mybook_tooltip_btns}>
                      <div className={mybookStyle.edit_icon}>
                        <Tooltip placement="top" title={text}>
                          <Button>
                            <img src={Exporticon} />
                          </Button>
                        </Tooltip>
                      </div>
                    </div>
                  </div>
                </div> */}
                {/* <div className={mybookStyle.mybook_product}>
                  <div className={mybookStyle.mybook_product_content}>
                    <div className={mybookStyle.mybook_pro_img}>
                      <img src={MybookPro} />
                    </div>
                    <div className={mybookStyle.mybook_pro_text}>
                      <span className={mybookStyle.mybook_text01}>Title:</span>
                      <span className={mybookStyle.mybook_text02}>
                        Collaborator's name
                      </span>
                    </div>
                    <div className={mybookStyle.mybook_pro_text}>
                      <span className={mybookStyle.mybook_text01}>
                        Book Title:
                      </span>
                      <span className={mybookStyle.mybook_text02}>
                        The Wool Trilogy
                      </span>
                    </div>
                    <div className={mybookStyle.mybook_pro_text}>
                      <span className={mybookStyle.mybook_text01}>Role:</span>
                      <span className={mybookStyle.mybook_text02}>Editor</span>
                    </div>
                    <div className={mybookStyle.mybook_pro_text}>
                      <span className={mybookStyle.mybook_text01}>
                        Start Date:
                      </span>
                      <span className={mybookStyle.mybook_text02}>
                        12-05-2023
                      </span>
                    </div>
                    <div className={mybookStyle.mybook_tooltip_btns}>
                      <div className={mybookStyle.edit_icon}>
                        <Tooltip placement="top" title={text}>
                          <Button>
                            <img src={Exporticon} />
                          </Button>
                        </Tooltip>
                      </div>
                    </div>
                  </div>
                </div> */}

                {acceptdataUser?.bookDetail?.length > 0 ? (
                  <div className={mybookStyle.mybook_pro_section}>
                    {acceptdataUser?.bookDetail &&
                      acceptdataUser?.bookDetail?.map((item, index) => (
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
                                      onClick={() => viewBookHandler(item?._id)}
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
                                <div className={mybookStyle.edit_icon}>
                                  <Tooltip placement="top" title={LiveChat}>
                                    <Button
                                      onClick={() => {
                                        localStorage.setItem(
                                          "authorEmail",
                                          acceptdataUser?.receiver
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
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Collaborations;
