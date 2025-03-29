import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    setLoading(true);
    try {
      const token = Cookies.get("token");
      if (!token) throw new Error("Unauthorized: Please log in first.");

      const response = await axios.get("http://localhost:5000/api/cart", {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });

      setCartItems(response.data);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to fetch cart");
      toast.error(err.response?.data?.error || err.message);
      if (err.response?.status === 401) {
        Cookies.remove("token");
        navigate("/login");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveFromCart = async (cartItemId) => {
    try {
      const token = Cookies.get("token");
      if (!token) throw new Error("Unauthorized: Please log in first.");

      await axios.delete(
        `http://localhost:5000/api/cart/remove/${cartItemId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );

      toast.success("Item removed from cart!");
      fetchCart();
    } catch (err) {
      toast.error(err.response?.data?.error || "Error removing item.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 py-10">
      <h2 className="text-4xl font-bold mb-6 text-gray-800">Shopping Cart</h2>
      {loading ? (
        <p className="text-lg text-gray-600">Loading cart...</p>
      ) : error ? (
        <p className="text-red-500 text-lg">{error}</p>
      ) : cartItems.length === 0 ? (
        <div className="text-center">
          <p className="text-lg text-gray-600">Your cart is empty.</p>
          <button
            onClick={() => navigate("/shop")}
            className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition duration-300"
          >
            Continue Shopping
          </button>
        </div>
      ) : (
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
          <ul className="divide-y divide-gray-300">
            {cartItems.map((item) => (
              <li
                key={item.id}
                className="flex justify-between items-center py-3"
              >
                <span className="text-gray-700 font-medium">
                  {item.product.name} - {item.quantity}x
                </span>
                <button
                  onClick={() => handleRemoveFromCart(item.id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg transition duration-300"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CartPage;
