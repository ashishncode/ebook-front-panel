import React from "react";
import BannerMain from "../../assets/images/home-main-banner.jpg";

const MainBanner = () => {
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
              <strong>3000+</strong>
              <span>Books</span>
            </div>
            <div className="text-counter">
              <strong>500+</strong>
              <span>Authors</span>
            </div>
            <div className="text-counter">
              <strong>700+</strong>
              <span>Users</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainBanner;
