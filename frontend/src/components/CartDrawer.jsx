import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../store/useCart.js';
import { Link } from 'react-router-dom';

export default function CartDrawer({ open, onClose }) {
  const { items, inc, dec, remove, total } = useCart();

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div className="fixed inset-0 bg-black/30" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} />
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl p-6 flex flex-col"
          >
            <h3 className="text-xl font-bold mb-4">Your Cart</h3>
            <div className="flex-1 overflow-y-auto space-y-4">
              {items.length === 0 && <p className="text-gray-500">Cart is empty.</p>}
              {items.map(i => (
                <div key={i.id} className="flex items-center gap-3">
                  <img src={i.image} alt={i.title} className="w-16 h-16 rounded object-cover" />
                  <div className="flex-1">
                    <div className="font-semibold line-clamp-1">{i.title}</div>
                    <div className="text-sm text-gray-500">${(i.price_cents/100).toFixed(2)}</div>
                    <div className="mt-1 flex items-center gap-2">
                      <button onClick={() => dec(i.id)} className="px-2 py-1 rounded bg-gray-100">-</button>
                      <span>{i.qty}</span>
                      <button onClick={() => inc(i.id)} className="px-2 py-1 rounded bg-gray-100">+</button>
                      <button onClick={() => remove(i.id)} className="ml-auto text-sm text-red-500">Remove</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="pt-4 border-t mt-4">
              <div className="flex items-center justify-between font-semibold">
                <span>Total</span>
                <span>${(total()/100).toFixed(2)}</span>
              </div>
              <Link to="/checkout" className="btn block text-center mt-3" onClick={onClose}>Checkout</Link>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
