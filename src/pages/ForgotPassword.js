import React from "react";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import Forgotpassword from "../components/ForgotPassword/Forgotpassword";

const ForgotPassword = () => {
  return (
    <header className="App-header">
      <Header />
      <Forgotpassword />
      <Footer />
    </header>
  );
};

export default ForgotPassword;
