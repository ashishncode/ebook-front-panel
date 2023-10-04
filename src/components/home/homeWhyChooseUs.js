import React from "react";
import Accordion from "react-bootstrap/Accordion";
import WhyChooseImg from "../../assets/images/why-choose-right-img.png";
import PaymentIcon from "../../assets/images/payment-icon.png";
import UserImg from "../../assets/images/user-1.jpg";
import UserPlus from "../../assets/images/user-2.png";

const HomeWhyChooseUs = () => {
  return (
    <>
      <div className="common-container">
        <div className="home-why-choose-section">
          <div className="why-choose-title">
            <p>
              We've done it carefully and simply. Combined with the ingredients
              <br></br>
              makes for beautiful landings.
            </p>
          </div>
          <div className="home-why-choose-content">
            <div className="home-why-choose-left">
              <div className="why-choose-text">
                <span>Why choose us?</span>
                <strong>World of top author at your fingertips</strong>
              </div>
              <div className="home-accordion">
                <Accordion defaultActiveKey="0">
                  <Accordion.Item eventKey="0">
                    <Accordion.Header>Seamless Search</Accordion.Header>
                    <Accordion.Body>
                      It only takes 5 minutes. Set-up is smooth and simple, with
                      fully customisable page design to reflect your brand.
                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey="1">
                    <Accordion.Header>Hire top author</Accordion.Header>
                    <Accordion.Body>
                      Protected payments, every time
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              </div>
              <div className="protected-payment-text">
                Protected payments, every time
              </div>
              <a className="learn-more-btn" href="/">
                Learn more
              </a>
            </div>
            <div className="home-why-choose-right">
              <img src={WhyChooseImg} />
              <div className="escrow-system-box">
                <div className="payment-icon">
                  <img src={PaymentIcon} />
                </div>
                <div className="payment-text">
                  <span>Payment</span>
                  <strong>Escrow System</strong>
                </div>
              </div>
              <div className="users-text-box">
                <span className="users-text">700+ users</span>
                <div className="users-boxs">
                  <div className="users">
                    <img src={UserImg} />
                  </div>
                  <div className="users">
                    <img src={UserImg} />
                  </div>
                  <div className="users">
                    <img src={UserImg} />
                  </div>
                  <div className="users">
                    <img src={UserImg} />
                  </div>
                  <div className="users">
                    <img src={UserPlus} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeWhyChooseUs;
