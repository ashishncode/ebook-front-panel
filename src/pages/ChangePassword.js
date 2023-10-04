import React from "react";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import Changepassword from "../components/ChangePassword/Changepassword";

function ChangePassword() {
  return (
    <header className="App-header">
      <Header />
      <Changepassword />
      <Footer />
    </header>
  );
}

export default ChangePassword;
