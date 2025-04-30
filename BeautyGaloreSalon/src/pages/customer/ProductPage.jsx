import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

export default function ProductPage() {
  const [productItems, setProductItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(12);

  // Hardcoded enum categories
  const categories = [
    "HAIR_TOOLS_AND_APPLIANCES",
    "HAIR_COLOR",
    "HAIR_CARE",
    "SKINCARE",
    "NAILS",
  ];

  useEffect(() => {
    fetchProductItems();
  }, []);

  useEffect(() => {
    handleFilter();
  }, [searchQuery, sortOrder, selectedCategory, productItems]);

  const fetchProductItems = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/users/products"
      );
      setProductItems(response.data);
    } catch (err) {
      console.error("Error fetching products:", err);
      setError("Failed to load products. Please try again later.");
    }
  };

  const addToCart = async (productId) => {
    try {
      const token = Cookies.get("token");
      if (!token) {
        toast.error("Please log in to add items to your cart.");
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
      toast.error(error.response?.data?.error || "Failed to add item to cart.");
    }
  };

  const handleFilter = () => {
    let filtered = [...productItems];

    // Filter by category
    if (selectedCategory !== "ALL") {
      filtered = filtered.filter((item) => item.category === selectedCategory);
    }

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Sort filter
    if (sortOrder === "lowToHigh") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortOrder === "highToLow") {
      filtered.sort((a, b) => b.price - a.price);
    }

    setFilteredItems(filtered);
  };

  // Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Pagination Controls
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredItems.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">
        Our Products
      </h1>

      {error && (
        <p className="text-red-600 text-center font-medium mb-6">{error}</p>
      )}

      {/* Search, Sort, and Category Filter Section */}
      <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full md:w-1/3 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-lime-500"
        />

        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="w-full md:w-1/4 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-lime-500"
        >
          <option value="">Sort by Price</option>
          <option value="lowToHigh">Low to High</option>
          <option value="highToLow">High to Low</option>
        </select>

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="w-full md:w-1/4 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-lime-500"
        >
          <option value="ALL">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat.replace(/_/g, " ")}
            </option>
          ))}
        </select>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {currentItems.length > 0 ? (
          currentItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-gray-200 shadow-md hover:shadow-2xl transition-all duration-300 p-5 flex flex-col"
            >
              {item.imageUrl && (
                <img
                  src={`http://localhost:5000${item.imageUrl}`}
                  alt={item.name}
                  className="w-full h-48 object-cover border border-black rounded-xl mb-4 hover:scale-105 transition-transform duration-300"
                />
              )}
              <h2 className="text-xl font-semibold text-gray-900 text-center mb-2">
                {item.name}
              </h2>
              <p className="text-gray-600 text-center text-sm mb-4 line-clamp-2 min-h-[48px]">
                {item.description}
              </p>
              <div className="flex flex-col flex-grow justify-end">
                <div className="text-center mb-4">
                  <p className="text-lg font-bold text-lime-700">
                    NPR {item.price}
                  </p>
                </div>
                <button
                  className="w-full flex items-center justify-center gap-2 bg-lime-700 hover:bg-lime-400 text-white font-semibold py-2 rounded-lg transition-all duration-300"
                  onClick={() => addToCart(item.id)}
                >
                  <span className="text-xl">🛒</span> Add to Cart
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center col-span-full text-gray-500">
            No products found.
          </p>
        )}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-8">
        <nav>
          <ul className="flex space-x-4">
            {pageNumbers.map((number) => (
              <li key={number}>
                <button
                  onClick={() => paginate(number)}
                  className={`px-4 py-2 border rounded-md ${
                    currentPage === number
                      ? "bg-lime-500 text-white"
                      : "text-gray-600"
                  }`}
                >
                  {number}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}
