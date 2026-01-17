import { useState } from "react";
import { addOtherIncome } from "../services/income.service";

export default function OtherIncome({ month, year, reload }) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");

  const submit = async () => {
    if (!title || !amount) return;

    await addOtherIncome({
      title,
      amount: Number(amount),
      date: new Date(),
      month,
      year
    });

    setTitle("");
    setAmount("");
    reload();
  };

  return (
    <div className="section-card">
      <h3>Other Income</h3>

      <div className="form-row">
        <input
          placeholder="Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <input
          placeholder="Amount"
          type="number"
          value={amount}
          onChange={e => setAmount(e.target.value)}
        />
        <button className="btn btn-primary" onClick={submit}>
          Add
        </button>
      </div>
    </div>
  );
}
