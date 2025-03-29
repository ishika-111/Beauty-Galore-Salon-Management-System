import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

export default function ProductPage() {
  const [productItems, setProductItems] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchMenuItems();
  }, []);

  const fetchMenuItems = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/users/products"
      );
      setProductItems(response.data);
    } catch (err) {
      console.error("Error fetching menu items:", err);
      setError("Failed to load menu items.");
    }
  };

  const addToCart = async (productId) => {
    try {
      const token = Cookies.get("token");
      if (!token) {
        toast.error("You must be logged in to add items to the cart.");
        return;
      }

      const response = await axios.post(
        "http://localhost:5000/api/cart/add",
        { productId, quantity: 1 },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      toast.success("Item added to cart!");
    } catch (error) {
      console.error("Error adding to cart:", error.response?.data || error);
      toast.error(error.response?.data?.error || "Failed to add item to cart");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {productItems.map((item) => (
          <div key={item.id} className="border p-4 rounded-lg shadow-lg">
            {item.imageUrl && (
              <img
                src={`http://localhost:5000${item.imageUrl}`}
                alt={item.name}
                className="w-full h-40 object-cover rounded-lg"
              />
            )}
            <h2 className="text-lg font-semibold">{item.name}</h2>
            <p className="text-gray-600">{item.description}</p>
            <p className="text-xl font-bold mt-2">{item.price}</p>
            <button
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
              onClick={() => addToCart(item.id)}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
