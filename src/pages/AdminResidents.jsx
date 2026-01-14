import { useEffect, useState } from "react";
import {
  getAllResidents,
  deleteResident,
  updateResident,
} from "../services/residents.service";

export default function AdminResidents() {
  const [residents, setResidents] = useState([]);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const data = await getAllResidents();
    setResidents(data);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this resident?")) return;
    await deleteResident(id);
    load();
  };

  return (
    <div>
      <h2>Residents</h2>

      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>House</th>
            <th>Phone</th>
            <th>Move-in</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {residents.map((r) => (
            <tr key={r.id}>
              <td>{r.profile.name}</td>
              <td>{r.houses?.house_no}</td>
              <td>{r.profile.phone}</td>
              <td>{r.profile.move_in_date}</td>
              <td>{r.profile.status}</td>
              <td>
                <button className="btn-edit">Edit</button>
                <button
                  className="btn-delete"
                  onClick={() => handleDelete(r.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
