import React from "react";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import EditProfile from "../components/Editprofile/Editprofile";
import HeaderLogin from "../components/common/Header_login";

const EditprofilePage = () => {
  const author = localStorage.getItem("authortype");
  const userEmail = localStorage.getItem("userEmail");
  return (
    <header className="App-header">
      {author || userEmail ? <HeaderLogin /> : <Header />}
      <EditProfile />
      <Footer />
    </header>
  );
};

export default EditprofilePage;
