import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Home from "./pages/Home.jsx";
import Products from "./pages/Products.jsx";
import ProductDetail from "./pages/ProductDetail.jsx";
import Cart from "./pages/Cart.jsx";
import Checkout from "./pages/Checkout.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Admin from "./pages/Admin.jsx";
import About from "./pages/About.jsx";
import Footer from "./components/Footer.jsx";
import AdminRoute from "./components/AdminRoute";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

export default function App() {
  const [cart, setCart] = useState([]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar cart={cart} />

      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<Home cart={cart} setCart={setCart} />} />
          <Route path="/products" element={<Products cart={cart} setCart={setCart} />} />
          <Route path="/products/:id" element={<ProductDetail cart={cart} setCart={setCart} />} />

          <Route path="/cart" element={<Cart cart={cart} setCart={setCart} />} />

          {/* ✅ Protected checkout */}
          <Route
            path="/checkout"
            element={
              <ProtectedRoute>
                <Checkout cart={cart} setCart={setCart} />
              </ProtectedRoute>
            }
          />

          {/* Auth routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* ✅ Admin route (protected) */}
          <Route
  path="/admin"
  element={
    <AdminRoute>
      <Admin />
    </AdminRoute>
  }
/>

          <Route path="/about" element={<About />} />
        </Routes>
      </div>

      <Footer />
    </div>
  );
}
