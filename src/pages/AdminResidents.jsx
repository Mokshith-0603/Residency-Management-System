import { useEffect, useState } from "react";
import {
  getResidents,
  addResident,
  updateResident,
  deleteResident,
} from "../services/residents.service";

export default function AdminResidents() {
  const [residents, setResidents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);

  /* ===========================
     CREATE FORM
  ============================ */
  const [form, setForm] = useState({
    name: "",
    house_no: "",
    phone: "",
    email: "",
    password: "",
    move_in_date: "",
    status: "Active",
  });

  /* ===========================
     EDIT STATE
  ============================ */
  const [editing, setEditing] = useState(null);

  /* ===========================
     LOAD RESIDENTS
  ============================ */
  const loadResidents = async () => {
    setLoading(true);
    try {
      const data = await getResidents();
      const sorted = [...data].sort(
        (a, b) => Number(a.house_no ?? 0) - Number(b.house_no ?? 0)
      );
      setResidents(sorted);
    } catch {
      alert("Failed to load residents");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadResidents();
  }, []);

  /* ===========================
     CREATE
  ============================ */
  const handleCreate = async () => {
    if (creating) return;

    if (!form.name || !form.house_no || !form.phone || !form.email || !form.password) {
      alert("Please fill all required fields");
      return;
    }

    setCreating(true);
    try {
      await addResident(form);
      setForm({
        name: "",
        house_no: "",
        phone: "",
        email: "",
        password: "",
        move_in_date: "",
        status: "Active",
      });
      await loadResidents();
    } catch (err) {
      alert(err.message || "Failed to create resident");
    } finally {
      setCreating(false);
    }
  };

  /* ===========================
     UPDATE (FIXED)
  ============================ */
  const handleUpdate = async () => {
    if (!editing.name || !editing.house_no || !editing.phone) {
      alert("Required fields missing");
      return;
    }

    try {
      await updateResident(editing.id, {
        name: editing.name,
        house_no: Number(editing.house_no),
        phone: editing.phone,
        move_in_date: editing.move_in_date || null,
        status: editing.status,
      });

      setEditing(null);
      loadResidents();
    } catch (err) {
      alert(err.message || "Failed to update resident");
    }
  };

  /* ===========================
     DELETE
  ============================ */
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this resident?")) return;
    await deleteResident(id);
    loadResidents();
  };

  /* ===========================
     UI
  ============================ */
  return (
    <div className="dashboard-wrapper">
      <h1>Residents</h1>

      {/* ADD */}
      <div className="card form-card">
        <h3>Add New Resident</h3>

        <div className="form-grid">
          <input placeholder="Name *" value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })} />

          <input placeholder="House No *" value={form.house_no}
            onChange={(e) => setForm({ ...form, house_no: e.target.value })} />

          <input placeholder="Phone *" value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })} />

          <input placeholder="Email *" value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })} />

          <input type="password" placeholder="Password *" value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })} />

          <input type="date" value={form.move_in_date}
            onChange={(e) => setForm({ ...form, move_in_date: e.target.value })} />

          <select value={form.status}
            onChange={(e) => setForm({ ...form, status: e.target.value })}>
            <option>Active</option>
            <option>Inactive</option>
          </select>
        </div>

        <button className="primary-btn" onClick={handleCreate} disabled={creating}>
          {creating ? "Creating..." : "Create Resident"}
        </button>
      </div>

      {/* TABLE */}
      <div className="card table-card">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>S.No</th>
                <th>Name</th>
                <th>House No</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Move-in</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {residents.map((r, i) => (
                <tr key={r.id}>
                  <td>{i + 1}</td>
                  <td>{r.name}</td>
                  <td>{r.house_no}</td>
                  <td>{r.phone}</td>
                  <td>{r.email || "—"}</td>
                  <td>{r.move_in_date || "—"}</td>
                  <td>
                    <span className={`badge ${r.status === "Active" ? "active" : "inactive"}`}>
                      {r.status}
                    </span>
                  </td>
                  <td>
                    <button className="edit-btn" onClick={() =>
                      setEditing({
                        id: r.id,
                        name: r.name,
                        house_no: r.house_no,
                        phone: r.phone,
                        move_in_date: r.move_in_date,
                        status: r.status,
                      })
                    }>
                      Edit
                    </button>
                    <button className="delete-btn" onClick={() => handleDelete(r.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* EDIT MODAL */}
      {editing && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Edit Resident</h3>

            <input value={editing.name}
              onChange={(e) => setEditing({ ...editing, name: e.target.value })} />

            <input value={editing.house_no}
              onChange={(e) => setEditing({ ...editing, house_no: e.target.value })} />

            <input value={editing.phone}
              onChange={(e) => setEditing({ ...editing, phone: e.target.value })} />

            <input type="date" value={editing.move_in_date || ""}
              onChange={(e) => setEditing({ ...editing, move_in_date: e.target.value })} />

            <select value={editing.status}
              onChange={(e) => setEditing({ ...editing, status: e.target.value })}>
              <option>Active</option>
              <option>Inactive</option>
            </select>

            <div className="modal-actions">
              <button className="primary-btn" onClick={handleUpdate}>Save</button>
              <button className="secondary-btn" onClick={() => setEditing(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
