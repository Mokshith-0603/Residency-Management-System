import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

export default function AdminRoute({ children }) {
  const { user, role, loading } = useAuth();

  if (loading) return null;
  if (!user || role !== "admin") return <Navigate to="/login" />;

  return children;
}
