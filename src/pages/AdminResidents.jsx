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

  const [form, setForm] = useState({
    name: "",
    house_no: "",
    phone: "",
    move_in_date: "",
    status: "Active",
  });

  const [editing, setEditing] = useState(null);

  /* ===========================
     LOAD RESIDENTS
  ============================ */
  const loadResidents = async () => {
    setLoading(true);
    try {
      const data = await getResidents();
      const sorted = [...data].sort(
        (a, b) => Number(a.house_no) - Number(b.house_no)
      );
      setResidents(sorted);
    } catch (err) {
      console.error(err);
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
    try {
      await addResident(form);
      setForm({
        name: "",
        house_no: "",
        phone: "",
        move_in_date: "",
        status: "Active",
      });
      loadResidents();
    } catch (err) {
      alert(err.message);
    }
  };

  /* ===========================
     UPDATE
  ============================ */
  const handleUpdate = async () => {
    try {
      await updateResident(editing.id, editing);
      setEditing(null);
      loadResidents();
    } catch (err) {
      alert(err.message);
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
          <input placeholder="Name" value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <input placeholder="House No" value={form.house_no}
            onChange={(e) => setForm({ ...form, house_no: e.target.value })} />
          <input placeholder="Phone" value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })} />
          <input type="date" value={form.move_in_date}
            onChange={(e) => setForm({ ...form, move_in_date: e.target.value })} />
          <select value={form.status}
            onChange={(e) => setForm({ ...form, status: e.target.value })}>
            <option>Active</option>
            <option>Inactive</option>
          </select>
        </div>
        <button className="primary-btn" onClick={handleCreate}>
          Create Resident
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
                  <td>{r.house_no ?? "—"}</td>
                  <td>{r.phone}</td>
                  <td>{r.move_in_date || "—"}</td>
                  <td>
                    <span className={`badge ${r.status === "Active" ? "active" : "inactive"}`}>
                      {r.status}
                    </span>
                  </td>
                  <td>
                    <button className="edit-btn" onClick={() => setEditing(r)}>
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
              <button className="primary-btn" onClick={handleUpdate}>
                Save Changes
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
