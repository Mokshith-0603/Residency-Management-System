import { Link } from "react-router-dom";
import "../styles/home.css";

export default function Home() {
  return (
    <div className="home-container">
      {/* Navbar */}
      <nav className="home-navbar">
        <h2 className="logo">ResidenceMS</h2>

        <div className="nav-buttons">
          <Link to="/login" className="btn btn-outline">Login</Link>
          <Link to="/signup" className="btn btn-primary">Signup</Link>
        </div>
      </nav>

      {/* Hero */}
      <header className="hero-section">
        <h1>Residence Management System</h1>
        <p>
          Manage residents, complaints, maintenance bills, announcements
          and payments — all in one place.
        </p>

        <div className="hero-actions">
          <Link to="/signup" className="btn btn-primary">Get Started</Link>
          <Link to="/login" className="btn btn-outline">Login</Link>
        </div>
      </header>

      {/* Footer */}
      <footer className="home-footer">
        © {new Date().getFullYear()} Residence Management System
      </footer>
    </div>
  );
}
