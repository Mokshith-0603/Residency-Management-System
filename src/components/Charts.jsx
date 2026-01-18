import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement,
  Tooltip,
  Legend,
  LineElement,
  PointElement
} from "chart.js";
import { Bar, Pie, Line } from "react-chartjs-2";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement,
  Tooltip,
  Legend,
  LineElement,
  PointElement
);

export default function Charts({ bills, otherIncome, expenses, year }) {
  /* ================= CALCULATIONS ================= */

  const maintenanceIncome = bills.reduce(
    (sum, b) => sum + (b.status !== "UNPAID" ? Number(b.amount) : 0),
    0
  );

  const otherIncomeTotal = otherIncome.reduce(
    (sum, i) => sum + Number(i.amount),
    0
  );

  const expenseTotal = expenses.reduce(
    (sum, e) => sum + Number(e.amount),
    0
  );

  /* ================= BAR ================= */

  const incomeExpenseData = {
    labels: ["Income", "Expense"],
    datasets: [
      {
        label: "Amount (₹)",
        data: [maintenanceIncome + otherIncomeTotal, expenseTotal],
        backgroundColor: ["#8b5e3c", "#e76f51"],
        borderRadius: 6
      }
    ]
  };

  /* ================= PIE ================= */

  const paymentStatusData = {
    labels: ["Paid (UPI)", "Paid (Cash)", "Unpaid"],
    datasets: [
      {
        data: [
          bills.filter(b => b.status === "PAID").length,
          bills.filter(b => b.status === "CASH").length,
          bills.filter(b => b.status === "UNPAID").length
        ],
        backgroundColor: ["#8b5e3c", "#2a9d8f", "#e76f51"],
        borderWidth: 0
      }
    ]
  };

  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          boxWidth: 14,
          padding: 12
        }
      }
    }
  };

  /* ================= LINE ================= */

  const monthlyExpenseMap = {};
  expenses.forEach(e => {
    monthlyExpenseMap[e.month] =
      (monthlyExpenseMap[e.month] || 0) + Number(e.amount);
  });

  const yearlyExpenseData = {
    labels: Array.from({ length: 12 }, (_, i) => `M${i + 1}`),
    datasets: [
      {
        label: `Expenses ${year}`,
        data: Array.from(
          { length: 12 },
          (_, i) => monthlyExpenseMap[i + 1] || 0
        ),
        borderColor: "#264653",
        backgroundColor: "rgba(38,70,83,0.15)",
        tension: 0.35,
        fill: true,
        pointRadius: 4
      }
    ]
  };

  /* ================= UI ================= */

  return (
    <div className="section-card">
      <h3>Analytics</h3>

      {/* 🔥 PERFECTLY BALANCED BAR + PIE */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "30px",
          alignItems: "center",
          marginTop: "20px"
        }}
      >
        {/* BAR */}
        <div style={{ height: "300px" }}>
          <Bar data={incomeExpenseData} />
        </div>

        {/* PIE */}
        <div style={{ height: "300px" }}>
          <Pie data={paymentStatusData} options={pieOptions} />
        </div>
      </div>

      {/* 📈 YEARLY EXPENSE */}
      <div style={{ marginTop: "40px" }}>
        <Line data={yearlyExpenseData} />
      </div>
    </div>
  );
}
