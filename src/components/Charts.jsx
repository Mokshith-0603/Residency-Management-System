import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  Filler
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
  PointElement,
  Filler
);

export default function Charts({ bills, otherIncome, expenses, year }) {
  /* ================= CALCULATIONS ================= */

  // ✅ COUNT ONLY ACTUAL PAYMENTS
  const maintenanceIncome = bills.reduce(
    (sum, b) =>
      b.status === "PAID" || b.status === "CASH"
        ? sum + Number(b.amount)
        : sum,
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

  /* ================= PIE ================= */

const paidUpi = bills.filter(
  b => b.status === "PAID" && b.payment_mode === "UPI"
).length;

const paidCash = bills.filter(
  b => b.status === "PAID" && b.payment_mode === "CASH"
).length;

const initiated = bills.filter(
  b => b.status === "PAYMENT_INITIATED"
).length;

const unpaid = bills.filter(
  b => b.status === "UNPAID"
).length;

const paymentStatusData = {
  labels: ["Paid (UPI)", "Paid (Cash)", "Payment Initiated", "Unpaid"],
  datasets: [
    {
      data: [paidUpi, paidCash, initiated, unpaid],
      backgroundColor: ["#8b5e3c", "#2a9d8f", "#3a86ff", "#e76f51"],
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

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "30px",
          alignItems: "center",
          marginTop: "20px"
        }}
      >
        <div style={{ height: "300px" }}>
          <Bar data={incomeExpenseData} />
        </div>

        <div style={{ height: "300px" }}>
          <Pie data={paymentStatusData} options={pieOptions} />
        </div>
      </div>

      <div style={{ marginTop: "40px" }}>
        <Line data={yearlyExpenseData} />
      </div>
    </div>
  );
}
