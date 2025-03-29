import React from "react";
import { Link } from "react-router-dom";
import {
  LayoutDashboard,
  PackagePlus,
  List,
  CalendarCheck,
  ShoppingCart,
  Settings,
} from "lucide-react";

const SideNavbar = () => {
  return (
    <aside className="bg-gray-900 text-white w-64 h-screen fixed top-0 left-0 shadow-lg">
      {/* Sidebar Header */}
      <div className="flex items-center justify-center py-6 border-b border-gray-700">
        <h2 className="text-xl font-bold tracking-wide">Admin Panel</h2>
      </div>

      {/* Sidebar Navigation */}
      <nav className="mt-4">
        <ul className="space-y-1">
          {[
            {
              to: "/dashboard",
              label: "Dashboard",
              icon: <LayoutDashboard size={20} />,
            },
            {
              to: "/add/product",
              label: "Add Product",
              icon: <PackagePlus size={20} />,
            },
            {
              to: "/product/list",
              label: "Product List",
              icon: <List size={20} />,
            },
            {
              to: "/appointment",
              label: "Appointments",
              icon: <CalendarCheck size={20} />,
            },
            {
              to: "/orders",
              label: "Orders",
              icon: <ShoppingCart size={20} />,
            },
            {
              to: "/settings",
              label: "Settings",
              icon: <Settings size={20} />,
            },
          ].map((item, index) => (
            <li key={index}>
              <Link
                to={item.to}
                className="flex items-center gap-4 px-6 py-3 text-lg font-medium transition-all hover:bg-gray-700 hover:text-gray-300"
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default SideNavbar;
