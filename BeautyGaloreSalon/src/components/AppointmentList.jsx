import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import AppointmentCancel from "./AppoinmentCancel";

const AppointmentList = () => {
  const [appointments, setAppointments] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const appointmentsPerPage = 5;

  useEffect(() => {
    const fetchAppointments = async () => {
      const token = Cookies.get("token");

      if (!token) {
        toast.error("Please log in first");
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get(
          "http://localhost:5000/api/appointment/get",
          {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
          }
        );

        setAppointments(res.data.appointments || []);
        setFiltered(res.data.appointments || []);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch appointments");
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  useEffect(() => {
    let filteredData = appointments;

    if (searchTerm) {
      filteredData = filteredData.filter((item) =>
        item.service.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (dateFilter) {
      filteredData = filteredData.filter((item) => item.date === dateFilter);
    }

    setFiltered(filteredData);
    setCurrentPage(1);
  }, [searchTerm, dateFilter, appointments]);

  const totalPages = Math.ceil(filtered.length / appointmentsPerPage);
  const start = (currentPage - 1) * appointmentsPerPage;
  const currentAppointments = filtered.slice(
    start,
    start + appointmentsPerPage
  );

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        📅 Your Appointments
      </h2>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by service..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full sm:w-1/2 px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:outline-none"
        />
        <input
          type="date"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
          className="w-full sm:w-1/3 px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:outline-none"
        />
      </div>

      {loading && (
        <p className="text-blue-500 text-center text-lg animate-pulse">
          Loading appointments...
        </p>
      )}

      {error && <p className="text-red-500 text-center text-lg">{error}</p>}

      {!loading && !error && filtered.length === 0 && (
        <p className="text-center text-gray-600 italic">
          No appointments found.
        </p>
      )}

      {!loading && !error && filtered.length > 0 && (
        <>
          <div className="overflow-x-auto shadow-md rounded-lg border border-gray-200">
            <table className="min-w-full table-auto bg-white">
              <thead className="bg-gray-100 text-gray-700 text-sm uppercase">
                <tr>
                  <th className="px-6 py-4 text-left">Service</th>
                  <th className="px-6 py-4 text-left">Date</th>
                  <th className="px-6 py-4 text-left">Time</th>
                  <th className="px-6 py-4 text-left">Status</th>
                  <th className="px-6 py-4 text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {currentAppointments.map((appointment) => (
                  <tr
                    key={appointment.id}
                    className="border-b hover:bg-gray-50 transition"
                  >
                    <td className="px-6 py-4">{appointment.service}</td>
                    <td className="px-6 py-4">{appointment.date}</td>
                    <td className="px-6 py-4">{appointment.time}</td>
                    <td className="px-6 py-4">{appointment.status}</td>
                    <td className="px-6 py-4">
                      <AppointmentCancel
                        appointmentId={appointment.id}
                        createdAt={appointment.createdAt}
                        status={appointment.status}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex justify-center items-center gap-4 mt-6">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => prev - 1)}
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
            >
              Previous
            </button>
            <span className="text-gray-700 font-medium">
              Page {currentPage} of {totalPages}
            </span>
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((prev) => prev + 1)}
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default AppointmentList;
