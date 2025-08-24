import { create } from 'zustand';

export const useCart = create((set, get) => ({
  items: [], // {id, title, price_cents, image, qty}
  add(item) {
    const existing = get().items.find(i => i.id === item.id);
    if (existing) {
      set({ items: get().items.map(i => i.id === item.id ? { ...i, qty: i.qty + 1 } : i) });
    } else set({ items: [...get().items, { ...item, qty: 1 }] });
  },
  remove(id) { set({ items: get().items.filter(i => i.id !== id) }); },
  inc(id) { set({ items: get().items.map(i => i.id === id ? { ...i, qty: i.qty + 1 } : i) }); },
  dec(id) { set({ items: get().items.map(i => i.id === id ? { ...i, qty: Math.max(1, i.qty - 1) } : i) }); },
  clear() { set({ items: [] }); },
  total() { return get().items.reduce((s, i) => s + i.price_cents * i.qty, 0); }
}));
