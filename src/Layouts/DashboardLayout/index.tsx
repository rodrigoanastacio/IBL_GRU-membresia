import { useState } from "react";
import { Sidebar } from "../../components/Dashboard/Sidebar";

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
      <Sidebar onLinkClick={handleCloseSidebar} />
    </div>
  );
};
