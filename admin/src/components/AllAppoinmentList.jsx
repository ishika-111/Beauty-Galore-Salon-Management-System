import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const AllAppointmentList = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      const token = localStorage.getItem("token");
      console.log("Token:", token);

      if (!token) {
        return toast.error("Please log in first");
      }

      try {
        const res = await axios.get(
          "http://localhost:5000/api/admin/appointment",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (res.data.error) {
          setError(res.data.error);
        } else {
          setAppointments(res.data.appointments);
        }

        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch appointments");
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  // Function to confirm the appointment
  const confirmAppointment = async (appointmentId) => {
    const token = localStorage.getItem("token");

    if (!token) {
      return toast.error("Please log in first");
    }

    try {
      const res = await axios.put(
        `http://localhost:5000/api/admin/appointment/${appointmentId}/confirm`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(res.data.message);
      // Refresh the appointments list after confirming
      setAppointments((prevAppointments) =>
        prevAppointments.map((appointment) =>
          appointment.id === appointmentId
            ? { ...appointment, status: "Confirmed" }
            : appointment
        )
      );
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.error || "Failed to confirm appointment");
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6 text-center text-lime-700">
        All Appointments
      </h2>

      {loading && (
        <p className="text-center text-blue-500 font-medium">
          Loading appointments...
        </p>
      )}
      {error && <p className="text-center text-red-500">{error}</p>}

      {!loading && !error && appointments.length === 0 && (
        <p className="text-center text-gray-600">No appointments found.</p>
      )}

      {!loading && !error && appointments.length > 0 && (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg shadow border border-gray-200">
            <thead className="bg-lime-100 text-lime-800">
              <tr>
                <th className="py-3 px-4 text-left text-sm font-semibold">
                  Service
                </th>
                <th className="py-3 px-4 text-left text-sm font-semibold">
                  Date
                </th>
                <th className="py-3 px-4 text-left text-sm font-semibold">
                  Time
                </th>
                <th className="py-3 px-4 text-left text-sm font-semibold">
                  Status
                </th>
                <th className="py-3 px-4 text-left text-sm font-semibold">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((appointment, index) => (
                <tr
                  key={appointment.id}
                  className={`${
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  } hover:bg-lime-50 transition`}
                >
                  <td className="py-3 px-4 text-sm">{appointment.service}</td>
                  <td className="py-3 px-4 text-sm">{appointment.date}</td>
                  <td className="py-3 px-4 text-sm">{appointment.time}</td>
                  <td className="py-3 px-4 text-sm">{appointment.status}</td>
                  <td className="py-3 px-4 text-sm">
                    {appointment.status === "Pending" && (
                      <button
                        onClick={() => confirmAppointment(appointment.id)}
                        className="px-4 py-2 text-white bg-lime-500 rounded-lg hover:bg-lime-600"
                      >
                        Confirm
                      </button>
                    )}
                    {appointment.status === "Confirmed" && (
                      <span className="text-green-500">Confirmed</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AllAppointmentList;
