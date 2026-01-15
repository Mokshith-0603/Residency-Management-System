import { supabase } from "../lib/supabaseClient";

/* ===============================
   GET ALL ANNOUNCEMENTS
================================ */
export async function getAnnouncements() {
  const { data, error } = await supabase
    .from("announcements")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
}

/* ===============================
   CREATE ANNOUNCEMENT / MOM
================================ */
export async function createAnnouncement(payload) {
  const { error } = await supabase.from("announcements").insert({
    title: payload.title,
    description: payload.description,
    type: payload.type, // ANNOUNCEMENT | MOM
  });

  if (error) throw error;
}

/* ===============================
   DELETE ANNOUNCEMENT
================================ */
export async function deleteAnnouncement(id) {
  const { error } = await supabase
    .from("announcements")
    .delete()
    .eq("id", id);

  if (error) throw error;
}
