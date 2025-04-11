import React from "react";
import { Outlet } from "react-router-dom";
import SideNavbar from "../src/components/SideNavbar"; // Make sure this path is correct

const DashboardLayout = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <SideNavbar />

      {/* Main content (Dashboard) */}
      <div className="flex-grow p-6">
        <Outlet /> {/* The main content will render here */}
      </div>
    </div>
  );
};
export default DashboardLayout;
