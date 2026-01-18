export default function MonthSelector({ month, year, setMonth, setYear }) {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];

  const years = Array.from(
    { length: 2035 - 2024 + 1 },
    (_, i) => 2024 + i
  );

  return (
    <div className="section-card">
      <div className="form-row">
        <select value={month} onChange={e => setMonth(+e.target.value)}>
          {months.map((name, index) => (
            <option key={index} value={index + 1}>
              {name}
            </option>
          ))}
        </select>

        <select value={year} onChange={e => setYear(+e.target.value)}>
          {years.map(y => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
