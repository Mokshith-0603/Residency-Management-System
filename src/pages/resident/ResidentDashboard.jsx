import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { getMyResidentProfile } from "../../services/residents.service";
import "../../styles/resident.css";

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

  if (loading) return <p>Loading dashboard...</p>;

  if (error) {
    return (
      <div className="resident-page">
        <h2>Resident Dashboard</h2>
        <p style={{ color: "red" }}>{error}</p>
      </div>
    );
  }

  return (
    <div className="resident-page">
      {/* Header */}
      <div className="resident-header">
        <h1>Welcome, {profile.name}</h1>
        <p>Here’s a quick overview of your residence details</p>
      </div>

      {/* Card */}
      <div className="resident-card">
        <div className="resident-info">
          <div className="info-item">
            <div className="info-label">House No</div>
            <div className="info-value">{profile.house_no}</div>
          </div>

          <div className="info-item">
            <div className="info-label">Phone</div>
            <div className="info-value">{profile.phone}</div>
          </div>

          <div className="info-item">
            <div className="info-label">Move-in Date</div>
            <div className="info-value">{profile.move_in_date}</div>
          </div>

          <div className="info-item">
            <div className="info-label">Status</div>
            <span className="status-badge">{profile.status}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
