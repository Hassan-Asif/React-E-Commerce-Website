import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-gray-50">
      {/* Floating animated background shapes */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="absolute w-20 h-20 bg-gray-600 rounded-full opacity-30 animate-bounce-slow"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      {/* Hero Section */}
      <div className="text-center py-28 relative z-10">
        <h1 className="text-6xl font-extrabold text-gray-700 mb-6 animate-fade-in-down">
          Welcome to MyShop!
        </h1>
        <p className="text-xl text-gray-700 mb-8 animate-fade-in-up">
          Discover vibrant products with amazing designs
        </p>
        <Link
          to="/products"
          className="bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900 text-white px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition transform hover:scale-105 animate-bounce-button inline-block"
        >
          Browse Products
        </Link>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-8 py-12 relative z-10">
        {products.length === 0 ? (
          <p className="text-center text-gray-500 text-xl">No products yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {products.map((p) => (
              <Link
                key={p._id} // use MongoDB _id
                to={`/products/${p._id}`}
                className="relative group rounded-2xl overflow-hidden shadow-lg transform hover:scale-105 transition duration-500"
              >
                {/* Product Image */}
                <img
                  src={p.image || "/placeholder.png"} // fallback image
                  alt={p.title}
                  className="h-64 w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-500">
                  <span className="text-white text-lg font-semibold">
                    View Details
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Extra animation CSS */}
      <style>
        {`
          @keyframes bounce-slow {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-20px); }
          }
          .animate-bounce-slow { animation: bounce-slow 8s infinite ease-in-out; }

          @keyframes fade-in-up {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fade-in-up { animation: fade-in-up 1s ease forwards; }

          @keyframes fade-in-down {
            from { opacity: 0; transform: translateY(-20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fade-in-down { animation: fade-in-down 1s ease forwards; }

          @keyframes bounce-button {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-5px); }
          }
          .animate-bounce-button { animation: bounce-button 2s infinite; }
        `}
      </style>
    </div>
  );
}
