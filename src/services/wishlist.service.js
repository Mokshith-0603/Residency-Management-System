import { supabase } from "../lib/supabaseClient";

/* =========================
   GET ALL WISHLIST ITEMS
========================= */
export async function getWishlist() {
  const { data, error } = await supabase
    .from("wishlist")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
}

/* =========================
   ADD ITEM
========================= */
export async function addWishlistItem(item) {
  const { error } = await supabase
    .from("wishlist")
    .insert(item);

  if (error) throw error;
}

/* =========================
   DELETE ITEM
========================= */
export async function deleteWishlistItem(id) {
  const { error } = await supabase
    .from("wishlist")
    .delete()
    .eq("id", id);

  if (error) throw error;
}
