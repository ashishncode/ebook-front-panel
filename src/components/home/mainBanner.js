import React from "react";
import BannerMain from "../../assets/images/home-main-banner.jpg";
import { useState, useEffect } from "react";
import axios from "axios";
import {
  totalBookCount,
  getTotalAuthorCount,
  getTotalUserCount,
} from "../../utility/api";

const MainBanner = () => {
  const [totalBooks, setTotalBooks] = useState("");
  const [totalAuthor, setTotalAuthor] = useState("");
  const [totalUsers, setTotalUsers] = useState("");

  useEffect(() => {
    const fetchTotalBooks = async () => {
      try {
        totalBookCount().then((response) => {
          if (response.status === 200) {
            const totalCount = response.data.totalBooksCount;
            animateCounter(setTotalBooks, totalCount);
          }
        });
      } catch (error) {
        console.error("Error fetching total books:", error);
      }
    };

    const fetchTotalAuthors = async () => {
      try {
        getTotalAuthorCount().then((response) => {
          if (response.status === 200) {
            const totalCount = response.data.authorCount;
            animateCounter(setTotalAuthor, totalCount);
          }
        });
      } catch (error) {
        console.error("Error fetching total authors:", error);
      }
    };

    const fetchTotalUsers = async () => {
      try {
        getTotalUserCount().then((response) => {
          if (response.status === 200) {
            const totalCount = response.data.TotalUsers;
            animateCounter(setTotalUsers, totalCount);
          }
        });
      } catch (error) {
        console.error("Error fetching total users:", error);
      }
    };

    fetchTotalBooks();
    fetchTotalAuthors();
    fetchTotalUsers();
  }, []);

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
  return (
    <div className="home-main-banner">
      <img src={BannerMain} />
      <div className="banner-main-content">
        <div className="main-banner-text">
          <h2>
            Connecting Authors at<br></br> One Place !
          </h2>
          <p>Write and Publish your dream thought as an eBook !!</p>
          <div className="banner-counter">
            <div className="text-counter">
              <strong>{`${totalBooks}+`}</strong>
              <span>Books</span>
            </div>
            <div className="text-counter">
              <strong>{`${totalAuthor}+`}</strong>
              <span>Authors</span>
            </div>
            <div className="text-counter">
              <strong>{`${totalUsers}+`}</strong>
              <span>Users</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainBanner;
