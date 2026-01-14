import { supabase } from "../lib/supabaseClient";

export async function getMyResidentProfile(userId) {
  if (!userId) return null;

  const { data, error } = await supabase
    .from("residents")
    .select(`
      id,
      profile,
      houses:houses!residents_house_id_fkey (
        house_no
      )
    `)
    .eq("user_id", userId)
    .maybeSingle(); // ✅ IMPORTANT

  if (error) {
    console.error("Resident fetch failed:", error);
    throw error;
  }

  // ✅ No resident record yet
  if (!data) return null;

  return data;
}
