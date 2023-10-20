import React from "react";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import Mybook from "../components/mybook/Mybook";
import HeaderLogin from "../components/common/Header_login";

const Mybooks = () => {
  const author = localStorage.getItem("authortype");
  const userEmail = localStorage.getItem("userEmail");
  return (
    <header className="App-header">
      {author || userEmail ? <HeaderLogin /> : <Header />}
      <Mybook />
      <Footer />
    </header>
  );
};

export default Mybooks;
