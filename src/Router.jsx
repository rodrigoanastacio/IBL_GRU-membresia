import { Routes, Route, Navigate } from "react-router-dom";
import { MembershipForm } from "./pages/MembershipForm";
import { Login } from "./pages/Login";
import { useAuth } from "@clerk/clerk-react";
import { DashboardLayout } from "./Layouts/DashboardLayout";
import { GCList } from "./pages/Dashboard/GCList";
import { MembersList } from "./pages/Dashboard/MembersList";
import { Dashboard } from "./pages/Dashboard";
import { NearestGC } from "./pages/NearestGC";

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<MembershipForm />} />
      <Route path="/encontrar-gc" element={<NearestGC />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<ProtectedRoute />}>
        <Route index element={<Dashboard />} />
        <Route path="gcs" element={<GCList />} />
        <Route path="membros" element={<MembersList />} />
      </Route>
    </Routes>
  );
}

const ProtectedRoute = () => {
  const { isSignedIn } = useAuth();

  if (!isSignedIn) {
    return <Navigate to="/login" />;
  }

  return <DashboardLayout />;
};
