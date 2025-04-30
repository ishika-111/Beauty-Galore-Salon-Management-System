import React, { useEffect, useState } from "react";
import axios from "axios";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchMyOrders();
  }, []);

  const fetchMyOrders = async () => {
    try {
      const response = await axios.get("/api/orders/my-orders", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setOrders(response.data.orders);
      setLoading(false);
    } catch (err) {
      setError("Failed to load your orders");
      setLoading(false);
    }
  };

  const cancelOrderHandler = async (orderId) => {
    try {
      await axios.put(`/api/orders/cancel/${orderId}`, null, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      // Update UI after cancellation
      setOrders((prev) =>
        prev.map((order) =>
          order.id === orderId ? { ...order, status: "CANCELED" } : order
        )
      );
    } catch (err) {
      alert(
        err.response?.data?.message || "Failed to cancel the order. Try again."
      );
    }
  };

  if (loading) return <p className="text-gray-500">Loading your orders...</p>;
  if (error) return <p className="text-red-600 font-medium">{error}</p>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">My Orders</h2>
      {orders.length === 0 ? (
        <p className="text-gray-600">You haven’t placed any orders yet.</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order.id}
              className="border border-gray-200 p-6 rounded-xl shadow-sm hover:shadow-md transition duration-300 bg-white"
            >
              <div className="flex justify-between items-center mb-4">
                <div>
                  <p className="text-lg font-semibold text-gray-700">
                    Order ID: #{order.id}
                  </p>
                  <p className="text-sm text-gray-500">
                    {new Date(order.createdAt).toLocaleString()}
                  </p>
                </div>
                <span
                  className={`px-3 py-1 text-sm rounded-full font-medium ${
                    order.status === "PENDING"
                      ? "bg-yellow-100 text-yellow-700"
                      : order.status === "DELIVERED"
                      ? "bg-green-100 text-green-700"
                      : order.status === "CANCELED"
                      ? "bg-red-100 text-red-700"
                      : "bg-blue-100 text-blue-700"
                  }`}
                >
                  {order.status}
                </span>
              </div>

              <p className="mb-2 text-gray-700">
                <strong>Total Amount:</strong> Rs. {order.totalAmount}
              </p>

              <div>
                <p className="font-medium text-gray-700 mb-1">Items:</p>
                <ul className="list-disc pl-5 text-gray-600 space-y-1">
                  {order.items.map((item) => (
                    <li key={item.id}>
                      {item.product.name} × {item.quantity} (Rs. {item.price})
                    </li>
                  ))}
                </ul>
              </div>

              {/* ✅ Show Cancel button only if conditions are met */}
              {order.status === "PENDING" &&
                order.orderType === "PICKUP" &&
                order.paymentMethod === "CARD" && (
                  <button
                    onClick={() => cancelOrderHandler(order.id)}
                    className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                  >
                    Cancel Order
                  </button>
                )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyOrders;
