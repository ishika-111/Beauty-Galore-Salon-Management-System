import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

const AppointmentCancel = ({ appointmentId }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  const handleCancel = async () => {
    const token = Cookies.get("token");
    console.log("Token:", token); // Log the token to ensure it's correct

    if (!token) {
      return toast.error("Please log in first");
    }
    setLoading(true);
    setError(null);
    setSuccessMessage("");

    try {
      // Replace with your backend endpoint to cancel appointment
      const res = await axios.delete(
        `http://localhost:5000/api/appointment/${appointmentId}/cancel`,
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );
      setSuccessMessage(res.data.message); // Success message from backend
    } catch (err) {
      setError(err.response?.data?.error || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button
        onClick={handleCancel}
        disabled={loading}
        className="bg-red-500 text-white px-4 py-2 rounded"
      >
        {loading ? "Canceling..." : "Cancel Appointment"}
      </button>
      {error && <p className="text-red-500">{error}</p>}
      {successMessage && <p className="text-green-500">{successMessage}</p>}
    </div>
  );
};

export default AppointmentCancel;
