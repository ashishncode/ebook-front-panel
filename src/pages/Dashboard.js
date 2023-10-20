import React from "react";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import DashBoard from "../components/dashboard/Dashboard";
import HeaderLogin from "../components/common/Header_login";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const author = localStorage.getItem("authortype");
  const userEmail = localStorage.getItem("userEmail");
  const navigate = useNavigate();

  return (
    <header className="App-header">
      {author || userEmail ? <HeaderLogin /> : <Header />}
      <DashBoard />

      <Footer />
    </header>
  );
};

export default Dashboard;
