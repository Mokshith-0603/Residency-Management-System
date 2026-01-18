import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import { useAuth } from "../../context/AuthContext";

export default function ResidentBills() {
  const { user } = useAuth();
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.id) return;

    const loadBills = async () => {
      setLoading(true);

      // 1️⃣ Get resident profile linked to this user
      const { data: resident, error: residentError } = await supabase
        .from("residents")
        .select("id")
        .eq("user_id", user.id)
        .single();

      if (residentError || !resident) {
        console.error("Resident profile not linked");
        setLoading(false);
        return;
      }

      // 2️⃣ Get bills using residents.id
      const { data: billsData, error: billsError } = await supabase
        .from("maintenance_bills")
        .select("*")
        .eq("resident_id", resident.id)
        .order("created_at", { ascending: false });

      if (!billsError) {
        setBills(billsData || []);
      }

      setLoading(false);
    };

    loadBills();
  }, [user?.id]);

  if (loading) return <p>Loading bills...</p>;

  return (
    <div className="page">
      <h2>My Maintenance Bills</h2>

      {bills.length === 0 && <p>No bills available</p>}

      {bills.map(bill => (
        <div className="card" key={bill.id}>
          <p><strong>Amount:</strong> ₹ {bill.amount}</p>
          <p><strong>Status:</strong> {bill.status}</p>

          {/* ADMIN clicked Pay Now */}
          {bill.status === "PAYMENT_INITIATED" && (
            <button className="primary-btn">
              Pay Now
            </button>
          )}

          {bill.status === "PAID" && (
            <span className="paid-badge">Paid ✅</span>
          )}

          {bill.status === "CASH" && (
            <span className="paid-badge">Paid (Cash)</span>
          )}
        </div>
      ))}
    </div>
  );
}
