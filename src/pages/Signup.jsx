import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signUp } from "../services/auth.service";
import "../styles/auth.css";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("RESIDENT");
  const navigate = useNavigate();

  async function handleSignup(e) {
    e.preventDefault();
    try {
      await signUp(email, password, role);
      alert("Signup successful. Please login.");
      navigate("/login");
    } catch (err) {
      alert(err.message);
    }
  }

  return (
    <form className="auth-container" onSubmit={handleSignup}>
      <h2>Signup</h2>

      <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />

      <select value={role} onChange={e => setRole(e.target.value)}>
        <option value="RESIDENT">Resident</option>
        <option value="ADMIN">Admin</option>
      </select>

      <button>Create Account</button>
    </form>
  );
}
