import { useState } from "react";
import { addExpense } from "../services/expense.service";

export default function Expenses({ month, year, reload, expenses }) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");

  const submit = async () => {
    if (!title || !amount) return;

    const today = new Date();

    await addExpense({
      title,
      amount: Number(amount),
      date: today.toISOString().split("T")[0],
      month: today.getMonth() + 1,
      year: today.getFullYear()
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

      {/* EXPENSE TABLE */}
      <table className="table" style={{ marginTop: "15px" }}>
        <thead>
          <tr>
            <th>Title</th>
            <th>Amount</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {expenses.length === 0 && (
            <tr>
              <td colSpan="3">No expenses added</td>
            </tr>
          )}

          {expenses.map(e => (
            <tr key={e.id}>
              <td>{e.title}</td>
              <td>₹ {e.amount}</td>
              <td>{e.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}