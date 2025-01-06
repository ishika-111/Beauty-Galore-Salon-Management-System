import { useState } from "react";

export default function LoginPage() {
  const [userInput, setUserInput] = useState({
    email: "",
    password: "",
  });

  const handleLogin = (e) => {
    e.preventDefault();
    console.log(userInput);
  };

  return (
    <div>
      <div className="flex justify-center items-center min-h-[70vh]">
        <div className="bg-white p-10 rounded-lg shadow-lg w-2/4">
          <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6 hover:text-lime-700 ">
            Welcome Back!
          </h1>

          <form onSubmit={handleLogin}>
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
                onChange={(e) =>
                  setUserInput({ ...userInput, email: e.target.value })
                }
              />
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
                onChange={(e) =>
                  setUserInput({ ...userInput, password: e.target.value })
                }
              />
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full py-3 bg-lime-600 text-white font-bold rounded-lg hover:bg-lime-700 focus:outline-none focus:ring-2 focus:ring-lime-500 transition duration-300 "
            >
              Login
            </button>
          </form>

          {/* Forgot Password Link */}
          <div className="mt-4 text-center">
            <span className="text-sm text-gray-600">
              Forgot your password?{" "}
              <a
                href="/reset-password"
                className="text-lime-600 hover:text-lime-700 font-medium"
              >
                Reset it
              </a>
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
