import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "../../components/Dashboard/Sidebar";
import { Header } from "../../components/Dashboard/Header";
import "./styles.scss";

export const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleToggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleCloseSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className="l-dashboard">
      <Sidebar isMobile={isSidebarOpen} onLinkClick={handleCloseSidebar} />

      <div className="l-dashboard__content">
        <Header onToggleSidebar={handleToggleSidebar} />
        <main className="l-dashboard__main">
          <Outlet />
        </main>
      </div>

      {isSidebarOpen && (
        <div
          className="l-dashboard__overlay"
          onClick={handleCloseSidebar}
          aria-hidden="true"
        />
      )}
    </div>
  );
};
