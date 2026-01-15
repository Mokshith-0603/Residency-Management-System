import { supabase } from "../lib/supabaseClient";

/* ================= GET ================= */
export async function getListings() {
  const { data, error } = await supabase
    .from("listings")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
}

/* ================= CREATE ================= */
export async function createListing(payload) {
  const { error } = await supabase.from("listings").insert({
    title: payload.title,
    type: payload.type,
    price: Number(payload.price),
    owner_name: payload.owner_name,
    contact: payload.contact,
    description: payload.description || null,
  });

  if (error) throw error;
}

/* ================= DELETE ================= */
export async function deleteListing(id) {
  const { error } = await supabase
    .from("listings")
    .delete()
    .eq("id", id);

  if (error) throw error;
}
