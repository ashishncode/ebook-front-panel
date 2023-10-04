import React from "react";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import Collaborations from "../components/Collaboration/Collaborations";

function CollaborationPage() {
  return (
    <header className="App-header">
      <Header />
      <Collaborations />
      <Footer />
    </header>
  );
}

export default CollaborationPage;
