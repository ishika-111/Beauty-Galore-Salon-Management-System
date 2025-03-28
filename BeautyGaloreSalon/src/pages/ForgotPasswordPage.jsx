import React, { useState } from "react";
import axios from "axios";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/users/forgot-password",
        { email }
      );
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response?.data?.message || "An error occurred.");
    }
  };

  return (
    <div className="mx-auto h-3/4 p-10 flex justify-center items-center">
      <div class="font-[sans-serif] items-center p-6 w-1/3 mx-auto  bg-[#d9e4d3] rounded-3xl shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] ">
        <form class="w-full" onSubmit={handleForgotPassword}>
          <div class="mb-3 text-center">
            <h3 class="text-[#252525] lg:text-3xl text-2xl font-extrabold max-md:text-center">
              Forget Password
            </h3>
          </div>

          <div>
            <label class="text-gray-800 text-sm font-semibold block mb-2">
              Email
            </label>
            <div class="relative flex items-center">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                class="w-full bg-transparent text-sm text-gray-800 border-2 focus:border-[#BAA898] pl-4 pr-12 py-3.5 outline-none rounded-xl"
                placeholder="Enter your email"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="#bbb"
                stroke="#bbb"
                class="w-[18px] h-[18px] absolute right-4"
                viewBox="0 0 24 24"
              >
                <circle cx="10" cy="7" r="6" data-original="#000000"></circle>
                <path
                  d="M14 15H6a5 5 0 0 0-5 5 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 5 5 0 0 0-5-5zm8-4h-2.59l.3-.29a1 1 0 0 0-1.42-1.42l-2 2a1 1 0 0 0 0 1.42l2 2a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42l-.3-.29H22a1 1 0 0 0 0-2z"
                  data-original="#000000"
                ></path>
              </svg>
            </div>
          </div>
          <div class="mt-6">
            <button
              type="submit"
              class="w-full shadow-xl font-extrabold py-3 px-4 text-base tracking-wide rounded-xl bg-lime-700 hover:bg-lime-500 text-white border focus:outline-none transition-all"
            >
              Send Reset Link
            </button>
          </div>
        </form>
        {message && <p>{message}</p>}
      </div>
    </div>
  );
}
