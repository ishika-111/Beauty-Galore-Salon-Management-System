import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { FaHospitalUser, FaShoppingCart, FaUser } from "react-icons/fa";

export default function CustomerNavbar() {
  const location = useLocation(); // Get the current URL path

  // Function to check if the link is active
  const isActive = (path) => location.pathname === path;

  return (
    <nav className="flex justify-between items-center p-10 z-50">
      <div className="flex items-center gap-4">
        <img src={logo} className="h-20 w-auto" alt="BeautyGaloreSalon Logo" />
        <div className="text-4xl text-black font-semibold hover:text-lime-700 transition duration-300 cursor-pointer">
          <Link to="/">BeautyGaloreSalon</Link>
        </div>
      </div>
      <ul className="flex gap-6">
        <li
          className={`font-semibold transition duration-300 cursor-pointer ${
            isActive("/")
              ? "text-lime-700 underline"
              : "hover:underline hover:text-lime-700"
          }`}
        >
          <Link to="/customer">Home</Link>
        </li>
        <li
          className={`font-semibold transition duration-300 cursor-pointer ${
            isActive("/courses")
              ? "text-lime-700 underline"
              : "hover:underline hover:text-lime-700"
          }`}
        >
          <Link to="/customer/courses">Courses</Link>
        </li>
        <li
          className={`font-semibold transition duration-300 cursor-pointer ${
            isActive("/products")
              ? "text-lime-700 underline"
              : "hover:underline hover:text-lime-700"
          }`}
        >
          <Link to="/customer/products">Products</Link>
        </li>
        <li
          className={`font-semibold transition duration-300 cursor-pointer ${
            isActive("/services")
              ? "text-lime-700 underline"
              : "hover:underline hover:text-lime-700"
          }`}
        >
          <Link to="/customer/services">Services</Link>
        </li>
        <li
          className={`font-semibold transition duration-300 cursor-pointer ${
            isActive("/aboutus")
              ? "text-lime-700 underline"
              : "hover:underline hover:text-lime-700"
          }`}
        >
          <Link to="/customer/aboutus">About Us</Link>
        </li>
      </ul>
      <div className="hidden md:flex items-center gap-4">
        <Link to="/customer/book">
          <button
            className={`rounded p-2 font-bold text-white ${
              isActive("/book")
                ? "bg-lime-800"
                : "bg-lime-800 hover:bg-lime-700"
            }`}
          >
            Book Now
          </button>
        </Link>

        <NavLink to="/customer/cart">
          <button className=" p-2 font-bold text-white">
            <FaShoppingCart
              className=" text-lime-800 cursor-pointer transition"
              size={24}
            />
          </button>
        </NavLink>
        <NavLink to="/customer/profile">
          <button className=" p-2 font-bold text-white">
            <FaUser
              className=" text-lime-800 cursor-pointer transition"
              size={24}
            />
          </button>
        </NavLink>
      </div>
    </nav>
  );
}
