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

      await axios.post(
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
    <div className="p-8 max-w-full mx-auto">
      <h1 className="text-3xl font-bold text-center mb-8">Our Products</h1>
      {error && <p className="text-red-500 text-center">{error}</p>}

      {/* Dynamic grid layout with better spacing */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 justify-center">
        {productItems.map((item) => (
          <div
            key={item.id}
            className="border p-5 rounded-xl shadow-md bg-white flex flex-col items-center h-[450px]"
          >
            {item.imageUrl && (
              <img
                src={`http://localhost:5000${item.imageUrl}`}
                alt={item.name}
                className="w-full h-40 object-contain rounded-lg mb-3"
              />
            )}
            <h2 className="text-lg font-semibold text-center">{item.name}</h2>
            <p className="text-gray-600 text-center text-sm flex-grow">
              {item.description}
            </p>
            <p className="text-lg font-bold mt-2">NPR {item.price}</p>
            <div className="mt-auto w-full">
              <button
                className="w-full bg-lime-700 text-white px-5 py-2 rounded-md hover:bg-lime-600 transition duration-300"
                onClick={() => addToCart(item.id)}
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
