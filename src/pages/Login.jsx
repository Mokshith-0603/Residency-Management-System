import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/auth.service"; // ✅ ONLY login
import { useAuth } from "../context/AuthContext";
import "../styles/auth.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { role } = useAuth();

  async function handleLogin(e) {
    e.preventDefault();
    try {
      await login(email, password);

      if (role === "ADMIN") navigate("/admin");
      else navigate("/resident");
    } catch (err) {
      alert(err.message);
    }
  }

  return (
    <form className="auth-container" onSubmit={handleLogin}>
      <h2>Login</h2>

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

      <button type="submit">Login</button>
    </form>
  );
}
