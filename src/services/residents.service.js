import { supabase, supabaseNoSession } from "../lib/supabaseClient";

/* ===============================
   GET ALL RESIDENTS (ADMIN)
================================ */
export async function getResidents() {
  const { data, error } = await supabase
    .from("residents")
    .select(`
      id,
      name,
      email,
      phone,
      move_in_date,
      status,
      user_id,
      houses (
        unit_number
      )
    `)
    .order("unit_number", {
      foreignTable: "houses",
      ascending: true,
    });

  if (error) throw error;

  return data.map((r) => ({
    id: r.id,
    name: r.name,
    email: r.email,
    phone: r.phone,
    move_in_date: r.move_in_date,
    status: r.status,
    user_id: r.user_id,
    house_no: r.houses?.unit_number ?? "—",
  }));
}

/* ===============================
   ADD RESIDENT (NO LOGOUT FIX)
================================ */
export async function addResident(payload) {
  // 1️⃣ Create auth user WITHOUT switching session
  const { data: authData, error: authError } =
    await supabaseNoSession.auth.signUp({
      email: payload.email,
      password: payload.password,
    });

  if (authError) throw authError;

  const userId = authData.user.id;

  // 2️⃣ Resolve house
  const { data: house, error: houseError } = await supabase
    .from("houses")
    .select("id")
    .eq("unit_number", Number(payload.house_no))
    .single();

  if (houseError || !house) {
    throw new Error("House number not found");
  }

  // 3️⃣ Insert resident
  const { error } = await supabase.from("residents").insert({
    name: payload.name,
    email: payload.email,
    phone: payload.phone,
    move_in_date: payload.move_in_date || null,
    status: payload.status,
    house_id: house.id,
    user_id: userId,
  });

  if (error) throw error;
}

/* ===============================
   UPDATE RESIDENT
================================ */
export async function updateResident(id, payload) {
  const { data: house, error: houseError } = await supabase
    .from("houses")
    .select("id")
    .eq("unit_number", Number(payload.house_no))
    .single();

  if (houseError || !house) {
    throw new Error("House number not found");
  }

  const { error } = await supabase
    .from("residents")
    .update({
      name: payload.name,
      email: payload.email,
      phone: payload.phone,
      move_in_date: payload.move_in_date || null,
      status: payload.status,
      house_id: house.id,
    })
    .eq("id", id);

  if (error) throw error;
}

/* ===============================
   DELETE RESIDENT
================================ */
export async function deleteResident(id) {
  const { error } = await supabase
    .from("residents")
    .delete()
    .eq("id", id);

  if (error) throw error;
}

/* ===============================
   RESIDENT DASHBOARD (FIXED)
================================ */
export async function getMyResidentProfile(userId) {
  const { data, error } = await supabase
    .from("residents")
    .select(`
      name,
      email,
      phone,
      move_in_date,
      status,
      houses (
        unit_number
      )
    `)
    .eq("user_id", userId)
    .single();

  if (error || !data) return null;

  return {
    name: data.name,
    email: data.email,
    phone: data.phone,
    move_in_date: data.move_in_date,
    status: data.status,
    house_no: data.houses?.unit_number,
  };
}
/* ===============================
   RESIDENT DIRECTORY (PUBLIC)
================================ */
export async function getResidentsDirectory() {
  const { data, error } = await supabase
    .from("residents")
    .select(`
      name,
      phone,
      move_in_date,
      status,
      houses (
        unit_number
      )
    `)
    .eq("role", "resident")
    .order("unit_number", {
      foreignTable: "houses",
      ascending: true,
    });

  if (error) throw error;

  return data.map((r) => ({
    name: r.name,
    phone: r.phone,
    move_in_date: r.move_in_date,
    status: r.status,
    house_no: r.houses?.unit_number ?? "—",
  }));
}
