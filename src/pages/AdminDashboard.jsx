import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import { getAdminDashboardStats } from "../services/dashboard.service";

export default function AdminDashboard() {
  const navigate = useNavigate();

  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  /* 🔐 Logout */
  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getAdminDashboardStats();
        setStats(data);
      } catch (err) {
        console.error("Failed to load admin dashboard stats:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) return <p>Loading dashboard...</p>;

  if (!stats)
    return (
      <div style={{ padding: "40px" }}>
        <h2>Unable to load dashboard</h2>
        <button onClick={handleLogout}>Logout</button>
      </div>
    );

  return (
    <div style={{ padding: "40px" }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h1>Welcome, Admin!</h1>
        <button onClick={handleLogout}>Logout</button>
      </div>

      {/* Dashboard Cards */}
      <div className="dashboard-grid">
        <Card title="Happy Residents" value={`${stats.residents}+`} />
        <Card title="No. of Houses" value={`${stats.houses}+`} />
        <Card title="Amenities" value={`${stats.amenities}+`} />
        <Card title="Pending Reports" value={stats.pendingReports} />
        <Card title="Total Expenses" value={`₹ ${stats.expenses}`} />
        <Card title="Total Income" value={`₹ ${stats.income}`} />
      </div>
    </div>
  );
}

/* 🔹 Reusable Card */
function Card({ title, value }) {
  return (
    <div className="dashboard-card">
      <h3>{title}</h3>
      <h2>{value}</h2>
    </div>
  );
}
