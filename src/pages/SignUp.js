import React from "react";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import Signup from "../components/signup/Signup";

const SignUp = () => {
  return (
    <header className="App-header">
      <Header />
      <Signup />
      <Footer />
    </header>
  );
};

export default SignUp;
