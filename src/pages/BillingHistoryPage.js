import React from "react";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import BillingHistory from "../components/BillingHistory/Billinghistory";
import HeaderLogin from "../components/common/Header_login";

const BillingHistoryPage = () => {
  const userEmail = localStorage.getItem("userEmail");
  return (
    <header className="App-header">
      {userEmail ? <HeaderLogin /> : <Header />}
      <BillingHistory />
      <Footer />
    </header>
  );
};

export default BillingHistoryPage;
