import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaTachometerAlt,
  FaPlusCircle,
  FaList,
  FaShoppingCart,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";

const SideNavbar = () => {
  return (
    <aside className="bg-gray-900 text-white w-64 h-screen  z-50 shadow-lg overflow-y-auto flex flex-col">
      {/* Logo & Title */}
      <div className="p-6 flex items-center space-x-3 border-b border-gray-700">
        <span className="text-2xl font-bold">🍽 MySalon</span>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-grow mt-6">
        <ul className="space-y-2">
          <li>
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `flex items-center gap-3 px-6 py-3 text-sm hover:bg-gray-800 transition-all ${
                  isActive ? "bg-gray-700" : ""
                }`
              }
            >
              <FaTachometerAlt className="w-5 h-5" /> Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/add/product"
              className={({ isActive }) =>
                `flex items-center gap-3 px-6 py-3 text-sm hover:bg-gray-800 transition-all ${
                  isActive ? "bg-gray-700" : ""
                }`
              }
            >
              <FaPlusCircle className="w-5 h-5" /> Add Product
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/product/list"
              className={({ isActive }) =>
                `flex items-center gap-3 px-6 py-3 text-sm hover:bg-gray-800 transition-all ${
                  isActive ? "bg-gray-700" : ""
                }`
              }
            >
              <FaList className="w-5 h-5" /> Product List
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/orders"
              className={({ isActive }) =>
                `flex items-center gap-3 px-6 py-3 text-sm hover:bg-gray-800 transition-all ${
                  isActive ? "bg-gray-700" : ""
                }`
              }
            >
              <FaShoppingCart className="w-5 h-5" /> Orders
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/settings"
              className={({ isActive }) =>
                `flex items-center gap-3 px-6 py-3 text-sm hover:bg-gray-800 transition-all ${
                  isActive ? "bg-gray-700" : ""
                }`
              }
            >
              <FaCog className="w-5 h-5" /> Settings
            </NavLink>
          </li>
        </ul>
      </nav>

      {/* Logout Button */}
      <div className="px-4 pb-6">
        <button className="flex items-center gap-3 w-full px-6 py-3 text-sm text-left bg-red-600 hover:bg-red-700 transition-all">
          <FaSignOutAlt className="w-5 h-5" /> Logout
        </button>
      </div>
    </aside>
  );
};

export default SideNavbar;
