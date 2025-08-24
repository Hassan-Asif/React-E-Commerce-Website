import express from "express";
import { openDb } from "../db.js";
import jwt from "jsonwebtoken";

const router = express.Router();
const SECRET = "supersecretkey";

// Middleware to check admin
function verifyAdmin(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Unauthorized" });
  try {
    const decoded = jwt.verify(token, SECRET);
    if (!decoded.isAdmin) return res.status(403).json({ message: "Forbidden" });
    next();
  } catch {
    res.status(401).json({ message: "Invalid token" });
  }
}

// Add product
router.post("/products", verifyAdmin, async (req, res) => {
  const db = await openDb();
  const { name, price, description, image } = req.body;
  await db.run(
    "INSERT INTO products (name, price, description, image) VALUES (?, ?, ?, ?)",
    [name, price, description, image]
  );
  res.json({ message: "Product added" });
});

// Delete product
router.delete("/products/:id", verifyAdmin, async (req, res) => {
  const db = await openDb();
  await db.run("DELETE FROM products WHERE id = ?", req.params.id);
  res.json({ message: "Product deleted" });
});

export default router;
