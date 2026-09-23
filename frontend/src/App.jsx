import { Routes, Route, Navigate } from "react-router-dom";
import AuthApp from "./auth/AuthApp";
import OnboardingApp from "./onboarding/OnboardingApp";
import DashboardApp from "./dashboard/DashboardApp";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login/*" element={<AuthApp />} />
      <Route path="/vendor-onboarding/*" element={<OnboardingApp />} />
      <Route path="/dashboard/*" element={<DashboardApp />} />
    </Routes>
  );
}