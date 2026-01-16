import { supabase } from "../lib/supabaseClient";

/**
 * Create a new complaint by logged-in resident
 */
export async function createComplaint({ category, description }) {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Not authenticated");
  }

  const { data: resident, error: residentError } = await supabase
    .from("residents")
    .select("id")
    .eq("user_id", user.id)
    .single();

  if (residentError || !resident) {
    throw new Error("Resident profile not found");
  }

  const { error } = await supabase.from("complaints").insert({
    resident_id: resident.id,
    category,
    description,
    status: "OPEN",
  });

  if (error) {
    throw error;
  }
}
