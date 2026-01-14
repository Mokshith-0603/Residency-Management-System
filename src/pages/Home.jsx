import { Link } from "react-router-dom";
import "../styles/home.css";

export default function Home() {
  return (
    <div className="home-container">
      {/* Navbar */}
      <nav className="home-navbar">
        <h2 className="logo">ResidenceMS</h2>

        <div className="nav-buttons">
          <Link to="/login" className="btn btn-outline">
            Login
          </Link>
          <Link to="/signup" className="btn btn-primary">
            Signup
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="hero-section">
        <h1>Residence Management System</h1>
        <p>
          A modern platform to manage residents, complaints,
          maintenance bills, announcements and payments — all in one place.
        </p>

        <div className="hero-actions">
          <Link to="/signup" className="btn btn-primary">
            Get Started
          </Link>
          <Link to="/login" className="btn btn-outline">
            Login
          </Link>
        </div>
      </header>

      {/* Features Section */}
      <section className="features-section">
        <h2>Key Features</h2>

        <div className="features-grid">
          <div className="feature-card">
            🏠
            <h3>Resident Management</h3>
            <p>Maintain resident profiles and house details securely.</p>
          </div>

          <div className="feature-card">
            🧾
            <h3>Maintenance Bills</h3>
            <p>Generate, track and manage monthly maintenance bills.</p>
          </div>

          <div className="feature-card">
            🛠
            <h3>Complaints Tracking</h3>
            <p>Residents can raise issues and track resolution status.</p>
          </div>

          <div className="feature-card">
            📢
            <h3>Announcements</h3>
            <p>Admins can post important notices for all residents.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="home-footer">
        <p>© {new Date().getFullYear()} Residence Management System</p>
      </footer>
    </div>
  );
}
