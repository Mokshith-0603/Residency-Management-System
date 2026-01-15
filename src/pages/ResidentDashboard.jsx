import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getMyResidentProfile } from "../services/residents.service";
import { supabase } from "../lib/supabaseClient";

export default function ResidentDashboard() {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user?.id) return;

    getMyResidentProfile(user.id)
      .then((data) => {
        if (!data) {
          setError(
            "Your resident profile is not yet linked. Please contact admin."
          );
        } else {
          setProfile(data);
        }
      })
      .catch(() => {
        setError("Unable to load resident details");
      })
      .finally(() => setLoading(false));
  }, [user?.id]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/login";
  };

  if (loading) return <p>Loading dashboard...</p>;

  if (error) {
    return (
      <div style={{ padding: "40px" }}>
        <h2>Resident Dashboard</h2>
        <p style={{ color: "red" }}>{error}</p>
        <button onClick={handleLogout}>Logout</button>
      </div>
    );
  }

  return (
    <div style={{ padding: "40px" }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h1>Welcome, {profile.name}</h1>
        <button onClick={handleLogout}>Logout</button>
      </div>

      <div className="card" style={{ marginTop: "20px" }}>
        <p><strong>House No:</strong> {profile.house_no ?? "—"}</p>
        <p><strong>Phone:</strong> {profile.phone}</p>
        <p><strong>Move-in Date:</strong> {profile.move_in_date}</p>
        <p><strong>Status:</strong> {profile.status}</p>
      </div>
    </div>
  );
}
