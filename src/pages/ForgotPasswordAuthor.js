import React from "react";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import ForgotPasswordAuthor from "../components/ForgotPassword/forgotpasswordauthor";

const ForgotPasswordAuthorPage = () => {
  return (
    <header className="App-header">
      <Header />
      <ForgotPasswordAuthor />
      <Footer />
    </header>
  );
};

export default ForgotPasswordAuthorPage;
