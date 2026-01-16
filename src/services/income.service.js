import { supabase } from "./supabase";

export const getOtherIncome = async (month, year) => {
  return await supabase
    .from("other_income")
    .select("*")
    .eq("month", month)
    .eq("year", year)
    .order("date", { ascending: false });
};

export const addOtherIncome = async (data) => {
  return await supabase
    .from("other_income")
    .insert(data);
};
