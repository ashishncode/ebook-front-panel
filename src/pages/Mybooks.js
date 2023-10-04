import React from "react";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import Mybook from "../components/mybook/Mybook";

function Mybooks() {
  return (
    <header className="App-header">
      <Header />
      <Mybook />
      <Footer />
    </header>
  );
}

export default Mybooks;
