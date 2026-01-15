import { supabase } from "../lib/supabaseClient";

/* ===============================
   ADMIN: GET ALL RESIDENTS
================================ */
export async function getResidents() {
  const { data, error } = await supabase
    .from("residents")
    .select(`
      id,
      name,
      phone,
      move_in_date,
      status,
      houses (
        unit_number
      )
    `)
    .order("unit_number", { foreignTable: "houses", ascending: true });

  if (error) throw error;

  return data.map((r) => ({
    id: r.id,
    name: r.name,
    phone: r.phone,
    move_in_date: r.move_in_date,
    status: r.status,
    house_no: r.houses?.unit_number ?? "—",
  }));
}

/* ===============================
   ADMIN: ADD RESIDENT
================================ */
export async function addResident(payload) {
  const houseNo = Number(payload.house_no);

  const { data: house, error: houseError } = await supabase
    .from("houses")
    .select("id")
    .eq("unit_number", houseNo)
    .single();

  if (houseError || !house) {
    throw new Error("House number not found");
  }

  const { error } = await supabase.from("residents").insert([
    {
      name: payload.name,
      house_id: house.id,
      phone: payload.phone,
      move_in_date: payload.move_in_date,
      status: payload.status,
    },
  ]);

  if (error) throw error;
}

/* ===============================
   ADMIN: UPDATE RESIDENT
================================ */
export async function updateResident(id, payload) {
  const houseNo = Number(payload.house_no);

  const { data: house, error: houseError } = await supabase
    .from("houses")
    .select("id")
    .eq("unit_number", houseNo)
    .single();

  if (houseError || !house) {
    throw new Error("House number not found");
  }

  const { error } = await supabase
    .from("residents")
    .update({
      name: payload.name,
      house_id: house.id,
      phone: payload.phone,
      move_in_date: payload.move_in_date,
      status: payload.status,
    })
    .eq("id", id);

  if (error) throw error;
}

/* ===============================
   ADMIN: DELETE RESIDENT
================================ */
export async function deleteResident(id) {
  const { error } = await supabase
    .from("residents")
    .delete()
    .eq("id", id);

  if (error) throw error;
}

/* ===============================
   RESIDENT: GET MY PROFILE
================================ */
export async function getMyResidentProfile(userId) {
  const { data, error } = await supabase
    .from("residents")
    .select(`
      id,
      name,
      phone,
      move_in_date,
      status,
      houses (
        unit_number
      )
    `)
    .eq("user_id", userId)
    .single();

  if (error) return null;

  return {
    ...data,
    house_no: data.houses?.unit_number ?? "—",
  };
}
