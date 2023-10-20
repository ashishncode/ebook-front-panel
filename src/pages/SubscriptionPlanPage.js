import React from "react";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import Subscriptionplan from "../components/SubscriptionPlan/Subscriptionplan";
import HeaderLogin from "../components/common/Header_login";

const SubscriptionPlanPage = () => {
  const userEmail = localStorage.getItem("userEmail");
  return (
    <header className="App-header">
      {userEmail ? <HeaderLogin /> : <Header />}
      <Subscriptionplan />
      <Footer />
    </header>
  );
};

export default SubscriptionPlanPage;
