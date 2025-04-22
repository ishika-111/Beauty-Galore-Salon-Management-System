import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { useState } from "react";

export default function CustomerNavbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const handleLogout = () => {
    localStorage.clear(); // Or use your logout logic (Cookies.remove, etc.)
    navigate("/");
  };

  return (
    <nav className="flex justify-between items-center p-10 z-50 relative">
      <div className="flex items-center gap-4">
        <img src={logo} className="h-20 w-auto" alt="BeautyGaloreSalon Logo" />
        <div className="text-4xl text-black font-semibold hover:text-lime-700 transition duration-300 cursor-pointer">
          <Link to="/">BeautyGaloreSalon</Link>
        </div>
      </div>

      <ul className="flex gap-6">
        {["Home", "Courses", "Products", "Services", "About Us"].map(
          (item, index) => {
            const to = `/customer/${
              item === "Home" ? "" : item.toLowerCase().replace(" ", "")
            }`;
            return (
              <li key={index}>
                <NavLink
                  to={to}
                  end={item === "Home"}
                  className={({ isActive }) =>
                    `font-semibold transition duration-300 cursor-pointer ${
                      isActive
                        ? "text-lime-700 underline"
                        : "hover:underline hover:text-lime-700"
                    }`
                  }
                >
                  {item}
                </NavLink>
              </li>
            );
          }
        )}
      </ul>

      <div className="hidden md:flex items-center gap-4 relative">
        <Link to="/customer/book">
          <button
            className={`rounded p-2 font-bold text-white ${
              location.pathname === "/customer/book"
                ? "bg-lime-800"
                : "bg-lime-800 hover:bg-lime-700"
            }`}
          >
            Book Now
          </button>
        </Link>

        <NavLink to="/customer/cart">
          <button className="p-2 font-bold text-white">
            <FaShoppingCart
              className="text-lime-800 cursor-pointer transition"
              size={24}
            />
          </button>
        </NavLink>

        {/* Profile Dropdown */}
        <div
          className="relative group"
          onMouseEnter={() => setIsProfileOpen(true)}
          onMouseLeave={() => setIsProfileOpen(false)}
        >
          <button className="p-2 font-bold text-white">
            <FaUser
              className="text-lime-800 cursor-pointer transition"
              size={24}
            />
          </button>
          {isProfileOpen && (
            <ul className="absolute right-0 mt-2 w-56 bg-white border border-lime-100 rounded-xl shadow-lg z-50 transition duration-300 ease-in-out">
              <li>
                <Link
                  to="/customer/profile"
                  className="block px-5 py-3 text-gray-800 hover:bg-lime-100 hover:text-lime-800 rounded-t-xl font-medium transition duration-200"
                >
                  🧍 My Profile
                </Link>
              </li>
              <li>
                <Link
                  to="/customer/book/get"
                  className="block px-5 py-3 text-gray-800 hover:bg-lime-100 hover:text-lime-800 font-medium transition duration-200"
                >
                  📅 My Appointments
                </Link>
              </li>
              <li>
                <Link
                  to="/customer/orders/mine"
                  className="block px-5 py-3 text-gray-800 hover:bg-lime-100 hover:text-lime-800 font-medium transition duration-200"
                >
                  📅 My Orders
                </Link>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-5 py-3 text-gray-800 hover:bg-red-100 hover:text-red-600 rounded-b-xl font-medium transition duration-200"
                >
                  🚪 Logout
                </button>
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
}
