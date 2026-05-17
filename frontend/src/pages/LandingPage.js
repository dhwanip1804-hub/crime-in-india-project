import React from "react";
import { Link } from "react-router-dom";
import "./LandingPage.css";

const LandingPage = () => {
  return (
    <div className="landing-page">

      <nav className="landing-navbar">

        <h1 className="logo">Crime in India</h1>

        <div className="nav-links">
          <Link to="/dashboard">Home</Link>

          <Link to="/login">Login</Link>

          <Link to="/signup">Signup</Link>
        </div>

      </nav>

      <div className="hero-section">

        <h1 className="hero-title">
          CRIME IN INDIA
        </h1>

        <p className="hero-subtitle">
          Analyze, Predict and Visualize Crime Trends
        </p>

      </div>

    </div>
  );
};

export default LandingPage;