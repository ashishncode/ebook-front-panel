import React from "react";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import AuthorLogin from "../components/Authorlogin/Authorlogin";

const AuthorLoginPage = () => {
  return (
    <header className="App-header">
      <Header />
      <AuthorLogin />
      <Footer />
    </header>
  );
};

export default AuthorLoginPage;
