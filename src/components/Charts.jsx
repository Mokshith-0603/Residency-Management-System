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

  const incomeExpenseData = {
    labels: ["Income", "Expense"],
    datasets: [
      {
        label: "Amount (₹)",
        data: [maintenanceIncome + otherIncomeTotal, expenseTotal]
      }
    ]
  };

  const paymentStatusData = {
    labels: ["Paid (UPI)", "Paid (Cash)", "Unpaid"],
    datasets: [
      {
        data: [
          bills.filter(b => b.status === "PAID").length,
          bills.filter(b => b.status === "CASH").length,
          bills.filter(b => b.status === "UNPAID").length
        ]
      }
    ]
  };

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
        tension: 0.3
      }
    ]
  };

  return (
    <div className="section-card">
      <h3>Analytics</h3>

      <div className="charts-grid">
        <Bar data={incomeExpenseData} />
        <Pie data={paymentStatusData} />
      </div>

      <div style={{ marginTop: "30px" }}>
        <Line data={yearlyExpenseData} />
      </div>
    </div>
  );
}
