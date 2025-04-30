import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaEdit, FaTrash } from "react-icons/fa";

const ProductList = () => {
  const [productItems, setProductItems] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editItem, setEditItem] = useState({
    id: "",
    name: "",
    description: "",
    price: "",
    category: "",
    imageUrl: "",
    stock: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const itemsPerPage = 5;

  useEffect(() => {
    fetchProductItems();
  }, []);

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        setSuccess("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  const fetchProductItems = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Unauthorized. Please log in again.");
      return;
    }

    try {
      const response = await axios.get(
        "http://localhost:5000/api/admin/product",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setProductItems(response.data);
    } catch (err) {
      setError("Error fetching product items");
      console.error("Error:", err);
    }
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Unauthorized. Please log in again.");
      return;
    }

    try {
      await axios.delete(`http://localhost:5000/api/admin/product/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSuccess("Item deleted successfully.");
      setError("");
      fetchProductItems();
    } catch (err) {
      console.error("Error deleting product item:", err);
      setError("Failed to delete product item.");
      setSuccess("");
    }
  };

  const handleEdit = (item) => {
    setEditItem(item);
    setImageFile(null);
    setEditModalOpen(true);
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Unauthorized. Please log in again.");
      return;
    }

    const formData = new FormData();
    formData.append("name", editItem.name);
    formData.append("description", editItem.description);
    formData.append("price", parseFloat(editItem.price));
    formData.append("stock", parseInt(editItem.stock));
    formData.append("category", editItem.category);
    if (imageFile) {
      formData.append("image", imageFile);
    }

    try {
      await axios.put(
        `http://localhost:5000/api/admin/product/${editItem.id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setEditModalOpen(false);
      fetchProductItems();
    } catch (err) {
      console.error("Error updating product item:", err);
      setError("Failed to update product item.");
    }
  };

  // Filtered and paginated items
  const filteredItems = productItems.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-9 rounded-lg shadow-md w-full max-w-5xl">
        <h1 className="text-2xl font-bold mb-6 text-center">Product Items</h1>

        {/* Search */}
        <div className="mb-4 flex justify-center">
          <input
            type="text"
            placeholder="Search by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-gray-300 px-4 py-2 rounded-md w-full max-w-sm"
          />
        </div>

        {/* Error & Success Messages */}
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {success && <p className="text-green-500 mb-4">{success}</p>}

        {/* Table */}
        <table className="min-w-full table-auto border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Image</th>
              <th className="px-4 py-2 text-left">Description</th>
              <th className="px-4 py-2 text-left">Price</th>
              <th className="px-4 py-2 text-left">Stock</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item) => (
              <tr key={item.id} className="border-t border-gray-200">
                <td className="px-4 py-2">{item.name}</td>
                <td className="px-4 py-2">
                  {item.imageUrl ? (
                    <img
                      src={`http://localhost:5000${item.imageUrl}`}
                      alt={item.name}
                      className="w-16 h-16 object-cover"
                    />
                  ) : (
                    <span>No Image</span>
                  )}
                </td>
                <td className="px-4 py-2">{item.description}</td>
                <td className="px-4 py-2">Rs.{item.price}</td>
                <td className="px-4 py-2">{item.stock}</td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => handleEdit(item)}
                    className="text-blue-600 hover:text-blue-800 mr-4"
                  >
                    <FaEdit size={20} />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <FaTrash size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex justify-center items-center mt-6 space-x-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 disabled:opacity-50"
          >
            Prev
          </button>
          <span className="px-4 py-2 font-semibold">
            {currentPage} / {totalPages}
          </span>
          <button
            onClick={() =>
              setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev))
            }
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>

      {/* Edit Modal */}
      {editModalOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Edit Product Item</h2>
            <form onSubmit={handleUpdate}>
              <input
                type="text"
                placeholder="Name"
                value={editItem.name}
                onChange={(e) =>
                  setEditItem({ ...editItem, name: e.target.value })
                }
                className="w-full mb-2 px-3 py-2 border border-gray-300 rounded"
              />
              <input
                type="text"
                placeholder="Description"
                value={editItem.description}
                onChange={(e) =>
                  setEditItem({ ...editItem, description: e.target.value })
                }
                className="w-full mb-2 px-3 py-2 border border-gray-300 rounded"
              />
              <input
                type="number"
                placeholder="Price"
                value={editItem.price}
                onChange={(e) =>
                  setEditItem({ ...editItem, price: e.target.value })
                }
                className="w-full mb-2 px-3 py-2 border border-gray-300 rounded"
              />
              <input
                type="number"
                placeholder="Stock"
                value={editItem.stock}
                onChange={(e) =>
                  setEditItem({ ...editItem, stock: e.target.value })
                }
                className="w-full mb-2 px-3 py-2 border border-gray-300 rounded"
              />
              <input
                type="text"
                placeholder="Category"
                value={editItem.category}
                onChange={(e) =>
                  setEditItem({ ...editItem, category: e.target.value })
                }
                className="w-full mb-2 px-3 py-2 border border-gray-300 rounded"
              />
              <input
                type="file"
                onChange={handleImageChange}
                className="w-full mb-4"
              />
              <button
                type="submit"
                className="w-full bg-lime-700 text-white py-2 px-4 rounded-md hover:bg-lime-600"
              >
                Update Product Item
              </button>
            </form>
            <button
              onClick={() => setEditModalOpen(false)}
              className="mt-4 w-full text-red-600 hover:text-red-800 py-2 px-4 rounded-md border border-gray-300"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductList;
