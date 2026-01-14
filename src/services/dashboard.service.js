import { supabase } from "../lib/supabaseClient";

/* ---------------- ADMIN DASHBOARD ---------------- */

export async function getAdminDashboardStats() {
  const [
    { count: residentCount },
    { count: houseCount }
  ] = await Promise.all([
    supabase.from("residents").select("*", { count: "exact", head: true }),
    supabase.from("houses").select("*", { count: "exact", head: true }),
  ]);

  return {
    residents: residentCount || 0,
    houses: houseCount || 0,
    amenities: 30, // static for now
    pendingReports: 0,
    expenses: 3950,
    income: 33500,
  };
}

/* ---------------- RESIDENT DASHBOARD ---------------- */

export async function getResidentDashboard(userId) {
  const { data, error } = await supabase
    .from("residents")
    .select(`
      profile,
      houses ( house_no )
    `)
    .eq("user_id", userId)
    .single();

  if (error) throw error;

  return {
    name: data.profile.name,
    phone: data.profile.phone,
    status: data.profile.status,
    houseNo: data.houses.house_no,
  };
}
