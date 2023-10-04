import React from "react";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import Currentsubscription from "../components/CurrentSubscription/Currentsubscription";

function CurrentSubscriptionPage() {
  return (
    <header className="App-header">
      <Header />
      <Currentsubscription />
      <Footer />
    </header>
  );
}

export default CurrentSubscriptionPage;
