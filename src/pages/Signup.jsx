import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import "../styles/auth.css";

export default function Signup() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [houseNo, setHouseNo] = useState(""); // for admin reference only
  const [phone, setPhone] = useState("");
  const [moveInDate, setMoveInDate] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      /* 1️⃣ Auth signup */
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });
      if (error) throw error;

      const userId = data.user.id;

      /* 2️⃣ User role */
      const { error: userError } = await supabase
        .from("users")
        .upsert(
          { id: userId, email, role: "RESIDENT" },
          { onConflict: "id" }
        );
      if (userError) throw userError;

      /* 3️⃣ Resident profile (NO house link yet) */
      const { error: residentError } = await supabase
        .from("residents")
        .insert({
          user_id: userId,
          requested_house_no: houseNo, // optional column
          profile: {
            name,
            phone,
            move_in_date: moveInDate,
            status: "Pending Approval",
          },
        });

      if (residentError) throw residentError;

      alert("Signup successful! Please login.");
      navigate("/login");
    } catch (err) {
      console.error("Signup failed:", err);
      alert("Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <Link to="/" className="back-home">← Back to Home</Link>

      <div className="auth-card">
        <h2>Resident Signup</h2>

        <form onSubmit={handleSignup}>
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <input
            type="text"
            placeholder="Preferred House Number"
            value={houseNo}
            onChange={(e) => setHouseNo(e.target.value)}
            required
          />

          <input
            type="tel"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />

          <input
            type="date"
            value={moveInDate}
            onChange={(e) => setMoveInDate(e.target.value)}
            required
          />

          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" disabled={loading}>
            {loading ? "Creating account..." : "Create Account"}
          </button>
        </form>

        <p className="auth-footer">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}
