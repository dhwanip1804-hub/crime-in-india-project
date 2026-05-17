

import React from "react";
import { useNavigate } from "react-router-dom";

import backgroundImage from "../assets/background.jpg";
import visualizationData from "../data/visualization.json";

import { motion } from "framer-motion";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
  BarChart,
  Bar,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  RadarChart
} from "recharts";

export default function Visualization() {

  const navigate = useNavigate();

  const totalCrimeData = visualizationData.map((item) => ({
    YEAR: item.YEAR,
    TOTAL:
      item.MURDER +
      item.RAPE +
      item.THEFT +
      item.ROBBERY
  }));

  return (

    <div
      style={{
        minHeight: "100vh",
        padding: "40px",

        backgroundImage: `linear-gradient(
          rgba(4, 10, 24, 0.52),
          rgba(4, 10, 24, 0.68)
        ), url(${backgroundImage})`,

        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",

        color: "white",

        fontFamily:
          "'Poppins', 'Segoe UI', sans-serif"
      }}
    >

      {/* Top Section */}

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
  Crime Visualizations
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
            This visualization dashboard transforms raw national crime
            records into interactive analytical insights. The charts
            below help users understand long-term crime growth,
            category-wise crime distribution, theft trends, and evolving
            crime patterns across multiple years.
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

        {/* Back Button */}

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

      {/* Main Chart */}

      <motion.div
        whileHover={{ scale: 1.01 }}
        style={{
          background: "rgba(7, 15, 28, 0.58)",

          borderRadius: "28px",

          padding: "30px",

          marginBottom: "32px",

          backdropFilter: "blur(10px)",

          border:
            "1px solid rgba(255,255,255,0.06)",

          boxShadow:
            "0 12px 40px rgba(0,0,0,0.28)"
        }}
      >

        <h2
          style={{
            marginBottom: "18px",

            fontSize: "30px",

            fontWeight: "700",

            color: "#f8fafc"
          }}
        >
          National Crime Trend
        </h2>

        <ResponsiveContainer width="100%" height={350}>

          <AreaChart data={totalCrimeData}>

            <defs>

              <linearGradient
                id="colorCrime"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >

                <stop
                  offset="5%"
                  stopColor="#22d3ee"
                  stopOpacity={0.9}
                />

                <stop
                  offset="95%"
                  stopColor="#2563eb"
                  stopOpacity={0}
                />

              </linearGradient>

            </defs>

            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#1e293b"
            />

            <XAxis
              dataKey="YEAR"
              stroke="#cbd5e1"
            />

            <YAxis
              stroke="#cbd5e1"
            />

            <Tooltip />

            <Area
              type="monotone"
              dataKey="TOTAL"
              stroke="#22d3ee"
              fillOpacity={1}
              fill="url(#colorCrime)"
              strokeWidth={3}
            />

          </AreaChart>

        </ResponsiveContainer>

        <p
          style={{
            color: "#d3dce7",

            marginTop: "20px",

            lineHeight: "1.9",

            fontSize: "14px"
          }}
        >
          This area chart represents the overall national crime trend
          by combining major recorded crime categories including
          murder, rape, theft, and robbery. The upward movement
          highlights increasing reported criminal activity over the
          years.
        </p>

      </motion.div>

      {/* Grid */}

      <div
        style={{
          display: "grid",

          gridTemplateColumns:
            "repeat(auto-fit, minmax(360px, 1fr))",

          gap: "28px"
        }}
      >

        {/* Crime Comparison */}

        <motion.div
          whileHover={{ y: -5 }}
          style={{
            background: "rgba(7, 15, 28, 0.58)",

            borderRadius: "28px",

            padding: "24px",

            backdropFilter: "blur(10px)",

            border:
              "1px solid rgba(255,255,255,0.06)",

            boxShadow:
              "0 12px 40px rgba(0,0,0,0.28)"
          }}
        >

          <h3
            style={{
              marginBottom: "18px",

              fontSize: "24px",

              fontWeight: "700",

              color: "#f8fafc"
            }}
          >
            Crime Category Comparison
          </h3>

          <ResponsiveContainer width="100%" height={300}>

            <BarChart data={visualizationData}>

              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#1e293b"
              />

              <XAxis
                dataKey="YEAR"
                stroke="#cbd5e1"
              />

              <YAxis
                stroke="#cbd5e1"
              />

              <Tooltip />

              <Bar
                dataKey="MURDER"
                fill="#ef4444"
              />

              <Bar
                dataKey="RAPE"
                fill="#f97316"
              />

              <Bar
                dataKey="ROBBERY"
                fill="#8b5cf6"
              />

            </BarChart>

          </ResponsiveContainer>

          <p
            style={{
              color: "#d3dce7",

              marginTop: "18px",

              lineHeight: "1.9",

              fontSize: "14px"
            }}
          >
            Compare major violent crime categories over multiple years
            to better understand changes in national crime patterns.
          </p>

        </motion.div>

        {/* Theft Trend */}

        <motion.div
          whileHover={{ y: -5 }}
          style={{
            background: "rgba(7, 15, 28, 0.58)",

            borderRadius: "28px",

            padding: "24px",

            backdropFilter: "blur(10px)",

            border:
              "1px solid rgba(255,255,255,0.06)",

            boxShadow:
              "0 12px 40px rgba(0,0,0,0.28)"
          }}
        >

          <h3
            style={{
              marginBottom: "18px",

              fontSize: "24px",

              fontWeight: "700",

              color: "#f8fafc"
            }}
          >
            Theft Trend Analysis
          </h3>

          <ResponsiveContainer width="100%" height={300}>

            <AreaChart data={visualizationData}>

              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#1e293b"
              />

              <XAxis
                dataKey="YEAR"
                stroke="#cbd5e1"
              />

              <YAxis
                stroke="#cbd5e1"
              />

              <Tooltip />

              <Area
                type="monotone"
                dataKey="THEFT"
                stroke="#22c55e"
                fill="#22c55e"
                fillOpacity={0.3}
              />

            </AreaChart>

          </ResponsiveContainer>

          <p
            style={{
              color: "#d3dce7",

              marginTop: "18px",

              lineHeight: "1.9",

              fontSize: "14px"
            }}
          >
            Theft continues to remain one of the most reported crime
            categories in the national dataset.
          </p>

        </motion.div>

        {/* Radar */}

        <motion.div
          whileHover={{ y: -5 }}
          style={{
            background: "rgba(7, 15, 28, 0.58)",

            borderRadius: "28px",

            padding: "24px",

            backdropFilter: "blur(10px)",

            border:
              "1px solid rgba(255,255,255,0.06)",

            boxShadow:
              "0 12px 40px rgba(0,0,0,0.28)"
          }}
        >

          <h3
            style={{
              marginBottom: "18px",

              fontSize: "24px",

              fontWeight: "700",

              color: "#f8fafc"
            }}
          >
            Crime Pattern Radar
          </h3>

          <ResponsiveContainer width="100%" height={300}>

            <RadarChart data={visualizationData}>

              <PolarGrid stroke="#1e293b" />

              <PolarAngleAxis
                dataKey="YEAR"
                stroke="#cbd5e1"
              />

              <Radar
                name="Murder"
                dataKey="MURDER"
                stroke="#ef4444"
                fill="#ef4444"
                fillOpacity={0.3}
              />

            </RadarChart>

          </ResponsiveContainer>

          <p
            style={{
              color: "#d3dce7",

              marginTop: "18px",

              lineHeight: "1.9",

              fontSize: "14px"
            }}
          >
            Radar visualization helps identify years with relatively
            higher violent crime intensity.
          </p>

        </motion.div>

        {/* Quick Insights */}

        <motion.div
          whileHover={{ y: -5 }}
          style={{
            background:
              "linear-gradient(135deg, rgba(15,23,42,0.72), rgba(30,41,59,0.72))",

            borderRadius: "28px",

            padding: "30px",

            display: "flex",

            flexDirection: "column",

            justifyContent: "center",

            backdropFilter: "blur(10px)",

            border:
              "1px solid rgba(255,255,255,0.06)",

            boxShadow:
              "0 12px 40px rgba(0,0,0,0.28)"
          }}
        >

          <h2
            style={{
              marginBottom: "24px",

              fontSize: "28px",

              fontWeight: "700",

              color: "#ffffff"
            }}
          >
            Quick Insights
          </h2>

          <div
            style={{
              marginBottom: "18px",

              color: "#e2e8f0",

              lineHeight: "1.8",

              fontSize: "15px"
            }}
          >
            🔹 Highest Theft Cases Recorded Around 2011
          </div>

          <div
            style={{
              marginBottom: "18px",

              color: "#e2e8f0",

              lineHeight: "1.8",

              fontSize: "15px"
            }}
          >
            🔹 Murder Cases Show Gradual Long-Term Decline
          </div>

          <div
            style={{
              marginBottom: "18px",

              color: "#e2e8f0",

              lineHeight: "1.8",

              fontSize: "15px"
            }}
          >
            🔹 Theft Dominates Overall Crime Distribution
          </div>

          <div
            style={{
              color: "#e2e8f0",

              lineHeight: "1.8",

              fontSize: "15px"
            }}
          >
            🔹 Robbery Cases Stabilize After Late 2000s
          </div>

        </motion.div>

      </div>

    </div>
  );
}   