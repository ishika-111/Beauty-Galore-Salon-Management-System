import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleCreateProductItem = async (e) => {
    e.preventDefault();

    const parsedPrice = parseFloat(price);
    if (isNaN(parsedPrice) || parsedPrice <= 0) {
      setError("Please enter a valid price.");
      return;
    }

    if (!name || !description) {
      setError("Please fill out all required fields.");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      setError("Unauthorized. Please log in again.");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", parsedPrice);
    if (image) {
      formData.append("image", image);
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/admin/product",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSuccess("Product item created successfully!");
      setError("");

      setTimeout(() => navigate("/dashboard"), 1500);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create product item.");
      setSuccess("");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 ml-80">
      <div className="bg-white p-10 rounded-lg shadow-xl w-full max-w-lg">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Add Product Item
        </h1>

        {error && <p className="text-red-600 text-center mb-4">{error}</p>}
        {success && (
          <p className="text-green-600 text-center mb-4">{success}</p>
        )}

        <form onSubmit={handleCreateProductItem} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              placeholder="Enter item name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-gray-700"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              placeholder="Enter item description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-gray-700"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Price (Rs.)
            </label>
            <input
              type="number"
              placeholder="Enter price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
              min="0"
              step="0.01"
              className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-gray-700"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Image
            </label>
            <input
              type="file"
              onChange={handleImageChange}
              accept="image/*"
              className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-lime-700 text-white py-3 px-4 rounded-md text-lg font-medium transition-all hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Add Product Item
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
