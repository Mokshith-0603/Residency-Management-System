import { useState } from "react";
import { createComplaint } from "../../services/complaints.service";

export default function Complaints() {
  const [description, setDescription] = useState("");

  const submit = async () => {
    await createComplaint({ description });
    setDescription("");
    alert("Issue reported");
  };

  return (
    <div className="page">
      <h2>Report an Issue</h2>

      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Describe your issue"
      />

      <button onClick={submit}>Submit</button>
    </div>
  );
}
