import { supabase } from "../lib/supabaseClient";


export const getExpenses = async (month, year) => {
  return await supabase
    .from("expenses")
    .select("*")
    .eq("month", month)
    .eq("year", year)
    .order("date", { ascending: false });
};

export const addExpense = async (data) => {
  const { data: res, error } = await supabase
    .from("expenses")
    .insert(data)
    .select();

  if (error) {
    console.error("EXPENSE ERROR:", error);
    throw error;
  }

  return res;
};
