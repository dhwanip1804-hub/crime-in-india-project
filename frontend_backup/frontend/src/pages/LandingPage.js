import React from "react";
import bg from "../assets/background.jpg";
import Navbar from "../components/Navbar";
import "./LandingPage.css";

const LandingPage = () => {
  return (
    <div className="landing-page">
      <Navbar />
      <div
  className="landing"
  style={{
    backgroundImage: `url(${bg})`
  }}
></div>

      <div className="overlay">
        <div className="hero-content">
          <h1>Crime in India</h1>

          <p>
            Analyze, Predict and Visualize Crime Trends
          </p>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;