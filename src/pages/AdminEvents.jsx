import { useEffect, useState } from "react";
import {
  getEvents,
  createEvent,
  deleteEvent,
} from "../services/events.service";

export default function AdminEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);

  const [form, setForm] = useState({
    title: "",
    date: "",
    time: "",
    location: "",
    description: "",
  });

  const loadEvents = async () => {
    setLoading(true);
    try {
      const data = await getEvents();
      setEvents(data);
    } catch {
      alert("Failed to load events");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEvents();
  }, []);

  const handleCreate = async () => {
    if (!form.title || !form.date || !form.time) {
      alert("Title, Date and Time are required");
      return;
    }

    setCreating(true);
    try {
      await createEvent(form);
      setForm({
        title: "",
        date: "",
        time: "",
        location: "",
        description: "",
      });
      loadEvents();
    } catch {
      alert("Failed to create event");
    } finally {
      setCreating(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this event?")) return;
    await deleteEvent(id);
    loadEvents();
  };

  return (
    <div className="dashboard-wrapper">
      <h1>Events</h1>

      <div className="card form-card">
        <h3>Create Event</h3>

        <div className="form-grid">
          <input
            placeholder="Event Title *"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />

          <input
            type="date"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
          />

          <input
            type="time"
            value={form.time}
            onChange={(e) => setForm({ ...form, time: e.target.value })}
          />

          <input
            placeholder="Location"
            value={form.location}
            onChange={(e) => setForm({ ...form, location: e.target.value })}
          />

          <textarea
            rows="3"
            style={{ borderRadius: "16px", padding: "7px" }}
            placeholder="Event description"
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
          />
        </div>

        <button
          className="primary-btn"
          onClick={handleCreate}
          disabled={creating}
        >
          {creating ? "Creating..." : "Create Event"}
        </button>
      </div>

      <div className="card table-card">
        {loading ? (
          <p>Loading...</p>
        ) : events.length === 0 ? (
          <p>No events scheduled</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Date</th>
                <th>Time</th>
                <th>Location</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {events.map((e) => (
                <tr key={e.id}>
                  <td>{e.title}</td>
                  <td>{e.event_date}</td>
                  <td>{e.event_time}</td>
                  <td>{e.location || "—"}</td>
                  <td>
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(e.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
