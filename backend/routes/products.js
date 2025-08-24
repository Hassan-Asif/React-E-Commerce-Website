import express from "express";
import jwt from "jsonwebtoken";
import Product from "../models/Product.js";

const router = express.Router();

// ✅ Middleware to check admin
function requireAdmin(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: "No token" });

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded.isAdmin) return res.status(403).json({ message: "Forbidden" });
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
}

// ✅ Get hot selling products (limit 7) — must come before "/"
router.get("/hot", async (req, res) => {
  try {
    const hotProducts = await Product.find({ hotSelling: true }).limit(7);
    res.json(hotProducts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ Get all products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ Create product (admin only)
router.post("/", requireAdmin, async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.json({ message: "Product created!", product });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ Delete product (admin only)
router.delete("/:id", requireAdmin, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Product deleted!" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
