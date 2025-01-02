import { Routes, Route, Navigate } from "react-router-dom";
import { MembershipForm } from "./pages/MembershipForm";
import { Dashboard } from "./pages/Dashboard";
import { Login } from "./pages/Login";
import { useAuth } from "@clerk/clerk-react";

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<MembershipForm />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<ProtectedRoute />} />
    </Routes>
  );
}

const ProtectedRoute = () => {
  const { isSignedIn } = useAuth();

  if (!isSignedIn) {
    return <Navigate to="/login" />;
  }

  return <Dashboard />;
};
