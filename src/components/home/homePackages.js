import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDollarSign } from "@fortawesome/free-solid-svg-icons";

const HomePackages = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  useEffect(() => {
    axios
      .get(`http://10.16.16.108:7000/api/list/subscription/frontend`)
      .then((response) => {
        console.log(response, "response from package");
        setSubscriptions(response.data.getAllSubscription);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className="common-container">
      <div className="home-packages-section">
        <h2>Packages</h2>
        <div className="home-package-model">
          {subscriptions.map((subscription) => (
            <div key={subscription._id} className="home-package-box">
              <div className="home-package-text">
                <span>{subscription.packageName}</span>
                <div className="price-text">
                  <div className="package-icon-price-div">
                    <apan className="package-dollar-icon">
                      <FontAwesomeIcon icon={faDollarSign} />
                    </apan>
                    {subscription.packagePrice}
                  </div>
                  <span className="pac-text"></span>
                </div>
                <div className="pac-support-text">
                  <p>{subscription.packageDescription}</p>
                  {/* <p>24x7 Chat support</p> */}
                </div>
                {/* <a className="choose-plan-home" href="/">
                Choose Plan
              </a> */}
                <Link
                  className="choose-plan-home"
                  to={`/signup?plan=${subscription.packageName}&price=${subscription.packagePrice}`}
                >
                  Choose Plan
                </Link>
              </div>
            </div>
          ))}
          {/* <div className="home-package-box">
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
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default HomePackages;
