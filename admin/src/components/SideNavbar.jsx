import React from "react";
import { Link } from "react-router-dom";

const SideNavbar = () => {
  return (
    <aside className="bg-gray-800 text-white w-64 fixed h-full">
      <div className="p-4">
        <h2 className="text-2xl font-bold">Menu</h2>
      </div>
      <nav className="mt-6">
        <ul>
          <li>
            <Link
              to="/dashboard"
              className="block px-4 py-2 text-sm hover:bg-gray-700"
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              to="/add/product"
              className="block px-4 py-2 text-sm hover:bg-gray-700"
            >
              Add Product
            </Link>
          </li>
          <li>
            <Link
              to="/product/list"
              className="block px-4 py-2 text-sm hover:bg-gray-700"
            >
              Product List
            </Link>
          </li>
          <li>
            <Link
              to="/appointment"
              className="block px-4 py-2 text-sm hover:bg-gray-700"
            >
              Appointment Management
            </Link>
          </li>
          <li>
            <Link
              to="/orders"
              className="block px-4 py-2 text-sm hover:bg-gray-700"
            >
              Orders
            </Link>
          </li>
          <li>
            <Link
              to="/settings"
              className="block px-4 py-2 text-sm hover:bg-gray-700"
            >
              Settings
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default SideNavbar;
