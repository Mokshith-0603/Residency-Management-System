import { useEffect, useState, useCallback } from "react";
import dayjs from "dayjs";
import "../styles/maintenance.css";


/* ================= COMPONENTS ================= */
import MonthSelector from "../components/MonthSelector";
import MaintenanceTable from "../components/MaintenanceTable";
import Receivables from "../components/Receivables";
import OtherIncome from "../components/OtherIncome";
import Expenses from "../components/Expenses";
import SummaryCards from "../components/SummaryCards";
import Charts from "../components/Charts";

/* ================= SERVICES ================= */
import {
  getBillsByMonthYear,
  getReceivables,
  generateMonthlyBills
} from "../services/maintenance.service";

import { getOtherIncome } from "../services/income.service";
import { getExpenses } from "../services/expense.service";

/* ================= UTILS ================= */
import { generateMaintenancePDF } from "../utils/pdfGenerator";

export default function AdminMaintenance() {
  /* ================= DATE STATE ================= */
  const [month, setMonth] = useState(dayjs().month() + 1);
  const [year, setYear] = useState(dayjs().year());

  /* ================= DATA STATE ================= */
  const [bills, setBills] = useState([]);
  const [receivables, setReceivables] = useState([]);
  const [otherIncome, setOtherIncome] = useState([]);
  const [expenses, setExpenses] = useState([]);

  const [loading, setLoading] = useState(false);

  /* =================================================
     LOAD ALL DATA (MEMOIZED – IMPORTANT)
  ================================================= */
  const loadData = useCallback(async () => {
    try {
      setLoading(true);

      const [
        billsRes,
        receivableRes,
        otherIncomeRes,
        expensesRes
      ] = await Promise.all([
        getBillsByMonthYear(month, year),
        getReceivables(month, year),
        getOtherIncome(month, year),
        getExpenses(month, year)
      ]);

      setBills(billsRes?.data || []);
      setReceivables(receivableRes?.data || []);
      setOtherIncome(otherIncomeRes?.data || []);
      setExpenses(expensesRes?.data || []);
    } catch (error) {
      console.error("Failed to load maintenance data:", error);
    } finally {
      setLoading(false);
    }
  }, [month, year]);

  /* =================================================
     ENSURE MONTHLY BILLS EXIST (RUNS FIRST)
     - DB unique constraint prevents duplicates
  ================================================= */
  const ensureMonthlyBills = useCallback(async () => {
    try {
      await generateMonthlyBills(month, year, 2000); // default amount
    } catch (error) {
      console.warn("Monthly bills generation skipped:", error);
    }
  }, [month, year]);

  /* =================================================
     EFFECT: MONTH / YEAR CHANGE
  ================================================= */
  useEffect(() => {
    const init = async () => {
      await ensureMonthlyBills();
      await loadData();
    };

    init();
  }, [ensureMonthlyBills, loadData]);

  /* =================================================
     CALCULATIONS
  ================================================= */
  const maintenanceIncome = bills.reduce(
    (sum, bill) =>
      bill.status !== "UNPAID" ? sum + Number(bill.amount) : sum,
    0
  );

  const otherIncomeTotal = otherIncome.reduce(
    (sum, income) => sum + Number(income.amount),
    0
  );

  const totalIncome = maintenanceIncome + otherIncomeTotal;

  const totalExpense = expenses.reduce(
    (sum, expense) => sum + Number(expense.amount),
    0
  );

  /* =================================================
     UI
  ================================================= */
  return (
    <div className="admin-container">
      <h2>Maintenance & Expense Tracker</h2>

      <MonthSelector
        month={month}
        year={year}
        setMonth={setMonth}
        setYear={setYear}
      />

      {loading ? (
        <p>Loading data...</p>
      ) : (
        <>
          {/* ================= MAINTENANCE ================= */}
          <MaintenanceTable bills={bills} reload={loadData} />

          {/* ================= RECEIVABLES ================= */}
          <Receivables receivables={receivables} />

          {/* ================= OTHER INCOME ================= */}
          <OtherIncome
            month={month}
            year={year}
            reload={loadData}
          />

          {/* ================= EXPENSES ================= */}
          <Expenses
            month={month}
            year={year}
            reload={loadData}
          />

          {/* ================= SUMMARY ================= */}
          <SummaryCards
            income={totalIncome}
            expense={totalExpense}
          />

          {/* ================= ANALYTICS ================= */}
          <Charts
            bills={bills}
            otherIncome={otherIncome}
            expenses={expenses}
            year={year}
          />

          {/* ================= PDF EXPORT ================= */}
          <button
            style={{ marginTop: "20px" }}
            onClick={() =>
              generateMaintenancePDF({
                month,
                year,
                maintenanceBills: bills,
                otherIncome,
                expenses,
                totals: {
                  income: totalIncome,
                  expense: totalExpense
                }
              })
            }
          >
            Download PDF
          </button>
        </>
      )}
    </div>
  );
}
