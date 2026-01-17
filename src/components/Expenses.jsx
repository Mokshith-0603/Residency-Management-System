import { useState } from "react";
import { addExpense } from "../services/expense.service";

export default function Expenses({ month, year, reload }) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");

  const submit = async () => {
    if (!title || !amount) return;

    await addExpense({
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
      <h3>Expenses</h3>

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
        <button className="btn btn-danger" onClick={submit}>
          Add Expense
        </button>
      </div>
    </div>
  );
}
