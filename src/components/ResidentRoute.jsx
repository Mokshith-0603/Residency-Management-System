import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

export default function ResidentRoute({ children }) {
  const { user, role, loading } = useAuth();

  if (loading) return null;
  if (!user || role !== "resident") return <Navigate to="/login" />;

  return children;
}
