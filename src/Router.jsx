import { Routes, Route, Navigate } from "react-router-dom";
import { MembershipForm } from "./pages/MembershipForm";
import { DashboardLayout } from "./Layouts/DashboardLayout";
import { GCList } from "./pages/Dashboard/GCList";
import { MembersList } from "./pages/Dashboard/MembersList";
import { Dashboard } from "./pages/Dashboard";
import { NearestGC } from "./pages/NearestGC";
import { Consolidation } from "./pages/Dashboard/Consolidation";
import { FormConsolidation } from "./pages/Dashboard/Consolidation/FormConsolidation";
import { Settings } from "./pages/Dashboard/Settings";
import { AuthRoutes } from "./features/auth/routes";
import { useAuth } from "./features/auth/hooks/useAuth";

// Componente para proteger rotas
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div>Carregando...</div>
      </div>
    );
  }

  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export function Router() {
  return (
    <Routes>
      {/* Rotas públicas */}
      <Route path="/" element={<MembershipForm />} />
      <Route path="/encontrar-gc" element={<NearestGC />} />

      {/* Rotas de autenticação */}
      {AuthRoutes()}

      {/* Rotas protegidas do dashboard */}
      <Route element={<DashboardLayout />}>
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/gcs"
          element={
            <ProtectedRoute>
              <GCList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/membros"
          element={
            <ProtectedRoute>
              <MembersList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/consolidacao"
          element={
            <ProtectedRoute>
              <Consolidation />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/consolidacao/formulario-sala"
          element={
            <ProtectedRoute>
              <FormConsolidation />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/settings"
          element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          }
        />
      </Route>
    </Routes>
  );
}
