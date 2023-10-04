import React from "react";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import EditProfile from "../components/Editprofile/Editprofile";

function EditprofilePage() {
  return (
    <header className="App-header">
      <Header />
      <EditProfile />
      <Footer />
    </header>
  );
}

export default EditprofilePage;
