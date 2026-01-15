import { NavLink, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";

export default function Sidebar() {
  const navigate = useNavigate();

  const logout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  return (
    <aside className="sidebar">
      <h3>Estate Manager</h3>

      <NavLink to="/admin" end>🏠Dashboard</NavLink>
      <NavLink to="/admin/residents">👥Residents</NavLink>
      <NavLink to="/admin/announcements">📢Announcement</NavLink>
      <NavLink to="/admin/staff">👷Staff</NavLink>
      <NavLink to="/admin/events">🎉Events</NavLink>
      <NavLink to="/admin/listings">🏡Listings</NavLink>
      <NavLink to="/admin/wishlist">⭐Wishlist</NavLink>
      <NavLink to="/admin/bills">💰Maintenance Bill</NavLink>
      <NavLink to="/admin/reports">📈Reports</NavLink>

      <button onClick={logout} className="logout-btn">
        🔓Logout
      </button>
    </aside>
  );
}
