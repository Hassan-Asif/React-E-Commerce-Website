import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../lib/api.js";
import { useCart } from "../store/useCart.js";
import { Star } from "lucide-react";

export default function ProductDetail() {
  const { id } = useParams();
  const [p, setP] = useState(null);
  const add = useCart((s) => s.add);

  // Temporary frontend reviews
  const [reviews, setReviews] = useState([
    { id: 1, name: "Alice", rating: 5, comment: "Amazing product!" },
    { id: 2, name: "Bob", rating: 4, comment: "Good value for money." },
  ]);
  const [newReview, setNewReview] = useState({ name: "", rating: 0, comment: "" });

  useEffect(() => {
  if (id) {
    api(`/products/${id}`).then(setP).catch(console.error);
  }
  }, [id])

  if (!p)
    return (
      <div className="max-w-6xl mx-auto px-4 py-10 text-center text-lg">
        Loading...
      </div>
    );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newReview.name || !newReview.rating || !newReview.comment) return;

    setReviews([...reviews, { id: Date.now(), ...newReview }]);
    setNewReview({ name: "", rating: 0, comment: "" });
  };

  return (
    <main className="max-w-6xl mx-auto px-4 py-12 grid md:grid-cols-2 gap-12">
      {/* LEFT: Product Image */}
      <div className="flex items-center justify-center">
        <img
          src={p.image || "/placeholder.png"}
          alt={p.title}
          className="rounded-2xl w-full h-[420px] object-cover shadow-xl"
        />
      </div>

      {/* RIGHT: Product Details */}
      <div className="flex flex-col justify-center space-y-6 px-4">
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800">{p.title || "Product Name"}</h1>
        <p className="text-gray-600 text-sm md:text-base leading-relaxed">{p.description || "Product description goes here."}</p>
        <div className="text-2xl md:text-3xl font-semibold text-green-600">
          PKR {parseFloat(p.price).toFixed(2)}
        </div>
        <button
          onClick={() => add(p)}
          className="bg-black text-white font-semibold py-3 px-6 rounded-xl shadow-md hover:opacity-90 transition transform hover:scale-105 w-fit"
        >
          Add to Cart
        </button>

        {/* Reviews Section */}
        <div className="mt-8">
          <h2 className="text-lg font-semibold mb-2">Customer Reviews</h2>

          {reviews.length === 0 ? (
            <p className="text-gray-400 text-xs md:text-sm">No reviews yet.</p>
          ) : (
            <div className="space-y-2">
              {reviews.map((r) => (
                <div key={r.id} className="border border-gray-200 rounded-lg p-2 shadow-sm">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${i < r.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                      />
                    ))}
                  </div>
                  <p className="mt-1 text-gray-600 text-sm">{r.comment}</p>
                  <p className="mt-1 text-gray-400 text-xs">– {r.name}</p>
                </div>
              ))}
            </div>
          )}

          {/* Review Form */}
          <form onSubmit={handleSubmit} className="mt-4 space-y-2">
            <input
              type="text"
              placeholder="Your Name"
              value={newReview.name}
              onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-2 py-1 text-xs md:text-sm focus:ring-2 focus:ring-pink-400 outline-none"
            />

            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 cursor-pointer ${i < newReview.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                  onClick={() => setNewReview({ ...newReview, rating: i + 1 })}
                />
              ))}
            </div>

            <textarea
              placeholder="Write your review..."
              value={newReview.comment}
              onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-2 py-1 text-xs md:text-sm h-16 focus:ring-2 focus:ring-pink-400 outline-none"
            />

            <button
              type="submit"
              className="bg-black text-white px-3 py-1.5 text-sm rounded-lg hover:bg-pink-600 transition"
            >
              Submit Review
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
