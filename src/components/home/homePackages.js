import React from "react";

const HomePackages = () => {
  return (
    <div className="common-container">
      <div className="home-packages-section">
        <h2>Packages</h2>
        <div className="home-package-model">
          <div className="home-package-box">
            <div className="home-package-text">
              <span>Standard</span>
              <div className="price-text">
                <apan></apan>0<span className="pac-text"></span>
              </div>
              <div className="pac-support-text">
                <p>Use 10 pages</p>
                <p>24x7 Chat support</p>
              </div>
              <a className="choose-plan-home" href="/">
                Choose Plan
              </a>
            </div>
          </div>
          <div className="home-package-box">
            <div className="home-package-text red-box">
              <span>Gold</span>
              <div className="price-text">
                <span>$</span>27.
                <span className="pac-text">99</span>
              </div>
              <div className="pac-support-text">
                <p>Use 10 pages</p>
                <p>24x7 Chat support</p>
                <p>30 Day Money Back Guarantee</p>
              </div>
              <a className="choose-plan-home" href="/">
                Choose Plan
              </a>
            </div>
          </div>
          <div className="home-package-box">
            <div className="home-package-text">
              <span>Diamond</span>
              <div className="price-text">
                <span>$</span>39.
                <span className="pac-text">99</span>
              </div>
              <div className="pac-support-text">
                <p>Use 10 pages</p>
                <p>24x7 Chat support</p>
                <p>30 Day Money Back Guarantee</p>
              </div>
              <a className="choose-plan-home" href="/">
                Choose Plan
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePackages;
