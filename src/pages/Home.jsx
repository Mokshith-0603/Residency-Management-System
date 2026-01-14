import { Link } from "react-router-dom";
import "../styles/home.css";

export default function Home() {
  return (
    <div className="home-container">
      {/* Navbar */}
      <nav className="home-navbar">
        <h2 className="logo">ResidenceMS</h2>

        <div className="nav-buttons">
          <Link to="/login" className="btn btn-primary">
            Login
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="hero-section">
        <h1>Residence Management System</h1>

        <p>
          A secure platform to manage residents, complaints, maintenance bills,
          announcements and payments — all in one place.
        </p>

        <div className="hero-actions">
          <Link to="/login" className="btn btn-primary">
            Login to Dashboard
          </Link>
        </div>

        <p className="login-note">
          ⚠️ Only residents and admins added by the administrator can log in.
        </p>
      </header>

      {/* Features Section */}
      <section className="features-section">
        <h2>What You Can Do</h2>

        <div className="features-grid">
          <div className="feature-card">
            🏠
            <h3>Resident Management</h3>
            <p>Admins manage residents and house assignments.</p>
          </div>

          <div className="feature-card">
            🧾
            <h3>Maintenance Bills</h3>
            <p>View and track monthly maintenance charges.</p>
          </div>

          <div className="feature-card">
            🛠
            <h3>Complaints</h3>
            <p>Residents can raise and monitor complaints.</p>
          </div>

          <div className="feature-card">
            📢
            <h3>Announcements</h3>
            <p>Important notices from management.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="home-footer">
        © {new Date().getFullYear()} Residence Management System
      </footer>
    </div>
  );
}
