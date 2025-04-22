import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import Payment from "../payment/Payment";

const OrderForm = ({ cartItems }) => {
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("CARD");
  const [orderType, setOrderType] = useState("DELIVERY");
  const [triggerEsewa, setTriggerEsewa] = useState(false);
  const [paymentData, setPaymentData] = useState(null);

  const handlePlaceOrder = async () => {
    try {
      const token = Cookies.get("token");
      if (!token) throw new Error("Unauthorized: Please log in first.");

      if (paymentMethod === "Esewa") {
        // Initiate eSewa payment
        const response = await axios.post(
          "http://localhost:5000/api/payment/initiate",
          {
            address,
            orderType,
            cartItems,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
          }
        );

        console.log("Payment Response:", response.data); // Debugging log for payment data

        setPaymentData(response.data); // Set the payment data
        setTriggerEsewa(true); // Trigger eSewa payment form rendering
      } else {
        // Handle other payment methods (COD, Card, etc.)
        const orderResponse = await axios.post(
          "http://localhost:5000/api/orders/place",
          {
            address,
            paymentMethod,
            orderType,
            cartItems,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
          }
        );

        toast.success("Order placed successfully!");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to place order.");
    }
  };

  return (
    <div className="bg-white shadow-xl rounded-xl p-8 max-w-md mx-auto mt-10 border border-gray-200">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        🛒 Place Your Order
      </h2>

      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-1">Address:</label>
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Enter delivery address"
          className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-500"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-1">
          Order Type:
        </label>
        <select
          value={orderType}
          onChange={(e) => setOrderType(e.target.value)}
          className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-500"
        >
          <option value="DELIVERY">Delivery</option>
          <option value="PICKUP">Pickup</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-1">
          Payment Method:
        </label>
        <select
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
          className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-500"
        >
          <option value="CARD">Cash on Delivery</option>
          <option value="Esewa">eSewa</option>
        </select>
      </div>

      <button
        onClick={handlePlaceOrder}
        className="bg-lime-800 text-white text-lg font-semibold px-6 py-3 rounded-lg w-full hover:bg-lime-700 transition duration-300"
      >
        Place Order
      </button>

      {/* eSewa Payment Form */}
      {triggerEsewa && paymentData && (
        <div className="mt-8">
          <Payment paymentData={paymentData} />
        </div>
      )}
    </div>
  );
};

export default OrderForm;
