export default function SummaryCards({ income, expense }) {
  return (
    <div className="section-card">
      <h3>Summary</h3>

      <div className="summary-grid">
        <div className="summary-card">
          <h4>Total Income</h4>
          <p>₹ {income}</p>
        </div>

        <div className="summary-card">
          <h4>Total Expense</h4>
          <p>₹ {expense}</p>
        </div>

        <div className="summary-card">
          <h4>Balance</h4>
          <p>₹ {income - expense}</p>
        </div>
      </div>
    </div>
  );
}
