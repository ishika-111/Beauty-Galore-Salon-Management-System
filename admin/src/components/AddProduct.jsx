import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);
  const [stock, setStock] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleCreateProductItem = async (e) => {
    e.preventDefault();

    const parsedPrice = parseFloat(price);
    const parsedStock = parseInt(stock);
    if (isNaN(parsedPrice) || parsedPrice <= 0) {
      setError("Please enter a valid price.");
      return;
    }
    if (isNaN(parsedStock) || parsedStock <= 0) {
      setError("Please enter a valid stock.");
      return;
    }

    if (!name || !description || !category) {
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
    formData.append("category", category);
    formData.append("price", parsedPrice);
    formData.append("stock", parsedStock);

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

      setTimeout(() => navigate("/product/list"), 1500);
    } catch (err) {
      console.error("Error creating product item:", err);
      setError(err.response?.data?.message || "Failed to create product item.");
      setSuccess("");
    }
  };

  return (
    <div className="h-full flex items-center justify-center p-4">
      <div className="w-full max-w-sm bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">
          Add Product Item
        </h1>

        {error && <p className="text-red-600 text-center mb-3">{error}</p>}
        {success && (
          <p className="text-green-600 text-center mb-3">{success}</p>
        )}

        <form onSubmit={handleCreateProductItem} className="space-y-4">
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
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-gray-700"
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
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-gray-700"
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
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-gray-700"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Stock
            </label>
            <input
              type="number"
              placeholder="Enter stock"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              required
              min="0"
              step="1"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-gray-700"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-gray-700"
            >
              <option value="">Select a category</option>
              <option value="HAIR_COLOR">Hair Color</option>
              <option value="HAIR_CARE">Hair Care</option>
              <option value="HAIR_TOOLS_AND_APPLIANCES">
                Hair Tools and Appliances
              </option>
              <option value="SKINCARE">Skincare</option>
              <option value="NAILS">Nails</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Image
            </label>
            <input
              type="file"
              onChange={handleImageChange}
              accept="image/*"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-lime-700 text-white py-2.5 px-4 rounded-md text-base font-medium transition-all hover:bg-lime-600 focus:outline-none focus:ring-2 focus:ring-lime-500 focus:ring-offset-2"
          >
            Add Product Item
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
