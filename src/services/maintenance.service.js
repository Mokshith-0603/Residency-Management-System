import { supabase } from "./supabase";

/* --------------------------------------------------
   RESIDENTS
-------------------------------------------------- */

// Fetch all residents (used for bill generation)
export const getAllResidents = async () => {
  return await supabase
    .from("residents")
    .select("id, name, house_no, phone");
};

/* --------------------------------------------------
   MAINTENANCE BILLS
-------------------------------------------------- */

// Get bills for selected month & year
export const getBillsByMonthYear = async (month, year) => {
  return await supabase
    .from("maintenance_bills")
    .select(`
      id,
      resident_id,
      month,
      year,
      amount,
      status,
      payment_mode,
      paid_at,
      residents (
        name,
        house_no,
        phone
      )
    `)
    .eq("month", month)
    .eq("year", year)
    .order("created_at", { ascending: true });
};

// Create monthly bills (one per resident)
export const generateMonthlyBills = async (month, year, amount) => {
  const { data: residents, error } = await getAllResidents();
  if (error) throw error;

  const bills = residents.map(r => ({
    resident_id: r.id,
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
   PAYMENT FLOW
-------------------------------------------------- */

// STEP 1: When Pay Now is clicked (UPI opens)
export const markPaymentInitiated = async (billId) => {
  return await supabase
    .from("maintenance_bills")
    .update({
      status: "PAYMENT_INITIATED",
      payment_mode: "UPI"
    })
    .eq("id", billId)
    .eq("status", "UNPAID");
};

// STEP 2: Admin confirms UPI received (ONE CLICK)
export const confirmPaymentReceived = async (billId) => {
  return await supabase
    .from("maintenance_bills")
    .update({
      status: "PAID",
      paid_at: new Date()
    })
    .eq("id", billId)
    .eq("status", "PAYMENT_INITIATED");
};

// CASH PAYMENT (manual only)
export const markCashPaid = async (billId) => {
  return await supabase
    .from("maintenance_bills")
    .update({
      status: "CASH",
      payment_mode: "CASH",
      paid_at: new Date()
    })
    .eq("id", billId);
};

/* --------------------------------------------------
   RECEIVABLES
-------------------------------------------------- */

// Unpaid residents only
export const getReceivables = async (month, year) => {
  return await supabase
    .from("maintenance_bills")
    .select(`
      id,
      amount,
      residents (
        name,
        house_no,
        phone
      )
    `)
    .eq("status", "UNPAID")
    .eq("month", month)
    .eq("year", year);
};
