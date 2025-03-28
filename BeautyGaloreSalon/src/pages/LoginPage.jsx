import { useState } from "react";
import toast from "react-hot-toast";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

export default function LoginPage() {
  const Validation = (userInput) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    let errors = {};
    if (!userInput.email) {
      errors.email = "Email is required";
    } else if (!emailRegex.test(userInput.email)) {
      errors.email = "Email is invalid";
    }
    if (!userInput.password) {
      errors.password = "Password is required";
    } else if (userInput.password.length < 6) {
      errors.password = "Password must be more than 6 characters";
    }
    return errors;
  };

  const [userInput, setUserInput] = useState({
    email: "",
    password: "",
    role: "USER", // Default value, can be "STAFF" or "CUSTOMER"
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUserInput({ ...userInput, [e.target.name]: e.target.value });
  };

  const handleBlur = (e) => {
    setErrors({ ...errors, [e.target.name]: "" });
  };

  function handleSubmit(e) {
    e.preventDefault();
    const errors = Validation(userInput);
    setErrors(errors);

    if (Object.keys(errors).length > 0) {
      toast.error("Error in form!");
    } else {
      toast.success("Validation Passed!");
    }

    return errors;
  }

  const login = async (e) => {
    e.preventDefault();
    const errors = handleSubmit(e);
    if (Object.keys(errors).length > 0) return;

    // Check userInput values
    console.log(userInput); // Add a console log to check the payload

    try {
      const endpoint =
        userInput.role === "STAFF"
          ? "http://localhost:3000/api/users/staff/login"
          : "http://localhost:3000/api/users/customer/login";

      const response = await axios.post(endpoint, userInput, {
        withCredentials: true, // Send cookies with the request
      });

      // Success - Show success toast message
      toast.success("Logged in successfully!");

      Cookies.set("token", response.data.token); // Save token in cookies

      // Navigate to different pages based on the role
      if (userInput.role === "STAFF") {
        navigate("/staff/home");
      } else {
        navigate("/profile");
      }
    } catch (error) {
      // Show error toast if login failed
      toast.error(
        error.response?.data?.error || "Login failed! Please try again."
      );
      setErrors({ general: error.response?.data?.error || "Login failed!" });
      console.error(error);
    }
  };

  return (
    <div>
      <div className="flex justify-center items-center min-h-[70vh]">
        <div className="bg-white p-10 rounded-lg shadow-lg w-2/4">
          <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6 hover:text-lime-700 ">
            Welcome Back!
          </h1>

          <form onSubmit={login}>
            {/* Email Field */}
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-gray-700 font-medium mb-2"
              >
                What's your Email Address?
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-lime-500"
                value={userInput.email}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.email && <p className="error">{errors.email}</p>}
            </div>

            {/* Password Field */}
            <div className="mb-6">
              <label
                htmlFor="password"
                className="block text-gray-700 font-medium mb-2"
              >
                What's your Password?
              </label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter your password"
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-lime-500"
                value={userInput.password}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.password && <p className="error">{errors.password}</p>}
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-lime-700 text-white font-bold rounded-lg hover:bg-lime-600 focus:outline-none focus:ring-2 focus:ring-lime-500 transition duration-300 "
            >
              Login
            </button>
          </form>

          {/* Forgot Password Link */}
          <div className="mt-4 text-center">
            <span className="text-sm text-gray-600">
              Forgot your password?{" "}
              <NavLink to="/forget">
                <a
                  href="javascript:void(0);"
                  className="text-lime-600 hover:text-lime-700 font-medium"
                >
                  Reset it
                </a>
              </NavLink>
            </span>
          </div>

          {/* Sign Up Link */}
          <div className="mt-4 text-center">
            <span className="text-sm text-gray-600">
              Don't have an account?{" "}
              <a
                href="/signup"
                className="text-lime-600 hover:text-lime-700 font-medium"
              >
                Sign Up
              </a>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
