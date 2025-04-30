import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

export default function NavBar() {
  const navigate = useNavigate();
  const location = useLocation(); // Get the current URL path

  const handleLoginClick = () => navigate("/login");
  const handleSignUpClick = () => navigate("/signup");

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
          <Link to="/">Home</Link>
        </li>
        <li
          className={`font-semibold transition duration-300 cursor-pointer ${
            isActive("/courses")
              ? "text-lime-700 underline"
              : "hover:underline hover:text-lime-700"
          }`}
        >
          <Link to="/courses">Courses</Link>
        </li>
        <li
          className={`font-semibold transition duration-300 cursor-pointer ${
            isActive("/products")
              ? "text-lime-700 underline"
              : "hover:underline hover:text-lime-700"
          }`}
        >
          <Link to="/products">Products</Link>
        </li>
        <li
          className={`font-semibold transition duration-300 cursor-pointer ${
            isActive("/services")
              ? "text-lime-700 underline"
              : "hover:underline hover:text-lime-700"
          }`}
        >
          <Link to="/services">Services</Link>
        </li>
        <li
          className={`font-semibold transition duration-300 cursor-pointer ${
            isActive("/aboutus")
              ? "text-lime-700 underline"
              : "hover:underline hover:text-lime-700"
          }`}
        >
          <Link to="/aboutus">About Us</Link>
        </li>
      </ul>
      <div className="hidden md:flex items-center gap-4">
        <Link to="/book">
          <button
            className={`rounded p-2 font-bold text-white ${
              isActive("/book")
                ? "bg-green-800"
                : "bg-lime-700 hover:bg-green-800"
            }`}
          >
            Book Now
          </button>
        </Link>
        <button
          className={`rounded p-2 font-bold text-white ${
            isActive("/login") ? "bg-lime-500" : "bg-lime-700"
          }`}
          onClick={handleLoginClick}
        >
          Login
        </button>
        <button
          className={`rounded p-2 font-bold text-white ${
            isActive("/signup") ? "bg-lime-600" : "bg-lime-700"
          }`}
          onClick={handleSignUpClick}
        >
          SignUp
        </button>
      </div>
    </nav>
  );
}
