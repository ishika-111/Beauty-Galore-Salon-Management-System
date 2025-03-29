import React from "react";
import SideNavbar from "../src/components/SideNavbar";
import Navbar from "../src/components/Navbar";

const DashboardLayout = ({ children }) => {
  return (
    <div className="">
      {/* Side Navbar */}
      <SideNavbar />

      {/* Main Content */}
      <div className="flex-1">
        {/* Navbar */}
        <Navbar />

        {/* Page Content */}
        <main className=" flex flex-col justify-center items-center p-4 ">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
