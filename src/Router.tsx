import { Routes, Route } from "react-router-dom";
import { MembershipForm } from "./pages/MembershipForm";
import { Dashboard } from "./pages/Dashboard";

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<MembershipForm />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}
