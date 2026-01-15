import { useEffect, useState } from "react";
import {
  getStaff,
  createStaff,
  updateStaff,
  deleteStaff,
} from "../services/staff.service";

export default function AdminStaff() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editing, setEditing] = useState(null);

  const [form, setForm] = useState({
    name: "",
    role: "",
    phone: "",
    status: "Active",
  });

  /* ================= LOAD ================= */
  const loadData = async () => {
    setLoading(true);
    try {
      const data = await getStaff();
      setList(data);
    } catch {
      alert("Failed to load staff");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  /* ================= CREATE ================= */
  const handleCreate = async () => {
    if (!form.name || !form.role || !form.phone) {
      alert("Fill all required fields");
      return;
    }

    setSaving(true);
    try {
      await createStaff(form);
      setForm({ name: "", role: "", phone: "", status: "Active" });
      loadData();
    } catch {
      alert("Failed to add staff");
    } finally {
      setSaving(false);
    }
  };

  /* ================= UPDATE ================= */
  const handleUpdate = async () => {
    try {
      await updateStaff(editing.id, editing);
      setEditing(null);
      loadData();
    } catch {
      alert("Failed to update staff");
    }
  };

  /* ================= DELETE ================= */
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this staff member?")) return;
    await deleteStaff(id);
    loadData();
  };

  return (
    <div className="dashboard-wrapper">
      <h1>Staff</h1>

      {/* ================= FORM ================= */}
      <div className="card form-card">
        <h3>Add Staff</h3>

        <div className="form-grid">
          <input
            placeholder="Name *"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          <input
            placeholder="Role (Watchman, Cleaner, etc.) *"
            value={form.role}
            onChange={(e) => setForm({ ...form, role: e.target.value })}
          />

          <input
            placeholder="Phone *"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />

          <select
            value={form.status}
            onChange={(e) => setForm({ ...form, status: e.target.value })}
          >
            <option>Active</option>
            <option>Inactive</option>
          </select>
        </div>

        <button className="primary-btn" onClick={handleCreate} disabled={saving}>
          {saving ? "Saving..." : "Add Staff"}
        </button>
      </div>

      {/* ================= TABLE ================= */}
      <div className="card table-card">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>S.No</th>
                <th>Name</th>
                <th>Role</th>
                <th>Phone</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {list.map((s, i) => (
                <tr key={s.id}>
                  <td>{i + 1}</td>
                  <td>{s.name}</td>
                  <td>{s.role}</td>
                  <td>{s.phone}</td>
                  <td>
                    <span className={`badge ${s.status === "Active" ? "active" : "inactive"}`}>
                      {s.status}
                    </span>
                  </td>
                  <td>
                    <button className="edit-btn" onClick={() => setEditing(s)}>
                      Edit
                    </button>
                    <button className="delete-btn" onClick={() => handleDelete(s.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* ================= EDIT MODAL ================= */}
      {editing && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Edit Staff</h3>

            <input
              value={editing.name}
              onChange={(e) => setEditing({ ...editing, name: e.target.value })}
            />
            <input
              value={editing.role}
              onChange={(e) => setEditing({ ...editing, role: e.target.value })}
            />
            <input
              value={editing.phone}
              onChange={(e) => setEditing({ ...editing, phone: e.target.value })}
            />

            <select
              value={editing.status}
              onChange={(e) => setEditing({ ...editing, status: e.target.value })}
            >
              <option>Active</option>
              <option>Inactive</option>
            </select>

            <div className="modal-actions">
              <button className="primary-btn" onClick={handleUpdate}>
                Save
              </button>
              <button className="secondary-btn" onClick={() => setEditing(null)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
