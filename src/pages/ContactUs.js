import React from "react";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import Contactus from "../components/contactus/contactus";

function ContactUs() {
  return (
    <header className="App-header">
      <Header />
      <Contactus />
      <Footer />
    </header>
  );
}

export default ContactUs;
