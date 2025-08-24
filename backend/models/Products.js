// models/Product.js
import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  stock: Number,
  image: String,
});

export default mongoose.model("Product", productSchema);
