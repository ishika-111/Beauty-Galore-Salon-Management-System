import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaTachometerAlt,
  FaPlusCircle,
  FaList,
  FaShoppingCart,
  FaCog,
  FaSignOutAlt,
  FaCalendarCheck,
} from "react-icons/fa";

const SideNavbar = () => {
  return (
    <aside className="bg-[#F9FCEF] text-gray-900 w-64 h-screen shadow-lg flex flex-col z-50 overflow-y-auto">
      {/* Logo */}
      <div className="p-6 flex items-center gap-3 border-b border-gray-300">
        <span className="text-xl font-bold tracking-wide break-words">
          BeautyGaloreAdmin
        </span>
      </div>

      {/* Navigation */}
      <nav className="flex-grow mt-6">
        <ul className="flex flex-col gap-2">
          <NavItem to="/dashboard" icon={FaTachometerAlt} label="Dashboard" />
          <NavItem to="/add/product" icon={FaPlusCircle} label="Add Product" />
          <NavItem to="/product/list" icon={FaList} label="Product List" />
          <NavItem to="/orders" icon={FaShoppingCart} label="Orders" />
          <NavItem to="/settings" icon={FaCog} label="Settings" />
          <NavItem
            to="/appointment"
            icon={FaCalendarCheck}
            label="Appointment"
          />
        </ul>
      </nav>

      {/* Logout Button */}
      <div className="px-6 py-4 border-t border-gray-300">
        <button className="flex items-center gap-3 w-full px-4 py-2 text-sm font-medium text-white bg-lime-800 rounded-lg hover:bg-lime-700 transition-all">
          <FaSignOutAlt className="w-5 h-5" />
          Logout
        </button>
      </div>
    </aside>
  );
};

// Reusable NavItem component
const NavItem = ({ to, icon: Icon, label }) => {
  return (
    <li>
      <NavLink
        to={to}
        className={({ isActive }) =>
          `flex items-center gap-3 px-6 py-3 text-sm font-semibold rounded-lg transition-all ${
            isActive
              ? "bg-green-200 text-green-800"
              : "hover:bg-green-100 hover:text-green-800"
          }`
        }
      >
        <Icon className="w-5 h-5" />
        {label}
      </NavLink>
    </li>
  );
};

export default SideNavbar;
