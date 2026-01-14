import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children, role }) {
  const { user, loading, userRole } = useAuth();

  if (loading) return null;

  if (!user) return <Navigate to="/login" />;

  if (role && role !== userRole) return <Navigate to="/" />;

  return children;
}
