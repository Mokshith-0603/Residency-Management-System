import { supabase } from "./supabase";

export const getExpenses = async (month, year) => {
  return await supabase
    .from("expenses")
    .select("*")
    .eq("month", month)
    .eq("year", year)
    .order("date", { ascending: false });
};

export const addExpense = async (data) => {
  return await supabase
    .from("expenses")
    .insert(data);
};
