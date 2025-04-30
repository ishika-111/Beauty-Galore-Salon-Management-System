import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import Cookies from "js-cookie";

export default function BookNow() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("");
  const [service, setService] = useState("");
  const [availableTimeSlots, setAvailableTimeSlots] = useState([]);

  useEffect(() => {
    setAvailableTimeSlots([
      "10:00",
      "11:00",
      "12:00",
      "13:00",
      "14:00",
      "15:00",
      "16:00",
      "17:00",
      "18:00",
    ]);
  }, []);

  // Handle appointment form submission
  const handleAppointmentSubmit = async (e) => {
    e.preventDefault();

    const token = Cookies.get("token");

    if (!token) {
      return toast.error("Please log in first");
    }
    console.log("Token:", token); // Debugging the token

    try {
      const response = await axios.post(
        "http://localhost:3000/api/appointment/create",
        {
          name,
          email,
          phone,
          date,
          timeSlot,
          service,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Appointment booked successfully!");
    } catch (error) {
      toast.error(error.response?.data?.error || "Failed to book appointment");
    }
  };

  return (
    <div className="min-h-screen bg-[#d9e4d3]">
      <div className="max-w-2xl mx-auto p-8">
        <h2 className="text-3xl font-bold text-center mb-6 text-green-900">
          Book Now
        </h2>
        <form onSubmit={handleAppointmentSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              What's your name?
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border-2 border-black px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              What's your Email?
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border-2 border-black px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              What's your Phone Number?
            </label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full border-2 border-black px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Time slot
            </label>
            <select
              value={timeSlot}
              onChange={(e) => setTimeSlot(e.target.value)}
              className="w-full border-2 border-black px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            >
              <option value="">Select a time slot</option>
              {availableTimeSlots.map((slot) => (
                <option key={slot} value={slot}>
                  {slot}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Appointment for
            </label>
            <select
              value={service}
              onChange={(e) => setService(e.target.value)}
              className="w-full border-2 border-black px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            >
              <option value="" disabled>
                Select a Service
              </option>
              {/* New services added */}
              <option value="Hair Services (Ladies)">
                Hair Services (Ladies)
              </option>
              <option value="Hair Services (Gents)">
                Hair Services (Gents)
              </option>
              <option value="Facial & Skincare">Facial & Skincare</option>
              <option value="Manicure & Pedicure">Manicure & Pedicure</option>
              <option value="Hair Coloring">Hair Coloring</option>
              <option value="Bridal Makeup & Styling">
                Bridal Makeup & Styling
              </option>
              <option value="Lash Extension">Lash Extension</option>
              <option value="Nail Shaping">Nail Shaping</option>
              <option value="Nail Art">Nail Art</option>
              <option value="Party Makeup">Party Makeup</option>
              <option value="Normal Makeup">Normal Makeup</option>
              <option value="Waxing">Waxing</option>
              <option value="Threading">Threading</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Appointment Date
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full border-2 border-black px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          <p className="text-gray-600 text-sm mb-6">
            Once you make a booking, you will receive an email message from our
            website.
          </p>

          <button
            type="submit"
            className="w-full bg-lime-700 text-white font-medium py-2 rounded-md hover:bg-lime-600"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
