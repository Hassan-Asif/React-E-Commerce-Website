// backend/seed.js
import { getDb } from "./db.js";

const seed = async () => {
  const db = await getDb();

  await db.exec(`
    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      price REAL,
      image TEXT
    )
  `);

  await db.run("DELETE FROM products");

  const products = [
    { name: "Sneakers", price: 120, image: "https://via.placeholder.com/300" },
    { name: "Headphones", price: 80, image: "https://via.placeholder.com/300" },
    { name: "Backpack", price: 50, image: "https://via.placeholder.com/300" },
  ];

  for (const p of products) {
    await db.run(
      "INSERT INTO products (name, price, image) VALUES (?, ?, ?)",
      [p.name, p.price, p.image]
    );
  }

  console.log("✅ Database seeded with sample products!");
};

seed();
