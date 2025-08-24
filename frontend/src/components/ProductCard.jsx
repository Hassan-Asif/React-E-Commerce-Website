import { Link } from "react-router-dom";
import { api } from "../lib/api.js";

export default function ProductCard({ product, onDelete }) {
  const user = JSON.parse(localStorage.getItem("user")) || {};

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    try {
      await api(`/products/${product._id}`, { method: "DELETE" });
      onDelete(product._id); // update parent state
    } catch (err) {
      console.error(err);
      alert("Failed to delete product");
    }
  };

  return (
    <div className="relative group rounded-2xl overflow-hidden shadow-lg transform hover:scale-105 transition duration-500 bg-white">
      <Link to={`/products/${product._id}`}>
        <img
          src={product.image || "/placeholder.png"}
          alt={product.title}
          className="h-64 w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </Link>

      <div className="p-4 flex flex-col gap-2">
        <h2 className="font-semibold text-lg">{product.title}</h2>
        <p className="text-gray-600">${parseFloat(product.price).toFixed(2)}</p>
      </div>

      {/* DELETE BUTTON FOR ADMINS */}
      {user.isAdmin && (
        <button
          onClick={handleDelete}
          className="absolute top-2 right-2 bg-black text-white px-3 py-1 rounded-md hover:bg-black text-sm"
        >
          Delete
        </button>
      )}
    </div>
  );
}
