import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export default function ProtectedRoute({ children, adminOnly = false }) {
  const token = localStorage.getItem("token");

  if (!token) return <Navigate to="/login" />;

  try {
    const decoded = jwtDecode(token);

    // If route is adminOnly but user isn’t admin → kick out
    if (adminOnly && decoded.isAdmin !== 1) {
        return <Navigate to="/" />;
      }

    return children;
  } catch (err) {
    return <Navigate to="/login" />;
  }
}
