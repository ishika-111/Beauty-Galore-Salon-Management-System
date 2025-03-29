import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md fixed w-full h-20 top-0 z-10 flex items-center px-6">
      <div className="flex items-center gap-3">
        {/* Logo */}
        <img src={logo} className="h-14 w-auto" alt="Logo" />
        <Link
          to="/dashboard"
          className="text-xl font-semibold text-black hover:text-lime-700 transition duration-300"
        >
          Beauty Galore Salon
        </Link>
      </div>

      {/* Admin Section (Right Aligned) */}
      <div className="ml-auto">
        <button className="flex items-center focus:outline-none text-gray-700">
          <span>Admin</span>
          <svg
            className="w-4 h-4 ml-2 text-gray-700"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
