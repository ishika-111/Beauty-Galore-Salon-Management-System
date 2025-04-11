import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import OrderForm from "./OrderForm";

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

      toast.success("Item removed from cart!");
      fetchCart();
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

  if (loading) return <p className="text-center mt-10">Loading cart...</p>;
  if (error)
    return (
      <p className="text-center text-red-500 mt-10">
        {typeof error === "string" ? error : JSON.stringify(error)}
      </p>
    );

  return (
    <>
      <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
        <h2 className="text-3xl font-bold mb-6">Shopping Cart</h2>

        {cartItems.length === 0 ? (
          <p className="text-lg">Your cart is empty.</p>
        ) : (
          <div className="w-full max-w-2xl bg-white rounded-lg shadow p-6">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center border-b py-4"
              >
                <div className="flex items-center gap-4">
                  {item.product.imageUrl ? (
                    <img
                      src={`http://localhost:5000${item.product.imageUrl}`}
                      alt={item.product.name}
                      className="w-16 h-16 object-cover"
                    />
                  ) : (
                    <span>No Image</span>
                  )}
                  <div>
                    <h4 className="font-semibold text-lg">
                      {item.product.name}
                    </h4>
                    <p className="text-gray-500 text-sm">
                      ${item.product.price} each
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex items-center border rounded-md">
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
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {cartItems.length > 0 && (
          <div className="w-full max-w-2xl bg-white p-6 mt-6 rounded-lg shadow">
            <div className="text-right text-lg font-semibold">
              <p>Total: ${totalPrice.toFixed(2)}</p>
            </div>
            <OrderForm cartItems={cartItems} totalAmount={totalPrice} />
          </div>
        )}
      </div>
    </>
  );
};

export default CartPage;
