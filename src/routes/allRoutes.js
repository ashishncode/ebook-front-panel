import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import Services from "../pages/services";
import ContactUs from "../pages/ContactUs";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import ForgotPassword from "../pages/ForgotPassword";
import ChangePassword from "../pages/ChangePassword";
import Dashboard from "../pages/Dashboard";
import Mybooks from "../pages/Mybooks";
import CreatenewbookPage from "../pages/CreatenewbookPage";
import Createnewbook from "../components/Createnewbook/Createnewbook";
import CollaborationPage from "../pages/CollaborationPage";
import SubscriptionPlanPage from "../pages/SubscriptionPlanPage";
import CurrentSubscriptionPage from "../pages/CurrentSubscriptionPage";
import BillingHistoryPage from "../pages/BillingHistoryPage";
import SentInvitationsPage from "../pages/SentInvitationsPage";
import PreviewExportPage from "../pages/PreviewExportPage";
import EditprofilePage from "../pages/EditprofilePage";
import AuthorLoginPage from "../pages/AuthorLoginPage";
import ResetPassword from "../components/ForgotPassword/resetPassword";
import CreatenewbookUpdate from "../components/CreateNewUpdationForm.js/CreateNewBookUpdate";
import Maincharacters from "../components/Createnewbook/Maincharacters";
import Setting from "../components/Createnewbook/Setting";
import Plotsummary from "../components/Createnewbook/Plotsummary";
import WritingPreferences from "../components/Createnewbook/WritingPreferences";
import WritingInterface from "../components/Createnewbook/WritingInterface";
import Chapter from "../components/Createnewbook/Chapter";




const AllRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contactUs" element={<ContactUs />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        {/* <Route path="/resetpassword/:email/:token/:timestampFromURL" element={<ResetPassword />} /> */}
        <Route path="/resetpassword/:token" element={<ResetPassword />} />
        <Route path="/changePassword/" element={<ChangePassword />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/mybooks" element={<Mybooks />} />

        {/* create new book */}
        <Route path="/createnewbookpage" element={<Createnewbook />} />
        <Route path="/maincharacters" element={<Maincharacters />} />
        <Route path="/setting" element={<Setting />} />
        <Route path="/plotsummary" element={<Plotsummary />} />
        <Route path="/writingpreferences" element={<WritingPreferences />} />
        <Route path="/witinginterface" element={<WritingInterface />} />
        <Route path="/Chapter" element={<Chapter />} />

        {/* update book */}
        <Route path="/createnewbookpage/:id" element={<Createnewbook />} />
        <Route path="/maincharacters/:id" element={<Maincharacters />} />
        <Route path="/setting/:id" element={<Setting />} />
        <Route path="/plotsummary/:id" element={<Plotsummary />} />
        <Route path="/writingpreferences/:id" element={<WritingPreferences />} />
        <Route path="/witinginterface/:id" element={<WritingInterface />} />
        <Route path="/createnewbookupdate/:_id" element={<CreatenewbookUpdate />} />
        <Route path="/chapter/:_id" element={<Chapter />} />



        <Route path="/collaborationpage" element={<CollaborationPage />} />
        <Route path="/subscriptionplan" element={<SubscriptionPlanPage />} />
        <Route
          path="/currentsubscription"
          element={<CurrentSubscriptionPage />}
        />
        <Route path="/billinghistorypage" element={<BillingHistoryPage />} />
        <Route path="/sentinvitationspage" element={<SentInvitationsPage />} />
        <Route path="/previewexportpage" element={<PreviewExportPage />} />
        <Route path="/editprofilepage" element={<EditprofilePage />} />
        <Route path="/authorloginpage" element={<AuthorLoginPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AllRoutes;
