import React from "react";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import Createnewbook from "../components/Createnewbook/Createnewbook";
import Maincharacters from "../components/Createnewbook/Maincharacters";
import Setting from "../components/Createnewbook/Setting";
import PlotSummary from "../components/Createnewbook/Plotsummary";
import WritingPreferences from "../components/Createnewbook/WritingPreferences";
import WritingInterface from "../components/Createnewbook/WritingInterface";
import Chapter from "../components/Createnewbook/Chapter";
import HeaderLogin from "../components/common/Header_login";

const CreatenewbookPage = () => {
  const userEmail = localStorage.getItem("userEmail");

  return (
    <header className="App-header">
      {userEmail ? <HeaderLogin /> : <Header />}

      <Createnewbook />
      <Maincharacters />
      <Setting />
      <PlotSummary />
      <WritingPreferences />
      <WritingInterface />
      <Chapter />
      <Footer />
    </header>
  );
};

export default CreatenewbookPage;
