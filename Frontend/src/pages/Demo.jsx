import React from "react";
import { Link } from "react-router-dom";

function DemoPage() {
  return (
    <div style={styles.container}>
      {/* Navbar */}
      <nav style={styles.navbar}>
        <h2 style={styles.logo}>CareSense</h2>
        <div>
          <Link to="/login" style={styles.navButton}>Login</Link>
          <Link to="/signup" style={{ ...styles.navButton, background: "#28a745" }}>
            Sign Up
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <header style={styles.hero}>
        <h1 style={styles.heroTitle}>
          Explore Smarter Healthcare with <span style={styles.gradientText}>AI Solutions</span>
        </h1>
        <p style={styles.heroSubtitle}>
          Use AI to analyze symptoms, suggest conditions, and track health insights — all in one place.
        </p>
      </header>

      {/* Features */}
      <section style={styles.features}>
        <div style={styles.featureCard}>
          <h3>🤖 AI Symptom Checker</h3>
          <p>Enter symptoms in natural language and get possible condition predictions instantly.</p>
        </div>
        <div style={styles.featureCard}>
          <h3>📊 Health History</h3>
          <p>Track all your past health reports and predictions in your personal dashboard.</p>
        </div>
        <div style={styles.featureCard}>
          <h3>🔒 Secure Profiles</h3>
          <p>All your data is encrypted and securely managed with privacy in mind.</p>
        </div>
      </section>

      {/* Footer */}
      <footer style={styles.footer}>
        <p>© {new Date().getFullYear()} CareSense. All rights reserved.</p>
        <div style={styles.footerLinks}>
          <a href="#about" style={styles.footerLink}>About</a>
          <a href="#privacy" style={styles.footerLink}>Privacy</a>
          <a href="#contact" style={styles.footerLink}>Contact</a>
        </div>
      </footer>
    </div>
  );
}

const styles = {
  container: {
    fontFamily: "Arial, sans-serif",
    background: "linear-gradient(to bottom,rgb(7, 7, 7),rgb(27, 31, 33))",
    color: "#fff",
    minHeight: "100vh",
    width: "100vw",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "1rem 2rem",
    position: "sticky",
    top: 0,
    background: "rgba(47, 46, 46, 0.3)",
    backdropFilter: "blur(10px)",
    zIndex: 10,
  },
  logo: {
    fontSize: "22px",
    fontWeight: "bold",
  },
  navButton: {
    marginLeft: "1rem",
    padding: "8px 16px",
    borderRadius: "5px",
    background: "#007bff",
    color: "#fff",
    textDecoration: "none",
    transition: "0.3s",
  },
  hero: {
    textAlign: "center",
    padding: "6rem 2rem",
    animation: "fadeIn 2s ease-in-out",
  },
  heroTitle: {
    fontSize: "2.5rem",
    marginBottom: "1rem",
  },
  gradientText: {
    background: "linear-gradient(90deg, #00c6ff, #0072ff)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
  heroSubtitle: {
    fontSize: "1.2rem",
    marginBottom: "2rem",
    color: "#ddd",
  },
  features: {
    display: "flex",
    justifyContent: "center",
    gap: "2rem",
    padding: "3rem 2rem",
    flexWrap: "wrap",
  },
  featureCard: {
    background: "linear-gradient(180deg,rgb(41, 47, 49), rgb(20,20,20))",
    padding: "1.5rem",
    borderRadius: "10px",
    width: "280px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
    transition: "transform 0.3s",
  },
  footer: {
    marginTop: "auto",
    textAlign: "center",
    padding: "1rem",
    background: "rgba(0,0,0,0.5)",
    fontSize: "14px",
    borderTop: "1px solid #333",
  },
  footerLinks: {
    marginTop: "0.5rem",
    display: "flex",
    justifyContent: "center",
    gap: "1.5rem",
  },
  footerLink: {
    color: "#bbb",
    textDecoration: "none",
    transition: "0.3s",
  },
};

export default DemoPage;
