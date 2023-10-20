import React from "react";
import "./App.css";
import HomePage from "./pages/HomePage";
import Services from "./pages/services";
import ContactUs from "./pages/ContactUs";
import LogIn from "./pages/Login";
import SignUp from "./pages/SignUp";
import Forgotpassword from "./pages/ForgotPassword";
import ChangePassword from "./pages/ChangePassword";
import Dashboard from "./pages/Dashboard";
import MyBooks from "./pages/Mybooks";
import CreatenewbookPage from "./pages/CreatenewbookPage";
import CollaborationPage from "./pages/CollaborationPage";
import SubscriptionPlan from "./pages/SubscriptionPlanPage";
import CurrentSubscription from "./pages/CurrentSubscriptionPage";
import BillingHistoryPage from "./pages/BillingHistoryPage";
import SentInvitationsPage from "./pages/SentInvitationsPage";
import PreviewExportPage from "./pages/PreviewExportPage";
import EditprofilePage from "./pages/EditprofilePage";
import AuthorLoginPage from "./pages/AuthorLoginPage";
import AllRoutes from "./routes/allRoutes";

const App = () => {
  return (
    <>
      <AllRoutes />
    </>
  );
};

export default App;
