import React from "react";
import { useNavigate } from "react-router-dom";

import backgroundImage from "../assets/background.jpg";

export default function TheftCrime() {

  const navigate = useNavigate();

  return (

    <div
      style={{
        minHeight: "100vh",
        backgroundImage: `
          linear-gradient(
            rgba(5,10,20,0.88),
            rgba(5,10,20,0.92)
          ),
          url(${backgroundImage})
        `,
        backgroundSize: "cover",
        backgroundPosition: "center",
        padding: "40px",
        fontFamily: "'Cormorant Garamond', serif",
      }}
    >

      <div
        style={{
          maxWidth: "1300px",
          margin: "auto",
        }}
      >

        <div
          style={{
            background: "rgba(255,255,255,0.05)",
            border:
              "1px solid rgba(255,255,255,0.08)",
            borderRadius: "30px",
            padding: "50px",
            backdropFilter: "blur(24px)",
            boxShadow:
              "0 10px 40px rgba(0,0,0,0.45)",
          }}
        >

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "50px",
            }}
          >

            <div>

              <h1
                style={{
                  color: "white",
                  fontSize: "4.5rem",
                  margin: 0,
                  fontWeight: "500",
                  letterSpacing: "1px",
                }}
              >
                Theft Crime Analysis
              </h1>

              <p
                style={{
                  color:
                    "rgba(255,255,255,0.72)",
                  fontSize: "1.15rem",
                  marginTop: "14px",
                  lineHeight: "1.8",
                }}
              >
                Analyze theft crime patterns,
                district-level insights,
                clustering trends and future
                prediction models.
              </p>

            </div>

            <button
              onClick={() =>
                navigate("/dashboard")
              }
              style={{
                padding: "12px 24px",
                background:
                  "rgba(255,255,255,0.08)",
                border:
                  "1px solid rgba(255,255,255,0.1)",
                borderRadius: "14px",
                color: "white",
                cursor: "pointer",
                fontSize: "15px",
                backdropFilter: "blur(10px)",
              }}
            >
              Main Dashboard
            </button>

          </div>

          {/* CARDS */}

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(260px, 1fr))",
              gap: "28px",
            }}
          >

            <div style={cardStyle}>

              <h2 style={titleStyle}>
                Dataset Analysis
              </h2>

              <p style={textStyle}>
                Explore theft crime records
                from uploaded NCRB datasets.
              </p>

            </div>

            <div style={cardStyle}>

              <h2 style={titleStyle}>
                District Insights
              </h2>

              <p style={textStyle}>
                Compare district-level theft
                patterns across states.
              </p>

            </div>

            <div style={cardStyle}>

              <h2 style={titleStyle}>
                Trend Visualization
              </h2>

              <p style={textStyle}>
                Observe yearly theft trends
                and hidden crime movement.
              </p>

            </div>

            <div style={cardStyle}>

              <h2 style={titleStyle}>
                ML Prediction
              </h2>

              <p style={textStyle}>
                Future supervised learning
                prediction system for theft
                crime forecasting.
              </p>

            </div>

          </div>

        </div>

      </div>

    </div>

  );
}

const cardStyle = {

  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: "22px",
  padding: "35px",
  backdropFilter: "blur(16px)",

};

const titleStyle = {

  color: "white",
  fontSize: "2rem",
  marginBottom: "16px",
  fontWeight: "500",

};

const textStyle = {

  color: "rgba(255,255,255,0.72)",
  lineHeight: "1.8",
  fontSize: "1.05rem",

};

