export default function Receivables({ receivables }) {
  return (
    <div className="section-card">
      <h3>Receivables</h3>

      {receivables.length === 0 ? (
        <p>No pending payments 🎉</p>
      ) : (
        receivables.map(r => (
          <div key={r.id} className="receivable-item">
            {r.residents.name} | House {r.residents.house_no} | ₹{r.amount}
          </div>
        ))
      )}
    </div>
  );
}
