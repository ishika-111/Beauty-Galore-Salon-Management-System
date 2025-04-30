import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

export default function EmailVerifyPage() {
  const { token } = useParams(); // Capture token from the URL
  const [verificationStatus, setVerificationStatus] = useState(null); // For status messages
  const [balloonPop, setBalloonPop] = useState(false); // State to control balloon popping effect
  const navigate = useNavigate(); // Use useNavigate instead of useHistory

  useEffect(() => {
    // Function to handle email verification
    const verifyEmail = async () => {
      try {
        // Send GET request to the backend with the token
        const response = await axios.put(
          `http://localhost:3000/api/users/verify-email/${token}`
        );
        console.log("Token being sent:", token);
        if (response.status === 200) {
          // Success message
          setVerificationStatus("Your email has been verified successfully!");
          setBalloonPop(true); // Trigger balloon pop effect
          setTimeout(() => {
            navigate("/login"); // Redirect to login page after successful verification
          }, 3000); // Delay before redirecting
        }
      } catch (error) {
        // Handle errors
        const message =
          error.response?.data?.message || "Unable to connect to the server.";
        setVerificationStatus(message);
      }
    };

    // Call the verification function
    verifyEmail();
  }, [token, navigate]); // Runs whenever the token or navigate changes

  return (
    <div className="flex items-center justify-center h-screen bg-gray-50">
      <div className="bg-white p-12 rounded-xl shadow-xl w-full sm:w-1/2 relative">
        <div className="text-center">
          {verificationStatus && (
            <div
              className={`${
                verificationStatus ===
                "Your email has been verified successfully!"
                  ? "bg-green-100 text-green-600"
                  : "bg-red-100 text-red-600"
              } p-6 rounded-xl text-center font-semibold text-lg transition-all transform duration-500 ${
                verificationStatus ===
                "Your email has been verified successfully!"
                  ? "animate-bounce"
                  : ""
              }`}
            >
              {verificationStatus}
            </div>
          )}
        </div>

        {/* Balloon Animation on Success */}
        {balloonPop && (
          <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="w-24 h-24 bg-red-400 rounded-full animate-pop"></div>
          </div>
        )}
      </div>
    </div>
  );
}
