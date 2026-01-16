export default function MonthSelector({ month, year, setMonth, setYear }) {
  return (
    <div className="section-card">
      <div className="form-row">
        <select value={month} onChange={e => setMonth(+e.target.value)}>
          {[...Array(12)].map((_, i) => (
            <option key={i} value={i + 1}>
              Month {i + 1}
            </option>
          ))}
        </select>

        <select value={year} onChange={e => setYear(+e.target.value)}>
          {[2024, 2025, 2026, 2027].map(y => (
            <option key={y} value={y}>{y}</option>
          ))}
        </select>
      </div>
    </div>
  );
}
