import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import "./App.css";

import ProfileLayout from "./components/ProfileLayout.jsx";
import CreateProfile from "./components/CreateProfile.jsx";
import KycDetails from "./components/KycDetails.jsx";
import GstDetails from "./components/GstDetails.jsx";
import BankDetails from "./components/BankDetails.jsx";
import Agreement from "./components/Agreement.jsx";
import OtpVerification from "./components/OtpVerification.jsx";
import ProfileSummary from "./components/ProfileSummary.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<ProfileLayout />}>

          <Route
            index
            element={<Navigate to="create-profile" />}
          />

          <Route
            path="create-profile"
            element={<CreateProfile />}
          />

          <Route
            path="otp-verification"
            element={<OtpVerification />}
          />

          <Route
            path="kyc-details"
            element={<KycDetails />}
          />

          <Route
            path="gst-details"
            element={<GstDetails />}
          />

          <Route
            path="bank-details"
            element={<BankDetails />}
          />

          <Route
            path="agreement"
            element={<Agreement />}
          />

          <Route
            path="profile-summary"
            element={<ProfileSummary />}
          />

        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;