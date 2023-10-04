import React from "react";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import LogIn from "../components/login/Login";

function Login() {
  return (
    <header className="App-header">
      <Header />
      <LogIn />
      <Footer />
    </header>
  );
}

export default Login;
