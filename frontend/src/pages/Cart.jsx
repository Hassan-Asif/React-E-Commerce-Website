import { useCart } from '../store/useCart.js';
import { Link } from 'react-router-dom';

export default function Cart() {
  const { items, inc, dec, remove, total } = useCart();
  return (
    <main className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      {items.length === 0 ? (
        <p>Cart is empty. <Link to="/products" className="text-indigo-600 underline">Shop now</Link></p>
      ) : (
        <div className="space-y-4">
          {items.map(i => (
            <div key={i.id} className="card p-4 flex items-center gap-3">
              <img src={i.image} className="w-20 h-20 rounded object-cover" />
              <div className="flex-1">
                <div className="font-semibold">{i.title}</div>
                <div className="text-sm text-gray-500">PKR:&nbsp;{parseFloat(i.price).toFixed(2)}</div>
                <div className="mt-1 flex items-center gap-2">
                  <button onClick={() => dec(i.id)} className="px-2 py-1 rounded bg-gray-100">-</button>
                  <span>{i.qty}</span>
                  <button onClick={() => inc(i.id)} className="px-2 py-1 rounded bg-gray-100">+</button>
                  <button onClick={() => remove(i.id)} className="ml-auto text-sm text-red-500">Remove</button>
                </div>
              </div>
            </div>
          ))}
          <div className="text-right font-semibold">Total: PKR{(total()/100).toFixed(2)}</div>
          <Link to="/checkout" className="btn ml-auto w-fit">Proceed to Checkout</Link>
        </div>
      )}
    </main>
  );
}
