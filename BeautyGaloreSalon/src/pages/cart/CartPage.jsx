import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import OrderForm from "./OrderForm"; // Import your OrderForm component

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    setLoading(true);
    try {
      const token = Cookies.get("token");
      if (!token) throw new Error("Unauthorized: Please log in first.");

      const response = await axios.get(`http://localhost:5000/api/cart`, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });

      setCartItems(response.data);
      setError(null);
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || err.message || "Failed to fetch cart";
      setError(errorMessage);
      toast.error(errorMessage);
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

      await axios.delete(
        `http://localhost:5000/api/cart/remove/${cartItemId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );

      // Remove the item from cart state immediately after removal
      setCartItems((prevItems) =>
        prevItems.filter((item) => item.id !== cartItemId)
      );

      toast.success("Item removed from cart!");
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || err.message || "Error removing item.";
      toast.error(errorMessage);
    }
  };

  const handleQuantityChange = async (cartItemId, newQuantity) => {
    if (newQuantity < 1) return;
    try {
      const token = Cookies.get("token");

      await axios.put(
        `http://localhost:5000/api/cart/update/${cartItemId}`,
        { quantity: newQuantity },
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );

      // After changing quantity, re-fetch the cart
      fetchCart();
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        "Error updating quantity.";
      toast.error(errorMessage);
    }
  };

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-50">
        <p className="text-lg font-semibold text-gray-600">Loading cart...</p>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10 px-4">
        <h2 className="text-4xl font-bold mb-8 text-lime-800">Shopping Cart</h2>

        {cartItems.length === 0 ? (
          <div className="flex flex-col items-center mt-16 mb-10">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-20 w-20 text-gray-400 mb-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 9h14l-2-9M10 21h4"
              />
            </svg>

            <div className="text-xl font-medium text-gray-600 mb-4 text-center">
              Your cart is empty.
            </div>

            <button
              onClick={() => navigate("/customer/products")}
              className="bg-lime-700 hover:bg-lime-800 text-white text-lg font-semibold px-6 py-3 rounded-lg transition duration-300"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="w-full max-w-3xl bg-white rounded-lg shadow-lg p-8 space-y-6">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center border-b pb-5"
              >
                <div className="flex items-center gap-4">
                  {item.product.imageUrl ? (
                    <img
                      src={`http://localhost:5000${item.product.imageUrl}`}
                      alt={item.product.name}
                      className="w-20 h-20 object-cover rounded-md"
                    />
                  ) : (
                    <span className="text-gray-400">No Image</span>
                  )}
                  <div>
                    <h4 className="text-lg font-semibold">
                      {item.product.name}
                    </h4>
                    <p className="text-gray-500 text-sm">
                      Rs {item.product.price} each
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex items-center border rounded-lg overflow-hidden">
                    <button
                      onClick={() =>
                        handleQuantityChange(item.id, item.quantity - 1)
                      }
                      className="px-3 py-1 text-lg font-bold hover:bg-gray-200"
                    >
                      −
                    </button>
                    <span className="px-4 py-1">{item.quantity}</span>
                    <button
                      onClick={() =>
                        handleQuantityChange(item.id, item.quantity + 1)
                      }
                      className="px-3 py-1 text-lg font-bold hover:bg-gray-200"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={() => handleRemoveFromCart(item.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
            <div className="text-right text-xl font-bold">
              Total: Rs {totalPrice.toFixed(2)}
            </div>
          </div>
        )}

        {cartItems.length > 0 && (
          <div className="w-full max-w-3xl mt-6">
            <button
              onClick={toggleModal}
              className="bg-lime-800 text-white w-full py-4 text-xl font-semibold rounded-lg hover:bg-lime-700 transition duration-300"
            >
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>

      {/* Modal for Checkout */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md relative">
            <button
              onClick={toggleModal}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-xl"
            >
              ✖
            </button>
            <OrderForm cartItems={cartItems} totalAmount={totalPrice} />
          </div>
        </div>
      )}
    </>
  );
};

export default CartPage;
