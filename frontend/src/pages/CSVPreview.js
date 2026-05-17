import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

import backgroundImage from "../assets/background.jpg";

export default function CSVPreview() {

  const location = useLocation();
  const navigate = useNavigate();

  const data = location.state;

  const [loading, setLoading] = useState(false);

  const quotes = [

    "Patterns hide inside numbers before they become reality.",

    "Every dataset tells a story about society.",

    "Crime trends are rarely random.",

    "Machine learning observes what humans overlook.",

    "Data becomes intelligence through analysis.",

    "Clusters reveal hidden relationships in crime records.",

    "Prediction begins where raw information ends.",

    "Every district leaves a mathematical fingerprint."

  ];

  const randomQuote =
    quotes[Math.floor(Math.random() * quotes.length)];

  const handleTrain = async () => {

    try {

      setLoading(true);

      const response = await axios.post(
        "http://localhost:5000/train-kmeans"
      );

      console.log(response.data);
      alert(JSON.stringify(response.data));

      navigate("/kmeans-prediction", {
        state: {

    ...response.data

  }
});

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }

  };

  return (

    <div
      style={{
        minHeight: "100vh",
        backgroundImage: `
          linear-gradient(
            rgba(5,10,20,0.88),
            rgba(5,10,20,0.9)
          ),
          url(${backgroundImage})
        `,
        backgroundSize: "cover",
        backgroundPosition: "center",
        padding: "40px",
        fontFamily: "'Cormorant Garamond', serif",
        position: "relative",
      }}
    >

      {loading && (

        <div
          style={{
            position: "fixed",
            top: "35px",
            right: "35px",
            width: "320px",
            background: "rgba(255,255,255,0.06)",
            border:
              "1px solid rgba(255,255,255,0.08)",
            borderRadius: "22px",
            padding: "24px",
            backdropFilter: "blur(20px)",
            boxShadow:
              "0 8px 30px rgba(0,0,0,0.4)",
            zIndex: 1000,
          }}
        >

          <h3
            style={{
              color: "white",
              marginBottom: "12px",
              fontSize: "1.5rem",
              fontWeight: "500",
            }}
          >
            Training Model...
          </h3>

          <p
            style={{
              color: "rgba(255,255,255,0.72)",
              fontStyle: "italic",
              lineHeight: "1.8",
              fontSize: "1.05rem",
            }}
          >
            "{randomQuote}"
          </p>

        </div>

      )}

      <div
        style={{
          background: "rgba(255,255,255,0.05)",
          padding: "45px",
          borderRadius: "28px",
          border:
            "1px solid rgba(255,255,255,0.08)",
          backdropFilter: "blur(24px)",
          boxShadow:
            "0 10px 40px rgba(0,0,0,0.45)",
        }}
      >

        <h1
          style={{
            color: "white",
            fontSize: "4rem",
            marginBottom: "12px",
            fontWeight: "500",
            letterSpacing: "1px",
          }}
        >
          Dataset Preview
        </h1>

        <p
          style={{
            color: "rgba(255,255,255,0.72)",
            marginBottom: "30px",
            fontSize: "1.1rem",
          }}
        >
          Total Rows: {data.total_rows}
        </p>

        <div
          style={{
            overflow: "auto",
            maxHeight: "650px",
            borderRadius: "20px",
            background: "rgba(255,255,255,0.03)",
            backdropFilter: "blur(12px)",
            border:
              "1px solid rgba(255,255,255,0.05)",
          }}
        >

          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              color: "white",
            }}
          >

            <thead>

              <tr>

                {data.columns.map((col, index) => (

                  <th
                    key={index}
                    style={{
                      padding: "16px",
                      background:
                        "rgba(255,255,255,0.08)",
                      border:
                        "1px solid rgba(255,255,255,0.04)",
                      fontSize: "1.05rem",
                      fontWeight: "500",
                      position: "sticky",
                      top: 0,
                      backdropFilter: "blur(12px)",
                    }}
                  >
                    {col}
                  </th>

                ))}

              </tr>

            </thead>

            <tbody>

  {/* TOP ROWS */}

  {data.top_rows.map((row, index) => (

    <tr
      key={index}
      style={{
        background:
          index % 2 === 0
            ? "rgba(255,255,255,0.015)"
            : "transparent",
      }}
    >

      {data.columns.map((col, idx) => (

        <td
          key={idx}
          style={{
            padding: "14px",
            border:
              "1px solid rgba(255,255,255,0.03)",
            fontSize: "14px",
            color: "rgba(255,255,255,0.88)",
            whiteSpace: "nowrap",
          }}
        >
          {row[col]}
        </td>

      ))}

    </tr>

  ))}

  {/* SEPARATOR */}

  <tr>

    <td
      colSpan={data.columns.length}
      style={{
        textAlign: "center",
        padding: "24px",
        fontSize: "1.1rem",
        color: "rgba(255,255,255,0.55)",
        fontStyle: "italic",
        background:
          "rgba(255,255,255,0.03)",
      }}
    >
      • 
      •
      •
      •
    </td>

  </tr>

  {/* BOTTOM ROWS */}

  {data.bottom_rows.map((row, index) => (

    <tr
      key={`bottom-${index}`}
      style={{
        background:
          index % 2 === 0
            ? "rgba(255,255,255,0.015)"
            : "transparent",
      }}
    >

      {data.columns.map((col, idx) => (

        <td
          key={idx}
          style={{
            padding: "14px",
            border:
              "1px solid rgba(255,255,255,0.03)",
            fontSize: "14px",
            color: "rgba(255,255,255,0.88)",
            whiteSpace: "nowrap",
          }}
        >
          {row[col]}
        </td>

      ))}

    </tr>

  ))}

</tbody>

          </table>

        </div>

        <div
          style={{
            textAlign: "center",
            marginTop: "42px",
          }}
        >

          <button
            onClick={handleTrain}
            disabled={loading}
            style={{
              padding: "16px 42px",
              background: "rgba(255,255,255,0.08)",
              border:
                "1px solid rgba(255,255,255,0.1)",
              color: "white",
              cursor: "pointer",
              borderRadius: "14px",
              fontSize: "16px",
              fontWeight: "500",
              letterSpacing: "0.5px",
              backdropFilter: "blur(10px)",
            }}
          >
            Train / Test KMeans
          </button>

        </div>

      </div>

    </div>

  );
}