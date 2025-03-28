import { useState } from "react";

const products = [
  {
    id: 1,
    name: "Product A",
    price: "$20",
    description: "Short description of Product A",
  },
  {
    id: 2,
    name: "Product B",
    price: "$30",
    description: "Short description of Product B",
  },
  {
    id: 3,
    name: "Product C",
    price: "$40",
    description: "Short description of Product C",
  },
];

export default function ProductPage() {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {products.map((product) => (
          <div key={product.id} className="border p-4 rounded-lg shadow-lg">
            <h2 className="text-lg font-semibold">{product.name}</h2>
            <p className="text-gray-600">{product.description}</p>
            <p className="text-xl font-bold mt-2">{product.price}</p>
            <button
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
              onClick={() => addToCart(product)}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
