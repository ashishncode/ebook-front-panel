import React from "react";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import PreviewExport from "../components/Previewexport/Previewexport";
import HeaderLogin from "../components/common/Header_login";
const PreviewExportPage = () => {
  const author = localStorage.getItem("authortype");
  const userEmail = localStorage.getItem("userEmail");
  return (
    <header className="App-header">
      {author || userEmail ? <HeaderLogin /> : <Header />}

      <PreviewExport />
      <Footer />
    </header>
  );
};

export default PreviewExportPage;
