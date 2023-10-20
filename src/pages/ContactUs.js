import React from "react";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import Contactus from "../components/contactus/contactus";
import HeaderLogin from "../components/common/Header_login";

const ContactUs = () => {
  const author = localStorage.getItem("authortype");
  const userEmail = localStorage.getItem("userEmail");
  return (
    <header className="App-header">
      {author || userEmail ? <HeaderLogin /> : <Header />}
      <Contactus />
      <Footer />
    </header>
  );
};

export default ContactUs;
