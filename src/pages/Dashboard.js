import React from "react";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import DashBoard from "../components/dashboard/Dashboard";

function Dashboard() {
  return (
    <header className="App-header">
      <Header />
      <DashBoard />
      <Footer />
    </header>
  );
}

export default Dashboard;
