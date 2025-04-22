import React, { useEffect, useState } from "react";
import axios from "axios";
import StatCard from "../components/StatCard";
import RecentOrder from "../components/RecentOrder";
import OrderChart from "../components/OrderChart";

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalOrders: 0,
    totalProducts: 0,
    totalAppointments: 0,
    orderGraph: [],
  });
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    const fetchDashboardData = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/admin/dashboard/stat",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setStats(res.data); // Assuming response format is correct
        setRecentOrders(res.data.recentOrders);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching dashboard:", error);
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) return <p className="text-center p-4">Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Users"
          value={stats.totalUsers}
          color="bg-blue-500"
        />
        <StatCard
          title="Total Orders"
          value={stats.totalOrders}
          color="bg-green-500"
        />
        <StatCard
          title="Total Products"
          value={stats.totalProducts}
          color="bg-purple-500"
        />
        <StatCard
          title="Total Appointments"
          value={stats.totalAppointments}
          color="bg-pink-500"
        />
      </div>

      <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentOrder orders={recentOrders} />
        <OrderChart data={stats.orderGraph} />
      </div>
    </div>
  );
};

export default Dashboard;
