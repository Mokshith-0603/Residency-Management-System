import { supabase } from "../lib/supabaseClient";

/* ---------------- ADMIN DASHBOARD ---------------- */

export async function getAdminDashboardStats() {
  /* ================= COUNTS ================= */
  const [{ count: residentCount }] = await Promise.all([
    supabase.from("residents").select("*", { count: "exact", head: true })
  ]);

  /* ================= TOTAL INCOME ================= */
  const { data: incomeData } = await supabase
    .from("maintenance_bills")
    .select("amount")
    .eq("status", "PAID");

  const totalIncome =
    incomeData?.reduce((sum, i) => sum + Number(i.amount), 0) || 0;

  /* ================= TOTAL EXPENSE ================= */
  const { data: expenseData } = await supabase
    .from("expenses")
    .select("amount");

  const totalExpense =
    expenseData?.reduce((sum, e) => sum + Number(e.amount), 0) || 0;

  return {
    residents: residentCount || 0,
    houses: residentCount || 0, // house = resident as per your rule
    happyResidents: (residentCount || 0) * 5,
    amenities: 30,
    pendingReports: 0,
    expenses: totalExpense,
    income: totalIncome
  };
}

/* ---------------- RESIDENT DASHBOARD ---------------- */

export async function getResidentDashboard(userId) {
  const { data, error } = await supabase
    .from("residents")
    .select(`
      name,
      phone,
      status,
      houses ( unit_number )
    `)
    .eq("user_id", userId)
    .single();

  if (error || !data) return null;

  return {
    name: data.name,
    phone: data.phone,
    status: data.status,
    houseNo: data.houses?.unit_number ?? "—"
  };
}
