import React from "react";

import {
  Link,
  useLocation
} from "react-router-dom";

export default function PredictionNavbar() {

  const location = useLocation();

  const navButton = (path, label) => {

    const active =
      location.pathname === path;

    return (

      <Link
        to={path}
        style={{
          textDecoration: "none"
        }}
      >

        <button
          style={{

            background: active
              ? "#c9a14a"
              : "rgba(255,255,255,0.08)",

            color: active
              ? "#071120"
              : "white",

            border:
              "1px solid rgba(255,255,255,0.15)",

            padding: "10px 18px",

            borderRadius: "10px",

            cursor: "pointer",

            fontWeight: "600",

            letterSpacing: "0.5px",

            transition: "0.3s ease",

            backdropFilter: "blur(6px)"

          }}
        >
          {label}
        </button>

      </Link>

    );

  };

  return (

    <div
      style={{

        width: "100%",

        display: "flex",

        justifyContent: "flex-end",

        gap: "12px",

        marginBottom: "30px",

        flexWrap: "wrap"

      }}
    >

      {navButton(
        "/dashboard",
        "Home"
      )}

      {navButton(
        "/upload-csv",
        "Upload CSV"
      )}

      {navButton(
        "/kmeans-prediction",
        "Cluster Prediction"
      )}

      {navButton(
        "/prediction",
        "Prediction"
      )}

    </div>

  );
}