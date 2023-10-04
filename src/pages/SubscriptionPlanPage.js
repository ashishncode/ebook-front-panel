import React from "react";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import Subscriptionplan from "../components/SubscriptionPlan/Subscriptionplan";

function SubscriptionPlanPage() {
  return (
    <header className="App-header">
      <Header />
      <Subscriptionplan />
      <Footer />
    </header>
  );
}

export default SubscriptionPlanPage;
