import { supabase } from "../lib/supabaseClient";

/* ===============================
   GET STAFF
================================ */
export async function getStaff() {
  const { data, error } = await supabase
    .from("staff")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
}

/* ===============================
   CREATE STAFF
================================ */
export async function createStaff(payload) {
  const { error } = await supabase.from("staff").insert({
    name: payload.name,
    role: payload.role,
    phone: payload.phone,
    status: payload.status,
  });

  if (error) throw error;
}

/* ===============================
   UPDATE STAFF
================================ */
export async function updateStaff(id, payload) {
  const { error } = await supabase
    .from("staff")
    .update({
      name: payload.name,
      role: payload.role,
      phone: payload.phone,
      status: payload.status,
    })
    .eq("id", id);

  if (error) throw error;
}

/* ===============================
   DELETE STAFF
================================ */
export async function deleteStaff(id) {
  const { error } = await supabase
    .from("staff")
    .delete()
    .eq("id", id);

  if (error) throw error;
}
