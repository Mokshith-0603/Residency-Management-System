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

    // 1️⃣ Login
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

    // 2️⃣ Fetch role from DB
    const { data: userData, error: roleError } = await supabase
      .from("users")
      .select("role")
      .eq("id", userId)
      .single();

    if (roleError || !userData) {
      alert("Unable to fetch user role");
      setLoading(false);
      return;
    }

    // 3️⃣ Redirect based on role
    if (userData.role === "ADMIN") {
      navigate("/admin", { replace: true });
    } else {
      navigate("/resident", { replace: true });
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
            placeholder="Email"
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

          <button disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p>
          New user? <Link to="/signup">Create account</Link>
        </p>
      </div>
    </div>
  );
}
