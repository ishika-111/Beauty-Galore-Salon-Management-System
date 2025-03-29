import React from "react";
import { Outlet } from "react-router-dom"; // Import the Outlet component
import SideNavbar from "../src/components/SideNavbar"; // Make sure this path is correct

const DashboardLayout = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Side Navbar */}
      <aside className="w-64 bg-gray-800 text-white p-4 flex flex-col shadow-md h-screen">
        <SideNavbar />
      </aside>

      {/* Page Content */}
      <div className="flex-1 flex flex-col items-center justify-center">
        {/* Main Content */}
        <main className="flex-1 p-6 w-full flex items-center justify-center">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
