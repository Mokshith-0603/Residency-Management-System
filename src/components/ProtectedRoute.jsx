import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children, allowedRole }) {
  const { user, role, loading } = useAuth();

  // 1️⃣ Wait for auth state
  if (loading) {
    return <p>Loading...</p>;
  }

  // 2️⃣ Not logged in
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // 3️⃣ Role mismatch (THIS WAS YOUR BUG)
  if (allowedRole && role !== allowedRole) {
    return <Navigate to="/" replace />;
  }

  // 4️⃣ Access granted
  return children;
}
