import { supabase } from "./supabase";

/* SIGN UP */
export async function signUp(email, password, role) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) throw error;

  const { error: dbError } = await supabase
    .from("users")
    .insert({
      id: data.user.id,
      email,
      role,
    });

  if (dbError) throw dbError;

  return data;
}

/* LOGIN */
export async function login(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;
  return data;
}

/* LOGOUT */
export async function logout() {
  await supabase.auth.signOut();
}
