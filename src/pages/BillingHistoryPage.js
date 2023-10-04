import React from "react";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import BillingHistory from "../components/BillingHistory/Billinghistory";

function BillingHistoryPage() {
  return (
    <header className="App-header">
      <Header />
      <BillingHistory />
      <Footer />
    </header>
  );
}

export default BillingHistoryPage;
