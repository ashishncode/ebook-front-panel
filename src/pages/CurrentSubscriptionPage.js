import React from "react";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import Currentsubscription from "../components/CurrentSubscription/Currentsubscription";
import HeaderLogin from "../components/common/Header_login";

const CurrentSubscriptionPage = () => {
  const userEmail = localStorage.getItem("userEmail");
  return (
    <header className="App-header">
      {userEmail ? <HeaderLogin /> : <Header />}
      <Currentsubscription />
      <Footer />
    </header>
  );
};

export default CurrentSubscriptionPage;
