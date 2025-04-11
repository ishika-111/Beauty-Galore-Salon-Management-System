// src/components/OrderForm.js

import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Cookies from "js-cookie";

const OrderForm = ({ cartItems, totalAmount }) => {
  const [address, setAddress] = useState(""); // Store user address
  const [paymentMethod, setPaymentMethod] = useState(""); // Store payment method
  const [orderType, setOrderType] = useState("DELIVERY"); // Default order type to DELIVERY

  useEffect(() => {
    // Fetch the current address of the logged-in user
    const fetchAddress = async () => {
      try {
        const token = Cookies.get("token");
        if (!token) throw new Error("Unauthorized: Please log in first.");

        const response = await axios.get(
          `http://localhost:5000/api/customer/address`,
          {
            headers: { Authorization: `Bearer ${token} ` },
            withCredentials: true,
          }
        );

        setAddress(response.data.address);
      } catch (err) {
        toast.error("Failed to fetch address.");
      }
    };

    fetchAddress();
  }, []);

  const handlePlaceOrder = async () => {
    try {
      const token = Cookies.get("token");
      if (!token) throw new Error("Unauthorized: Please log in first.");

      const orderData = {
        address,
        paymentMethod,
        orderType,
      };

      const response = await axios.post(
        `http://localhost:5000/api/orders/place`,
        orderData,
        {
          headers: { Authorization: `Bearer ${token} ` },
          withCredentials: true,
        }
      );

      toast.success("Order placed successfully");
      // You may redirect to an order confirmation page here if you want
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || err.message || "Error placing order.";
      toast.error(errorMessage);
    }
  };

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

  const handleSaveAddress = async () => {
    try {
      const token = Cookies.get("token");
      if (!token) throw new Error("Unauthorized: Please log in first.");

      const response = await axios.put(
        `http://localhost:5000/api/customer/address/update`,
        { address },
        {
          headers: { Authorization: `Bearer ${token} ` },
          withCredentials: true,
        }
      );

      toast.success("Address updated successfully");
    } catch (err) {
      toast.error("Failed to update address");
    }
  };

  return (
    <div className="w-full max-w-2xl bg-white rounded-lg shadow p-6 mt-6">
      <h3 className="text-xl font-semibold mb-4">Order Details</h3>

      <label className="block mb-2">Address</label>
      <input
        type="text"
        value={address}
        onChange={handleAddressChange}
        placeholder="Enter your address"
        className="w-full px-4 py-2 mb-4 border rounded-md"
        required
      />
      <button
        onClick={handleSaveAddress}
        className="bg-lime-800 text-white px-4 py-2 rounded-md mb-4"
      >
        Save Address
      </button>

      <label className="block mb-2">Payment Method</label>
      <select
        value={paymentMethod}
        onChange={(e) => setPaymentMethod(e.target.value)}
        className="w-full px-4 py-2 mb-4 border rounded-md"
        required
      >
        <option value="">Select Payment Method</option>
        <option value="CASH">Cash on Delivery</option>
        <option value="CARD">Credit/Debit Card</option>
      </select>

      <label className="block mb-2">Order Type</label>
      <select
        value={orderType}
        onChange={(e) => setOrderType(e.target.value)}
        className="w-full px-4 py-2 mb-4 border rounded-md"
      >
        <option value="DELIVERY">Delivery</option>
        <option value="PICKUP">Pickup</option>
      </select>

      {orderType === "DELIVERY" && (
        <div className="text-xl font-semibold mb-4">
          Delivery Charge: Rs 150
        </div>
      )}

      <div className="text-xl font-semibold mb-4">
        Total: Rs {totalAmount + (orderType === "DELIVERY" ? 150 : 0)}
      </div>

      <button
        onClick={handlePlaceOrder}
        className="w-full bg-lime-800 text-white py-2 rounded-md"
      >
        Place Order
      </button>
    </div>
  );
};

export default OrderForm;
