import { supabase } from "../lib/supabaseClient";

/* --------------------------------------------------
   GET ACTIVE RESIDENTS WITH HOUSE
-------------------------------------------------- */
export const getActiveResidents = async () => {
  const { data, error } = await supabase
    .from("residents")
    .select(`
      id,
      house_id
    `)
    .eq("status", "Active");

  if (error) throw error;

  // Safety: only residents linked to a house
  return (data || []).filter(r => r.house_id);
};

/* --------------------------------------------------
   GET BILLS BY MONTH & YEAR
-------------------------------------------------- */
export const getBillsByMonthYear = async (month, year) => {
  return await supabase
    .from("maintenance_bills")
    .select(`
      id,
      amount,
      status,
      month,
      year,
      payment_mode,
      residents (
        name,
        houses (
          unit_number
        )
      )
    `)
    .eq("month", month)
    .eq("year", year)
    .order("created_at", { ascending: true });
};

/* --------------------------------------------------
   GENERATE MONTHLY BILLS (PRIMARY & ONLY METHOD)
-------------------------------------------------- */
export const generateMonthlyBills = async (month, year, amount) => {
  const residents = await getActiveResidents();

  if (!residents.length) return;

  const bills = residents.map(r => ({
    resident_id: r.id,
    house_id: r.house_id,
    month,
    year,
    amount,
    status: "UNPAID"
  }));

  return await supabase
    .from("maintenance_bills")
    .insert(bills, { ignoreDuplicates: true });
};

/* --------------------------------------------------
   PAYMENT ACTIONS
-------------------------------------------------- */
export const markPaymentInitiated = async (billId) => {
  return await supabase
    .from("maintenance_bills")
    .update({
      status: "PAYMENT_INITIATED",
      payment_mode: "UPI"
    })
    .eq("id", billId);
};

export const confirmPaymentReceived = async (billId) => {
  return await supabase
    .from("maintenance_bills")
    .update({
      status: "PAID",
      paid_at: new Date()
    })
    .eq("id", billId);
};

export const markCashPaid = async (billId) => {
  return await supabase
    .from("maintenance_bills")
    .update({
      status: "PAID",
      payment_mode: "CASH",
      paid_at: new Date()
    })
    .eq("id", billId);
};

/* --------------------------------------------------
   BULK PAY NOW (ADMIN)
-------------------------------------------------- */
export const markAllPaymentsInitiated = async (month, year) => {
  return await supabase
    .from("maintenance_bills")
    .update({
      status: "PAYMENT_INITIATED",
      payment_mode: "UPI"
    })
    .eq("month", month)
    .eq("year", year)
    .eq("status", "UNPAID");
};

/* --------------------------------------------------
   RECEIVABLES (ADMIN VIEW)
-------------------------------------------------- */
export const getReceivables = async (month, year) => {
  const { data, error } = await supabase
    .from("maintenance_bills")
    .select(`
      id,
      amount,
      residents (
        name,
        houses (
          unit_number
        )
      )
    `)
    .eq("status", "UNPAID")
    .eq("month", month)
    .eq("year", year);

  if (error) throw error;

  return data.map(bill => ({
    id: bill.id,
    amount: bill.amount,
    name: bill.residents?.name ?? "—",
    house_no: bill.residents?.houses?.unit_number ?? "—"
  }));
};

