import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import "../styles/auth.css";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    // 1️⃣ Login user
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert(error.message);
      setLoading(false);
      return;
    }

    const userId = data.user.id;

    // 2️⃣ Fetch role from public.users
    const { data: userData, error: roleError } = await supabase
      .from("users")
      .select("role")
      .eq("id", userId)
      .single();

    if (roleError || !userData) {
      alert("Role not assigned. Contact admin.");
      await supabase.auth.signOut();
      setLoading(false);
      return;
    }

    // 3️⃣ Redirect based on role
    if (userData.role === "ADMIN") {
      navigate("/admin", { replace: true });
    } else if (userData.role === "RESIDENT") {
      navigate("/resident", { replace: true });
    } else {
      alert("Invalid role");
      await supabase.auth.signOut();
    }

    setLoading(false);
  };

  return (
    <div className="auth-page">
      <Link to="/" className="back-home">← Back to Home</Link>

      <div className="auth-card">
        <h2>Login</h2>

        <form onSubmit={handleLogin}>
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
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="auth-footer">
          Only admin-created users can log in
        </p>
      </div>
    </div>
  );
}
