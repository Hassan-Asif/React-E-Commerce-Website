// src/components/AdminRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";

export default function AdminRoute({ children }) {
  // Get user from localStorage
  let user = null;
  try {
    const storedUser = localStorage.getItem("user");
    if (storedUser) user = JSON.parse(storedUser);
  } catch (err) {
    console.error("Error parsing user from localStorage:", err);
  }

  // Redirect non-admin users
  if (!user || !user.isAdmin) {
    return <Navigate to="/" replace />;
  }

  // Render admin content
  return <>{children}</>;
}
