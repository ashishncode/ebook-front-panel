import React from "react";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import Collaborations from "../components/Collaboration/Collaborations";
import HeaderLogin from "../components/common/Header_login";

const CollaborationPage = () => {
  const author = localStorage.getItem("authortype");
  const userEmail = localStorage.getItem("userEmail");
  return (
    <header className="App-header">
      {author || userEmail ? <HeaderLogin /> : <Header />}
      <Collaborations />
      <Footer />
    </header>
  );
};

export default CollaborationPage;
