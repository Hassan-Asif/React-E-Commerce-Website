import { Router } from 'express';
import { getDb } from '../db.js';
import { authRequired } from '../middleware/auth.js';

const router = Router();

router.post('/', authRequired, async (req, res) => {
  const { items } = req.body; // [{productId, qty}]
  if (!Array.isArray(items) || items.length === 0) return res.status(400).json({ error: 'No items' });
  const db = await getDb();
  const prods = await db.all(`SELECT id, price_cents FROM products WHERE id IN (${items.map(() => '?').join(',')})`, items.map(i => i.productId));
  const priceMap = Object.fromEntries(prods.map(p => [p.id, p.price_cents]));
  const total = items.reduce((sum, i) => sum + (priceMap[i.productId] || 0) * i.qty, 0);

  await db.run('BEGIN');
  try {
    const result = await db.run('INSERT INTO orders (user_id, total_cents) VALUES (?, ?)', [req.user.id, total]);
    const orderId = result.lastID;
    const stmt = await db.prepare('INSERT INTO order_items (order_id, product_id, qty, price_cents) VALUES (?, ?, ?, ?)');
    for (const i of items) {
      await stmt.run(orderId, i.productId, i.qty, priceMap[i.productId]);
    }
    await stmt.finalize();
    await db.run('COMMIT');
    res.json({ id: orderId, total_cents: total, status: 'created' });
  } catch (e) {
    await db.run('ROLLBACK');
    res.status(500).json({ error: 'Could not create order' });
  }
});

router.get('/', authRequired, async (req, res) => {
  const db = await getDb();
  const orders = await db.all('SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC', [req.user.id]);
  res.json(orders);
});

export default router;
