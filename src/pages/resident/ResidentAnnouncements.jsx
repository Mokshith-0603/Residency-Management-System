import { useEffect, useState } from "react";
import { getAnnouncements } from "../../services/announcements.service";

export default function Announcements() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    getAnnouncements().then(setItems);
  }, []);

  return (
    <div className="page">
      <h2>Announcements</h2>
      {items.map((a) => (
        <div key={a.id} className="card">
          <h4>{a.title}</h4>
          <p>{a.content}</p>
        </div>
      ))}
    </div>
  );
}
