import { supabase } from "../lib/supabaseClient";

/* ===============================
   GET EVENTS
================================ */
export async function getEvents() {
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .order("event_date", { ascending: true });

  if (error) throw error;
  return data;
}

/* ===============================
   CREATE EVENT
================================ */
export async function createEvent(form) {
  const payload = {
    title: form.title,
    description: form.description || null,
    location: form.location || null,
    event_date: form.date,
    event_time: form.time,
  };

  const { error } = await supabase.from("events").insert(payload);

  if (error) {
    console.error("Create event error:", error);
    throw error;
  }
}

/* ===============================
   DELETE EVENT
================================ */
export async function deleteEvent(id) {
  const { error } = await supabase.from("events").delete().eq("id", id);
  if (error) throw error;
}
