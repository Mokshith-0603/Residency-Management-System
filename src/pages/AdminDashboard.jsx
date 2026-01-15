import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { getAdminDashboardStats } from "../services/dashboard.service";

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

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
  if (!stats) return <p>Unable to load dashboard</p>;

  return (
    <>
      {/* Header (NO LOGOUT HERE) */}
      <div className="admin-header">
        <h2>Sathya Sai Royal Gardens</h2>
      </div>

      <div className="dashboard-wrapper">
        <h1>Welcome, Admin!</h1>

        <div className="dashboard-grid">
          <Card
            icon="😊"
            title="Happy Residents"
            value={`${stats.residents}+`}
            desc="Community satisfaction"
          />
          <Card
            icon="🏠"
            title="No. of Houses"
            value={`${stats.houses}+`}
            desc="Occupied homes"
          />
          <Card
            icon="🏊"
            title="Amenities"
            value={`${stats.amenities}+`}
            desc="Community facilities"
          />
          <Card
            icon="📄"
            title="Pending Reports"
            value={stats.pendingReports}
            desc="Awaiting review"
          />
          <Card
            icon="💰"
            title="Total Expenses"
            value={`₹ ${stats.expenses}`}
            desc="Records logged"
          />
          <Card
            icon="💵"
            title="Total Income"
            value={`₹ ${stats.income}`}
            desc="Maintenance collected"
          />
        </div>
      </div>
    </>
  );
}

/* ===============================
   DASHBOARD CARD
================================ */
function Card({ icon, title, value, desc }) {
  return (
    <div className="dashboard-card">
      <div className="icon">{icon}</div>
      <div>
        <h3>{title}</h3>
        <h2>{value}</h2>
        <p>{desc}</p>
      </div>
    </div>
  );
}
