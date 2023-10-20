import Dropdown from "react-bootstrap/Dropdown";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import ViewIcon from "../../assets/images/view_icon.png";
import RecentBook from "../../assets/images/recent_book.png";
import DashboardStyle from "../../assets/css/Dashboard.module.css";
import Table from "react-bootstrap/Table";
import Chart from "../common/Chart";
import Sidebar from "../common/Sidebar";
import { NavLink } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  getAuthorAllRequest,
  getProgressData,
  latestBooklistofUser,
  getTotalAuthorCount,
  countIncompleteBook,
  countCompletedBook,
  getAcceptedBookDetail,
} from "../../utility/api";

import io from "socket.io-client";
// import jwt from "jsonwebtoken";
const socket = io.connect("http://10.16.16.108:7000", {
  transports: ["websocket"],
  upgrade: false,
  cors: true,
});
const Dashboard = () => {
  const [myAuthor, setAuthor] = useState("");
  const [completedBook, setCompletedBooks] = useState("");
  const [incompleteBook, setInCompleteBooks] = useState("");
  const [recentBook, setMyRecentBook] = useState([]);
  const [allRequest, setAllRequest] = useState([]);
  const [proData, setProData] = useState({});
  const [acceptdata, setAcceptData] = useState([]);
  const authorId = localStorage.getItem("authorId");

  const [loading, setLoading] = useState(false);
  //online Authors
  const [onlineAuthors, setOnlineAuthors] = useState([]);
  const author = localStorage.getItem("authortype");
  const authorEmail = localStorage.getItem("authorEmail");
  const userEmail = localStorage.getItem("userEmail");

  const animateCounter = (setStateFunction, totalCount) => {
    const step = 1; // Increment by 1 each time
    let currentCount = 0;

    const timer = setInterval(() => {
      currentCount += step;
      setStateFunction((prevCount) =>
        currentCount < totalCount ? currentCount : totalCount
      );

      if (currentCount >= totalCount) {
        clearInterval(timer);
      }
    }, 40); // Adjust the interval as needed
  };
  const getProgressDataHandler = () => {
    getProgressData().then((res) => {
      if (res.status === 200) {
        setProData(res?.data);
      }
    });
  };

  const getRecentBookList = async () => {
    try {
      if (userEmail) {
        latestBooklistofUser(userEmail).then((res) => {
          if (res.status === 200) {
            setMyRecentBook(res?.data);
          }
        });
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const countTotalAuthor = async () => {
    getTotalAuthorCount().then((response) => {
      if (response.status === 200) {
        const totalCount = response?.data?.authorCount;
        animateCounter(setAuthor, totalCount);
      }
    });
  };

  const getTotalProgressBook = async () => {
    try {
      countIncompleteBook().then((response) => {
        if (response.status === 200) {
          const totalCount = response?.data?.count;
          animateCounter(setInCompleteBooks, totalCount);
        }
      });
    } catch (error) {
      console.error("Error fetching total users:", error);
    }
  };

  const getTotalCompletedBook = async () => {
    countCompletedBook().then((response) => {
      if (response.status === 200) {
        const totalCount = response?.data?.count;
        animateCounter(setCompletedBooks, totalCount);
      }
    });
  };

  const getFriendRequest = async (e) => {
    getAuthorAllRequest(authorEmail)
      .then((response) => {
        if (response.status === 200) {
          setAllRequest(response.data);
        }
      })
      .catch((err) => {});
  };

  const getAcceptBook = async () => {
    getAcceptedBookDetail(authorId)
      .then((response) => {
        if (response.status === 200) {
          setAcceptData(response.data); // Assuming the API response is an object
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  };

  useEffect(() => {
    socket.on("onlineAuthors", (authorIds) => {
      // Extract the unique IDs using a Set
      const data = {
        Id: authorIds.Id,
        status: authorIds.status,
      };
      localStorage.setItem("onlineAuthors", JSON.stringify(data));
    });
    // return () => {
    //   // Remove the event listener when the component unmounts
    //   socket.off('onlineAuthors');
    // };
  }, []);

  useEffect(() => {
    author && getFriendRequest();
    getProgressDataHandler();
    countTotalAuthor();
    getTotalProgressBook();
    getTotalCompletedBook();
    getRecentBookList();
    getAcceptBook();
  }, []);

  return (
    <>
      <div className="common-container">
        <div className={DashboardStyle.change_password_page}>
          <Sidebar />
          <div className={DashboardStyle.change_password_right}>
            <div className={DashboardStyle.dashboard_page_content}>
              <div className={DashboardStyle.dashboard_top_section}>
                <div className={DashboardStyle.dashboard_top_box}>
                  <div
                    className={`${DashboardStyle.dashboard_top_box_text} box_text01`}
                  >
                    <strong>{incompleteBook}</strong>
                    <span>Books in progress</span>
                  </div>
                </div>
                <div className={DashboardStyle.dashboard_top_box}>
                  <div
                    className={`${DashboardStyle.dashboard_top_box_text} ${DashboardStyle.box_text02} `}
                  >
                    <strong>{completedBook}</strong>
                    <span>Completed / Published books</span>
                  </div>
                </div>
                <div className={DashboardStyle.dashboard_top_box}>
                  <div
                    className={`${DashboardStyle.dashboard_top_box_text} ${DashboardStyle.box_text03} `}
                  >
                    <strong>{myAuthor}</strong>
                    <span>Authors</span>
                  </div>
                </div>
              </div>
              {author ? (
                <div className={DashboardStyle.create_view_all_btn}>
                  <NavLink
                    to="/collaborationpage"
                    className={DashboardStyle.create_newbook}
                  >
                    View all Collaboration
                  </NavLink>
                  <NavLink
                    to="/mybooks"
                    className={DashboardStyle.view_all_btn}
                  >
                    View all books
                  </NavLink>
                </div>
              ) : (
                <div className={DashboardStyle.create_view_all_btn}>
                  <NavLink
                    to="/createnewbookpage"
                    className={DashboardStyle.create_newbook}
                  >
                    Create a new book
                  </NavLink>
                  <NavLink
                    to="/mybooks"
                    className={DashboardStyle.view_all_btn}
                  >
                    View all books
                  </NavLink>
                </div>
              )}

              <div className={DashboardStyle.dashboard_recent_book}>
                <h2>My recent book</h2>
                <Row>
                  <Form.Group as={Col} md="12" controlId="validationCustom04">
                    <Form.Control
                      type="hidden"
                      name="email"
                      value={userEmail}
                    />
                  </Form.Group>
                </Row>

                {author ? (
                  <div className={DashboardStyle.dashboard_recent_section}>
                    {acceptdata?.length > 0
                      ? acceptdata.map((book) => {
                          return (
                            <div className={DashboardStyle.recent_book_box}>
                              <div
                                className={DashboardStyle.recent_book_text_box}
                              >
                                <div
                                  className={
                                    DashboardStyle.recent_book_text_img
                                  }
                                >
                                  <img src={RecentBook} />
                                </div>
                                <span>{book?.bookTitle}</span>
                              </div>
                            </div>
                          );
                        })
                      : null}
                  </div>
                ) : (
                  <div className={DashboardStyle.dashboard_recent_section}>
                    {recentBook.map((book) => (
                      <div className={DashboardStyle.recent_book_box}>
                        <div className={DashboardStyle.recent_book_text_box}>
                          <div className={DashboardStyle.recent_book_text_img}>
                            <img src={RecentBook} />
                          </div>
                          <span>{book?.bookTitle}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              {!author && (
                <div className={DashboardStyle.dashboard_recent_book}>
                  <h2>My Package</h2>
                  <div className={DashboardStyle.dashboard_table_main}>
                    <div className={DashboardStyle.dashboard_table}>
                      <Table>
                        <thead>
                          <tr>
                            <th>Name</th>
                            <th>Amount</th>
                            <th>Package Type</th>
                            <th>Start date</th>
                            <th>End date</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>Gold</td>
                            <td>400</td>
                            <td>Paid</td>
                            <td>20/05/23</td>
                            <td>30/05/23</td>
                          </tr>
                          <tr>
                            <td>Gold</td>
                            <td>400</td>
                            <td>Paid</td>
                            <td>20/05/23</td>
                            <td>30/05/23</td>
                          </tr>
                          <tr>
                            <td>Gold</td>
                            <td>400</td>
                            <td>Paid</td>
                            <td>20/05/23</td>
                            <td>30/05/23</td>
                          </tr>
                          <tr>
                            <td>Gold</td>
                            <td>400</td>
                            <td>Paid</td>
                            <td>20/05/23</td>
                            <td>30/05/23</td>
                          </tr>
                          <tr>
                            <td>Gold</td>
                            <td>400</td>
                            <td>Paid</td>
                            <td>20/05/23</td>
                            <td>30/05/23</td>
                          </tr>
                          <tr>
                            <td>Gold</td>
                            <td>400</td>
                            <td>Paid</td>
                            <td>20/05/23</td>
                            <td>30/05/23</td>
                          </tr>
                          <tr>
                            <td>Gold</td>
                            <td>400</td>
                            <td>Paid</td>
                            <td>20/05/23</td>
                            <td>30/05/23</td>
                          </tr>
                          <tr>
                            <td>Gold</td>
                            <td>400</td>
                            <td>Paid</td>
                            <td>20/05/23</td>
                            <td>30/05/23</td>
                          </tr>
                        </tbody>
                      </Table>
                    </div>
                  </div>
                </div>
              )}
              {author && (
                <div className={DashboardStyle.dashboard_recent_book}>
                  <h2>Notifications</h2>
                  <div className={DashboardStyle.dashboard_table_main}>
                    <div className={DashboardStyle.dashboard_table}>
                      <Table>
                        <thead>
                          <tr>
                            <th>Name</th>
                            <th>Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {allRequest?.map((item) => {
                            return (
                              <tr>
                                <td>
                                  {item?.Book} has requested you for writing
                                  this book
                                </td>
                                <td>{item?.Requeststatus}</td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </Table>
                    </div>
                  </div>
                </div>
              )}

              <div className={DashboardStyle.dashboard_recent_book}>
                <h2>Recent Activity</h2>
                <div className={DashboardStyle.dashboard_table_main}>
                  <div className={DashboardStyle.dashboard_table}>
                    <Table>
                      <thead>
                        <tr>
                          <th>Title</th>
                          <th>Action</th>
                          <th>Date & Time</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>Worlds Together</td>
                          <td className={DashboardStyle.wdit_delete_btn}>
                            <a href="/" className={DashboardStyle.edit_btn}>
                              Edit
                            </a>
                            <a href="/" className={DashboardStyle.delete_btn}>
                              Delete
                            </a>
                          </td>
                          <td className={DashboardStyle.date_month}>
                            <span>20/05/23</span>
                            <span>10:38 PM</span>
                          </td>
                        </tr>
                        <tr>
                          <td>Worlds Together</td>
                          <td className={DashboardStyle.wdit_delete_btn}>
                            <a href="/" className={DashboardStyle.edit_btn}>
                              Edit
                            </a>
                            <a href="/" className={DashboardStyle.delete_btn}>
                              Delete
                            </a>
                          </td>
                          <td className={DashboardStyle.date_month}>
                            <span>20/05/23</span>
                            <span>10:38 PM</span>
                          </td>
                        </tr>
                        <tr>
                          <td>Worlds Together</td>
                          <td className={DashboardStyle.wdit_delete_btn}>
                            <a href="/" className={DashboardStyle.edit_btn}>
                              Edit
                            </a>
                            <a href="/" className={DashboardStyle.delete_btn}>
                              Delete
                            </a>
                          </td>
                          <td className={DashboardStyle.date_month}>
                            <span>20/05/23</span>
                            <span>10:38 PM</span>
                          </td>
                        </tr>
                        <tr>
                          <td>Worlds Together</td>
                          <td className={DashboardStyle.wdit_delete_btn}>
                            <a href="/" className={DashboardStyle.edit_btn}>
                              Edit
                            </a>
                            <a href="/" className={DashboardStyle.delete_btn}>
                              Delete
                            </a>
                          </td>
                          <td className={DashboardStyle.date_month}>
                            <span>20/05/23</span>
                            <span>10:38 PM</span>
                          </td>
                        </tr>
                        <tr>
                          <td>Worlds Together</td>
                          <td className={DashboardStyle.wdit_delete_btn}>
                            <a href="/" className={DashboardStyle.edit_btn}>
                              Edit
                            </a>
                            <a href="/" className={DashboardStyle.delete_btn}>
                              Delete
                            </a>
                          </td>
                          <td className={DashboardStyle.date_month}>
                            <span>20/05/23</span>
                            <span>10:38 PM</span>
                          </td>
                        </tr>
                        <tr>
                          <td>Worlds Together</td>
                          <td className={DashboardStyle.wdit_delete_btn}>
                            <a href="/" className={DashboardStyle.edit_btn}>
                              Edit
                            </a>
                            <a href="/" className={DashboardStyle.delete_btn}>
                              Delete
                            </a>
                          </td>
                          <td className={DashboardStyle.date_month}>
                            <span>20/05/23</span>
                            <span>10:38 PM</span>
                          </td>
                        </tr>
                        <tr>
                          <td>Worlds Together</td>
                          <td className={DashboardStyle.wdit_delete_btn}>
                            <a href="/" className={DashboardStyle.edit_btn}>
                              Edit
                            </a>
                            <a href="/" className={DashboardStyle.delete_btn}>
                              Delete
                            </a>
                          </td>
                          <td className={DashboardStyle.date_month}>
                            <span>20/05/23</span>
                            <span>10:38 PM</span>
                          </td>
                        </tr>
                        <tr>
                          <td>Worlds Together</td>
                          <td className={DashboardStyle.wdit_delete_btn}>
                            <a href="/" className={DashboardStyle.edit_btn}>
                              Edit
                            </a>
                            <a href="/" className={DashboardStyle.delete_btn}>
                              Delete
                            </a>
                          </td>
                          <td className={DashboardStyle.date_month}>
                            <span>20/05/23</span>
                            <span>10:38 PM</span>
                          </td>
                        </tr>
                      </tbody>
                    </Table>
                  </div>
                </div>
              </div>
              <div className={DashboardStyle.dashboard_recent_book}>
                <h2>Progress Tracker</h2>
                <div className={DashboardStyle.dashboard_chart_section}>
                  <div className={DashboardStyle.dashboard_chart_left}>
                    <div className={DashboardStyle.chart_text}>
                      <span className={DashboardStyle.chart_icon}></span>
                      <div className={DashboardStyle.text}>
                        <span>Completed</span>
                        <span>{proData?.completedCount}</span>
                      </div>
                    </div>
                    {/* <div className={DashboardStyle.chart_text}>
                      <span className={DashboardStyle.chart_icon2}></span>
                      <div className={DashboardStyle.text}>
                        <span>Pending</span>
                        <span>30</span>
                      </div>
                    </div> */}
                    <div className={DashboardStyle.chart_text}>
                      <span className={DashboardStyle.chart_icon3}></span>
                      <div className={DashboardStyle.text}>
                        <span>In progress</span>
                        <span>{proData?.incompleteCount}</span>
                      </div>
                    </div>
                  </div>
                  <div className={DashboardStyle.dashboard_chart_right}>
                    <Chart />
                  </div>
                </div>
              </div>
              <div className={DashboardStyle.dashboard_recent_book}>
                <h2>Quick Links</h2>
                <div className={DashboardStyle.quick_links_section}>
                  <ul>
                    <li>
                      <a href="/">Account settings</a>
                    </li>
                    <li>
                      <a href="/">Subscription management</a>
                    </li>
                    <li>
                      <a href="/">Help and Support</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
