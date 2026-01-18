import { NavLink, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";


export default function ResidentSidebar() {
  const navigate = useNavigate();

  const logout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  return (
    <aside className="sidebar">
      <h3>Resident Hub</h3>

      <NavLink to="/resident" end>🏠 Dashboard</NavLink>
      <NavLink to="/resident/residents">👥 Residents</NavLink>
      <NavLink to="/resident/announcements">📢 Announcements</NavLink>
      <NavLink to="/resident/events">🎉 Events</NavLink>
      <NavLink to="/resident/bills">🧾 Bills </NavLink>
      <NavLink to="/resident/listings">🏡 Listings</NavLink>
      <NavLink to="/resident/wishlist">⭐ Wishlist</NavLink>
      <NavLink to="/resident/complaints">🛠 Report Issue</NavLink>

      <button onClick={logout} className="logout-btn">
        🔓 Logout
      </button>
    </aside>
  );
}
