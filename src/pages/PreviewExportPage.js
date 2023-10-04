import React from "react";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import PreviewExport from "../components/Previewexport/Previewexport";

function PreviewExportPage() {
  return (
    <header className="App-header">
      <Header />
      <PreviewExport />
      <Footer />
    </header>
  );
}

export default PreviewExportPage;
