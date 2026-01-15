import { useEffect, useState } from "react";
import {
  getAnnouncements,
  createAnnouncement,
  deleteAnnouncement,
} from "../services/announcements.service";

export default function AdminAnnouncements() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [posting, setPosting] = useState(false);

  const [form, setForm] = useState({
    title: "",
    description: "",
    type: "ANNOUNCEMENT",
  });

  /* ================= LOAD ================= */
  const loadData = async () => {
    setLoading(true);
    try {
      const data = await getAnnouncements();
      setList(data);
    } catch {
      alert("Failed to load announcements");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  /* ================= CREATE ================= */
  const handlePost = async () => {
    if (!form.title || !form.description) {
      alert("Please fill all fields");
      return;
    }

    setPosting(true);
    try {
      await createAnnouncement(form);
      setForm({ title: "", description: "", type: "ANNOUNCEMENT" });
      await loadData();
    } catch {
      alert("Failed to post");
    } finally {
      setPosting(false);
    }
  };

  /* ================= DELETE ================= */
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this post?")) return;
    await deleteAnnouncement(id);
    loadData();
  };

  return (
    <div className="dashboard-wrapper">
      <h1>Announcements</h1>

      {/* ================= FORM ================= */}
      <div className="card form-card">
        <h3>Create Announcement / Minutes of Meeting</h3>

        <div className="form-grid">
          <input
            placeholder="Title *"
            value={form.title}
            onChange={(e) =>
              setForm({ ...form, title: e.target.value })
            }
          />

          <select
            value={form.type}
            onChange={(e) =>
              setForm({ ...form, type: e.target.value })
            }
          >
            <option value="ANNOUNCEMENT">Announcement</option>
            <option value="MOM">Minutes of Meeting</option>
          </select>

          <textarea
            rows="4"
            style={{ borderRadius: "16px", padding: "7px" }}
            placeholder={
              form.type === "MOM"
                ? "Enter meeting minutes..."
                : "Enter announcement description..."
            }
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
          />
        </div>

        <button
          className="primary-btn"
          onClick={handlePost}
          disabled={posting}
        >
          {posting ? "Posting..." : "Post"}
        </button>
      </div>

      {/* ================= LIST ================= */}
      <div className="announcement-list">
        {loading ? (
          <p>Loading...</p>
        ) : list.length === 0 ? (
          <p>No announcements yet</p>
        ) : (
          list.map((a) => (
            <div key={a.id} className="announcement-card">
              <div className="announcement-top">
                <h3 className="announcement-title">{a.title}</h3>

                <span
                  className={`announcement-badge ${
                    a.type === "MOM" ? "mom" : "ann"
                  }`}
                >
                  {a.type === "MOM"
                    ? "Minutes of Meeting"
                    : "Announcement"}
                </span>
              </div>

              <div className="announcement-divider" />

              <p className="announcement-body">
                {a.description}
              </p>

              <div className="announcement-footer">
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(a.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
