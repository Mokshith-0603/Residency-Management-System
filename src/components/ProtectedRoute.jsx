import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children, allowedRole }) {
  const { user, role, loading } = useAuth();

  // 1️⃣ Wait for auth state to resolve
  if (loading) {
    return <p>Loading...</p>;
  }

  // 2️⃣ Not logged in
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // 3️⃣ Normalize roles (CRITICAL FIX)
  if (allowedRole) {
    const userRole = role?.toLowerCase();
    const allowed = allowedRole.toLowerCase();

    if (userRole !== allowed) {
      return <Navigate to="/" replace />;
    }
  }

  // 4️⃣ Access granted
  return children;
}
