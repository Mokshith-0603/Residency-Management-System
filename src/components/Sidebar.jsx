import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import { useAuth } from "../context/AuthContext";

export default function Sidebar() {
  const { role } = useAuth();
  const navigate = useNavigate();

  const logout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  return (
    <aside className="sidebar">
      <h3>Estate Manager</h3>

      <Link to={role === "ADMIN" ? "/admin" : "/resident"}>Dashboard</Link>

      {role === "ADMIN" && (
        <>
          <Link to="/admin/residents">Residents</Link>
          <Link to="/admin/announcements">Announcements</Link>
          <Link to="/admin/bills">Maintenance</Link>
        </>
      )}

      <button onClick={logout} className="logout-btn">
        Logout
      </button>
    </aside>
  );
}
