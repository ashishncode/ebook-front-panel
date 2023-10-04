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
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Dashboard() {
  const [myAuthor, setAuthor] = useState([]);
  const [completedBook, setCompletedBooks] = useState([]);
  const [incompleteBook, setInCompleteBooks] = useState([]);
  const [validated, setValidated] = useState(false);
  const [recentBook, setMyRecentBook] = useState([]);
  const [email, setEmail] = useState("");
  const authorCountElement = document.getElementById('authorCount');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          authorResponse,
          recentBooksResponse,
          completedBooksResponse,
          incompleteBooksResponse,
        ] = await Promise.all([
          axios.get('http://10.16.16.108:7000/countAuthors'),
          axios.get(`http://10.16.16.108:7000/latest-books/byuser/${email}`),
          axios.get('http://10.16.16.108:7000/count-completedbooks'),
          axios.get('http://10.16.16.108:7000/count-incompletebooks'),
        ]);
        // Handle each response separately
        const authorCount = authorResponse.data.authorCount;
        setAuthor(authorResponse.data.authorCount);

        if (authorCountElement) {
          authorCountElement.textContent = `Total Authors: ${authorCount}`;
        }

        if (email) {
          setMyRecentBook(recentBooksResponse.data);
        }

        setCompletedBooks(completedBooksResponse.data);
        setInCompleteBooks(incompleteBooksResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [email, authorCountElement]);

  useEffect(() => {
    // Get email from local storage
    const storedEmail = localStorage.getItem('userEmail');
    if (storedEmail) {
      setEmail(storedEmail);
    }
  }, []);

  // if (recentBook.length === 0) {
  //   return <div>No books Added</div>;
  // }
  // const handleSubmit = (event) => {
  //   const form = event.currentTarget;
  //   if (form.checkValidity() === false) {
  //     event.preventDefault();
  //     event.stopPropagation();
  //   }
  //   setValidated(true);
  // };
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
                    <strong>{incompleteBook?.count}</strong>
                    <span>Books in progress</span>
                  </div>
                </div>
                <div className={DashboardStyle.dashboard_top_box}>
                  <div
                    className={`${DashboardStyle.dashboard_top_box_text} ${DashboardStyle.box_text02} `}
                  >
                    <strong>{completedBook?.count}</strong>
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
              <div className={DashboardStyle.create_view_all_btn}>
                <NavLink
                  to="/createnewbookpage"
                  className={DashboardStyle.create_newbook}
                >
                  Create a new book
                </NavLink>
                <NavLink
                  to="/mybooks"
                  className={DashboardStyle.view_all_btn}>
                  View all books
                </NavLink>
              </div>
              <div className={DashboardStyle.dashboard_recent_book}>
                <h2>My recent book</h2>
                <Row >
                  <Form.Group as={Col} md="12" controlId="validationCustom04">
                    <Form.Control
                      type="hidden"
                      name="email"
                      value={email}
                    />
                  </Form.Group>
                </Row>

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
              </div>
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
                        <tr>
                          <td>
                            User one has requested you for writing this book
                          </td>
                          <td>Reject</td>
                        </tr>
                        <tr>
                          <td>
                            User one has requested you for writing this book
                          </td>
                          <td>Accept</td>
                        </tr>
                        <tr>
                          <td>
                            User one has requested you for writing this book
                          </td>
                          <td>Reject</td>
                        </tr>
                        <tr>
                          <td>
                            User one has requested you for writing this book
                          </td>
                          <td>Accept</td>
                        </tr>
                        <tr>
                          <td>
                            User one has requested you for writing this book
                          </td>
                          <td>Reject</td>
                        </tr>
                        <tr>
                          <td>
                            User one has requested you for writing this book
                          </td>
                          <td>Accept</td>
                        </tr>
                        <tr>
                          <td>
                            User one has requested you for writing this book
                          </td>
                          <td>Reject</td>
                        </tr>
                        <tr>
                          <td>
                            User one has requested you for writing this book
                          </td>
                          <td>Accept</td>
                        </tr>
                      </tbody>
                    </Table>
                  </div>
                </div>
              </div>
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
                        <span>40</span>
                      </div>
                    </div>
                    <div className={DashboardStyle.chart_text}>
                      <span className={DashboardStyle.chart_icon2}></span>
                      <div className={DashboardStyle.text}>
                        <span>Pending</span>
                        <span>30</span>
                      </div>
                    </div>
                    <div className={DashboardStyle.chart_text}>
                      <span className={DashboardStyle.chart_icon3}></span>
                      <div className={DashboardStyle.text}>
                        <span>In progress</span>
                        <span>30</span>
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
}

export default Dashboard;
