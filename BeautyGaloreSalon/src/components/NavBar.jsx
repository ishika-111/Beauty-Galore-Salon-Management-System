import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

export default function NavBar() {
  const navigate = useNavigate();
  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleSignUpClick = () => {
    navigate("/signup");
  };
  return (
    <nav className="flex justify-between items-center p-10 z-50">
      <div className="flex items-center gap-4">
        <img src={logo} className="h-20 w-auto"></img>
        <div className="text-4xl text-black font-semibold hover:text-lime-700 transition duration-300 cursor-pointer ">
          <Link to="/">BeautyGaloreSalon</Link>
        </div>
      </div>
      <ul className="flex gap-6 ">
        <li className="hover:underline hover:text-lime-700  transition duration-300 cursor-pointer font-semibold">
          <Link to="/">Home</Link>
        </li>
        <li className="hover:underline hover:text-lime-700 transition duration-300 cursor-pointer font-semibold">
          <Link to="/courses">Courses</Link>
        </li>
        <li className=" hover:underline hover:text-lime-700 transition duration-300 cursor-pointer font-semibold">
          <Link to="/products">Products</Link>
        </li>
        <li className="hover:underline hover:text-lime-700 transition duration-300 cursor-pointer font-semibold">
          <Link to="/services">Services</Link>
        </li>
        <li className="hover:underline hover:text-lime-700 transition duration-300 cursor-pointer font-semibold">
          <Link to="/aboutus">About Us</Link>
        </li>
      </ul>
      <div className="hidden md:flex items-center gap-4">
        <Link to="/book">
          <button className="bg-lime-700 rounded p-2 font-bold text-white">
            Book Now{" "}
          </button>
        </Link>

        <button
          className="bg-lime-700 rounded p-2 font-bold text-white"
          onClick={handleLoginClick}
        >
          Login
        </button>
        <button
          className="bg-lime-700 rounded p-2 font-bold text-white"
          onClick={handleSignUpClick}
        >
          SignUp
        </button>
      </div>
    </nav>
  );
}
{
  /* <div className="text-4xl text-black font-semibold hover:text-lime-700 transition duration-300 cursor-pointer"> */
}
