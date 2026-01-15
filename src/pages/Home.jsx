import { Link } from "react-router-dom";
import "../styles/home.css";

export default function Home() {
  return (
    <div className="home-container">
      {/* Navbar */}
      <nav className="home-navbar">
        <h2 className="logo">🏘️ Sathya Sai Royal Garden</h2>

        <div className="nav-buttons">
          <Link to="/login" className="btn btn-primary">
            Login
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="hero-section">
        <span className="hero-badge">Secure • Reliable • Real-time</span>

        <h1>Residence Management System</h1>

        <p>
          A modern platform to manage residents, maintenance bills, complaints,
          announcements, and payments — all from one secure dashboard.
        </p>

        <div className="hero-actions">
          <Link to="/login" className="btn btn-primary">
            Login to Dashboard
          </Link>

          <a href="#features" className="btn btn-outline">
            Explore Features
          </a>
        </div>

        <p className="login-note">
          ⚠️ Only residents and admins added by the administrator can log in.
        </p>
      </header>

      {/* Features Section */}
      <section id="features" className="features-section">
        <h2>What You Can Do</h2>
        <p className="features-subtitle">
          Everything you need to run a residence smoothly and securely.
        </p>

        <div className="features-grid">
          <div className="feature-card">
            <span className="feature-icon">🏠</span>
            <h3>Resident Management</h3>
            <p>Manage residents, roles, and house assignments efficiently.</p>
          </div>

          <div className="feature-card">
            <span className="feature-icon">🧾</span>
            <h3>Maintenance Bills</h3>
            <p>Auto-generated monthly bills with due dates and tracking.</p>
          </div>

          <div className="feature-card">
            <span className="feature-icon">🛠</span>
            <h3>Complaints</h3>
            <p>Raise, track, and resolve complaints in real time.</p>
          </div>

          <div className="feature-card">
            <span className="feature-icon">📢</span>
            <h3>Announcements</h3>
            <p>Important notices and updates from management.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="home-footer">
        © {new Date().getFullYear()} Residence Management System. All rights reserved.
      </footer>
    </div>
  );
}
