import { useEffect, useState } from "react";
import { getAnnouncements } from "../../services/announcements.service";

export default function ResidentAnnouncements() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAnnouncements()
      .then(setItems)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <p>Loading announcements...</p>;
  }

  if (items.length === 0) {
    return <p>No announcements available.</p>;
  }

  return (
    <div className="page">
      <h2>Announcements</h2>

      {items.map((a) => (
        <div key={a.id} className="card">
          <h4>{a.title}</h4>

          {/* ✅ FIXED HERE */}
          <p>{a.description}</p>

          
        </div>
      ))}
    </div>
  );
}
