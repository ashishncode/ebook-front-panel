import React from "react";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import Service from "../components/services/services";
import HeaderLogin from "../components/common/Header_login";

const Services = () => {
  const author = localStorage.getItem("authortype");
  const userEmail = localStorage.getItem("userEmail");
  return (
    <header className="App-header">
      {author || userEmail ? <HeaderLogin /> : <Header />}
      <Service />
      <Footer />
    </header>
  );
};

export default Services;
