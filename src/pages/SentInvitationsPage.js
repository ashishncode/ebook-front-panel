import React from "react";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import SentInvitation from "../components/SentInvitations/SentInvitation";

function SentInvitationsPage() {
  return (
    <header className="App-header">
      <Header />
      <SentInvitation />
      <Footer />
    </header>
  );
}

export default SentInvitationsPage;
