import { useEffect, useState } from "react";
import { getResidentsDirectory } from "../../services/residents.service";

export default function ResidentsDirectory() {
  const [residents, setResidents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getResidentsDirectory()
      .then(setResidents)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading residents...</p>;

  return (
    <div className="directory-page">
  <h1 className="directory-title">Residents Directory</h1>

  <div className="directory-table-wrapper">
    <table className="directory-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>House No</th>
          <th>Phone</th>
          <th>Move-in Date</th>
          <th>Status</th>
        </tr>
      </thead>

      <tbody>
        {residents.map((r) => (
          <tr key={r.id}>
            <td data-label="Name" className="resident-name">{r.name}</td>
            <td data-label="House No">{r.house_no}</td>
            <td data-label="Phone">{r.phone}</td>
            <td data-label="Move-in Date">{r.move_in_date}</td>
            <td data-label="Status">
              <span
                className={`status-pill ${
                  r.status === "Active"
                    ? "status-active"
                    : "status-inactive"
                }`}
              >
                {r.status}
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>

  );
}
