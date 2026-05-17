import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import backgroundImage from "../assets/background.jpg";

import catalogData from "../data/catalog_data.json";

export default function Catalog() {

  const navigate = useNavigate();

  const [search, setSearch] = useState("");

  const [visibleCrimes, setVisibleCrimes] =
    useState([]);

  useEffect(() => {

    const shuffled = [...catalogData]
      .sort(() => 0.5 - Math.random())
      .slice(0, 6);

    setVisibleCrimes(shuffled);

  }, []);

  const filteredCrimes = search
    ? catalogData.filter((item) =>
        item.crime
          .toLowerCase()
          .includes(search.toLowerCase())
      )
    : visibleCrimes;

  return (

    <div
      style={{
        minHeight: "100vh",
        padding: "40px",

        backgroundImage: `linear-gradient(
          rgba(4, 10, 24, 0.58),
          rgba(4, 10, 24, 0.72)
        ), url(${backgroundImage})`,

        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",

        color: "white",

        fontFamily:
          "'Poppins', 'Segoe UI', sans-serif"
      }}
    >

      {/* TOP SECTION */}

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: "20px",
          flexWrap: "wrap",
          marginBottom: "42px"
        }}
      >

        <div>

          <h1
            style={{
              fontFamily:
                "'Cormorant Garamond', 'Times New Roman', serif",

              fontSize: "72px",

              fontWeight: "700",

              color: "#f8f6ee",

              marginBottom: "18px",

              lineHeight: "0.95",

              letterSpacing: "-1.5px",

              textShadow:
                "0 3px 20px rgba(0,0,0,0.35)"
            }}
          >
            Crime Intelligence
            <br />
            Catalog
          </h1>

          <p
            style={{
              color: "#d6deea",
              maxWidth: "950px",
              lineHeight: "1.9",
              fontSize: "15px",
              fontWeight: "400"
            }}
          >
            Explore crime classifications extracted directly
            from NCRB district-wise IPC crime records dataset.
            The catalog dynamically presents rotating crime
            categories through a structured intelligence
            explorer powered entirely by real dataset analysis.
          </p>

          <div
            style={{
              width: "120px",
              height: "4px",
              borderRadius: "999px",
              background:
                "linear-gradient(to right, #38bdf8, #8b5cf6)",
              marginTop: "22px"
            }}
          />

        </div>

        {/* BACK BUTTON */}

        <button
          onClick={() => navigate("/dashboard")}
          style={{
            padding: "14px 26px",

            borderRadius: "14px",

            border:
              "1px solid rgba(255,255,255,0.12)",

            background:
              "rgba(15, 23, 42, 0.72)",

            color: "white",

            cursor: "pointer",

            fontSize: "15px",

            fontWeight: "600",

            fontFamily:
              "'Poppins', 'Segoe UI', sans-serif",

            backdropFilter: "blur(8px)",

            transition: "0.3s ease"
          }}
        >
          ← Back to Dashboard
        </button>

      </div>

      {/* SEARCH */}

      <div
        style={{
          marginBottom: "40px"
        }}
      >

        <input
          type="text"
          placeholder="Search crime category..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          style={{
            width: "100%",
            maxWidth: "420px",

            padding: "16px 22px",

            borderRadius: "16px",

            border:
              "1px solid rgba(255,255,255,0.10)",

            background:
              "rgba(15, 23, 42, 0.62)",

            color: "white",

            outline: "none",

            backdropFilter: "blur(8px)",

            fontSize: "15px",

            fontFamily:
              "'Poppins', 'Segoe UI', sans-serif"
          }}
        />

      </div>

      {/* GRID */}

      <div
        style={{
          display: "grid",

          gridTemplateColumns:
            "repeat(auto-fit, minmax(340px, 1fr))",

          gap: "28px"
        }}
      >

        {filteredCrimes.map((item, index) => (

          <div
            key={index}
            style={{
              background:
                "rgba(7, 15, 28, 0.58)",

              borderRadius: "28px",

              padding: "28px",

              backdropFilter: "blur(10px)",

              border:
                "1px solid rgba(255,255,255,0.06)",

              boxShadow:
                "0 12px 40px rgba(0,0,0,0.28)",

              transition: "0.3s ease"
            }}
          >

            {/* TYPE */}

            <div
              style={{
                marginBottom: "18px"
              }}
            >

              <span
                style={{
                  background:
                    "rgba(56,189,248,0.12)",

                  border:
                    "1px solid rgba(56,189,248,0.18)",

                  color: "#7dd3fc",

                  padding: "8px 14px",

                  borderRadius: "999px",

                  fontSize: "12px",

                  letterSpacing: "2px",

                  textTransform: "uppercase"
                }}
              >
                {item.type}
              </span>

            </div>

            {/* TITLE */}

            <h2
              style={{
                fontFamily:
                  "'Cormorant Garamond', 'Times New Roman', serif",

                fontSize: "42px",

                fontWeight: "700",

                marginBottom: "14px",

                color: "#f8f6ee",

                lineHeight: "1"
              }}
            >
              {item.crime}
            </h2>

            {/* SEVERITY */}

            <p
              style={{
                color: "#fca5a5",

                marginBottom: "20px",

                fontSize: "13px",

                letterSpacing: "2px",

                textTransform: "uppercase"
              }}
            >
              {item.severity}
            </p>

            {/* INSIGHT */}

            <p
              style={{
                color: "#d6deea",

                lineHeight: "1.9",

                fontSize: "14px",

                marginBottom: "24px"
              }}
            >
              {item.insight}
            </p>

            {/* DATA BOXES */}

            <div
              style={{
                display: "grid",
                gap: "14px",
                marginBottom: "24px"
              }}
            >

              <div
                style={{
                  background:
                    "rgba(255,255,255,0.04)",

                  border:
                    "1px solid rgba(255,255,255,0.06)",

                  borderRadius: "18px",

                  padding: "18px"
                }}
              >

                <p
                  style={{
                    color: "#94a3b8",

                    fontSize: "13px",

                    marginBottom: "8px"
                  }}
                >
                  Dataset Coverage
                </p>

                <h3
                  style={{
                    color: "#7dd3fc",

                    fontSize: "24px",

                    fontWeight: "700"
                  }}
                >
                  {item.states}
                </h3>

              </div>

              <div
                style={{
                  background:
                    "rgba(255,255,255,0.04)",

                  border:
                    "1px solid rgba(255,255,255,0.06)",

                  borderRadius: "18px",

                  padding: "18px"
                }}
              >

                <p
                  style={{
                    color: "#94a3b8",

                    fontSize: "13px",

                    marginBottom: "8px"
                  }}
                >
                  Available Years
                </p>

                <h3
                  style={{
                    color: "#c4b5fd",

                    fontSize: "24px",

                    fontWeight: "700"
                  }}
                >
                  {item.years}
                </h3>

              </div>

            </div>

            {/* EXTRA INFO */}

            <div
              style={{
                marginBottom: "24px"
              }}
            >

              <div
                style={{
                  background:
                    "rgba(255,255,255,0.04)",

                  border:
                    "1px solid rgba(255,255,255,0.06)",

                  borderRadius: "18px",

                  padding: "18px",

                  marginBottom: "14px"
                }}
              >

                <p
                  style={{
                    color: "#94a3b8",

                    fontSize: "13px",

                    marginBottom: "8px"
                  }}
                >
                  Total Reported Cases
                </p>

                <h3
                  style={{
                    color: "#f8fafc",

                    fontSize: "28px",

                    fontWeight: "700"
                  }}
                >
                  {item.total_cases.toLocaleString()}
                </h3>

              </div>

              <div
                style={{
                  background:
                    "rgba(255,255,255,0.04)",

                  border:
                    "1px solid rgba(255,255,255,0.06)",

                  borderRadius: "18px",

                  padding: "18px"
                }}
              >

                <p
                  style={{
                    color: "#94a3b8",

                    fontSize: "13px",

                    marginBottom: "8px"
                  }}
                >
                  Highest Reporting State
                </p>

                <h3
                  style={{
                    color: "#facc15",

                    fontSize: "24px",

                    fontWeight: "700"
                  }}
                >
                  {item.top_state}
                </h3>

              </div>

            </div>

            {/* RELATED */}

            <div>

              <p
                style={{
                  color: "#94a3b8",

                  fontSize: "12px",

                  letterSpacing: "2px",

                  textTransform: "uppercase",

                  marginBottom: "14px"
                }}
              >
                Related Crimes
              </p>

              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "10px"
                }}
              >

                {item.related.map((crime, i) => (

                  <span
                    key={i}
                    style={{
                      background:
                        "rgba(255,255,255,0.05)",

                      border:
                        "1px solid rgba(255,255,255,0.06)",

                      padding: "9px 14px",

                      borderRadius: "14px",

                      fontSize: "13px",

                      color: "#e2e8f0"
                    }}
                  >
                    {crime}
                  </span>

                ))}

              </div>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}