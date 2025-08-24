import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard.jsx";
import { api } from "../lib/api.js";

export default function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const data = await api("/products");
      setProducts(data);
    } catch (err) {
      console.error(err);
    }
  };

  // Remove product from UI after deletion
  const handleDelete = (id) => {
    setProducts(products.filter((p) => p._id !== id));
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-white">
      &nbsp;
      <h1 className="text-4xl font-bold text-center mb-10 text-white">All Products</h1>

      {products.length === 0 ? (
        <p className="text-center text-gray-500">No products available.</p>
      ) : (
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 px-4">
          {products.map((p) => (
            <ProductCard key={p._id} product={p} onDelete={handleDelete} />
          ))}
        </div>
      )}
    </div>
  );
}
