import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ResidentRoute({ children }) {
  const { role, loading } = useAuth();

  if (loading) return <p>Loading...</p>;
  if (role !== "RESIDENT") return <Navigate to="/login" replace />;

  return children;
}
