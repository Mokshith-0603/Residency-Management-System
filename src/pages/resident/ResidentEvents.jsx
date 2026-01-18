import { useEffect, useState } from "react";
import { getEvents } from "../../services/events.service";

export default function ResidentEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getEvents()
      .then(setEvents)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading events...</p>;

  if (events.length === 0) {
    return <p>No upcoming events.</p>;
  }

  return (
    <div className="page">
      <h2>Community Events</h2>

      {events.map((e) => (
        <div key={e.id} className="card">
          <h4>{e.title}</h4>
          <p>{e.description}</p>

          <div className="event-meta">
            <span>📅 {e.event_date}</span>
            {e.location && <span>📍 {e.location}</span>}
          </div>
        </div>
      ))}
    </div>
  );
}
