import React from "react";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import Changepassword from "../components/ChangePassword/Changepassword";
import HeaderLogin from "../components/common/Header_login";

const ChangePassword = () => {
  const author = localStorage.getItem("authortype");
  const userEmail = localStorage.getItem("userEmail");
  return (
    <header className="App-header">
      {author || userEmail ? <HeaderLogin /> : <Header />}
      <Changepassword />
      <Footer />
    </header>
  );
};

export default ChangePassword;
