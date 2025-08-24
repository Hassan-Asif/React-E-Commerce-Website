import { useCart } from '../store/useCart.js';
import { api } from '../lib/api.js';
import { useAuth } from '../store/useAuth.js';
import { useNavigate, Link } from 'react-router-dom';

export default function Checkout() {
  const { items, clear, total } = useCart();
  const { token } = useAuth();
  const nav = useNavigate();

  async function placeOrder() {
    if (!token) return nav('/login');
    const payload = { items: items.map(i => ({ productId: i.id, qty: i.qty })) };
    try {
      const res = await api('/orders', { method: 'POST', body: JSON.stringify(payload) });
      clear();
      nav('/');
      alert(`Order #${res.id} placed! Total $${(res.total_cents/100).toFixed(2)}`);
    } catch (e) {
      alert(e.message);
    }
  }

  if (items.length === 0) return (
    <main className="max-w-4xl mx-auto px-4 py-10">
      <p>Your cart is empty. <Link to="/products" className="text-indigo-600 underline">Browse products</Link></p>
    </main>
  );

  return (
    <main className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>
      <div className="card p-6">
        <div className="flex items-center justify-between">
          <span>Order Total</span>
          <span className="font-semibold">${(total()/100).toFixed(2)}</span>
        </div>
        <button onClick={placeOrder} className="btn mt-4 w-full">Place Order</button>
        <p className="text-xs text-gray-500 mt-2">Payment stub: integrate Stripe later.</p>
      </div>
    </main>
  );
}
