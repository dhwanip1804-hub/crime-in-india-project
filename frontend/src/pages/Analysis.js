import React, { useState } from "react";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid
} from "recharts";

import backgroundImage from "../assets/background.jpg";

export default function Analysis() {

  const [crimeType, setCrimeType] =
    useState("theft");

  const COLORS = [
    "#d4af37",
    "#c084fc",
    "#60a5fa",
    "#34d399"
  ];

  const chartData = {

    theft: [

      {
        name: "Delhi",
        value: 50
      },

      {
        name: "Kerala",
        value: 25
      },

      {
        name: "Tamil Nadu",
        value: 15
      },

      {
        name: "Andhra Pradesh",
        value: 10
      }

    ],

    murder: [

      {
        name: "Delhi",
        value: 65
      },

      {
        name: "Kerala",
        value: 12
      },

      {
        name: "Andhra Pradesh",
        value: 18
      },

      {
        name: "Tamil Nadu",
        value: 5
      }

    ],

    rape: [

      {
        name: "Delhi",
        value: 85
      },

      {
        name: "Kerala",
        value: 5
      },

      {
        name: "Tamil Nadu",
        value: 5
      },

      {
        name: "Others",
        value: 5
      }

    ]

  };

  const scatterData = [

    {
      x: 10,
      y: 20
    },

    {
      x: 15,
      y: 25
    },

    {
      x: 35,
      y: 70
    },

    {
      x: 40,
      y: 85
    },

    {
      x: 22,
      y: 40
    }

  ];

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
        color: "white",
        fontFamily:
          "'Cormorant Garamond', serif",
      }}
    >

      <h1
        style={{
          fontSize: "4rem",
          marginBottom: "20px",
        }}
      >
        Crime Analysis Dashboard
      </h1>

      <select
        value={crimeType}
        onChange={(e) =>
          setCrimeType(
            e.target.value
          )
        }
        style={{
          padding: "14px",
          borderRadius: "12px",
          marginBottom: "40px",
          background:
            "rgba(255,255,255,0.08)",
          color: "white",
          border:
            "1px solid rgba(255,255,255,0.1)"
        }}
      >

        <option value="theft">
          Theft
        </option>

        <option value="murder">
          Murder
        </option>

        <option value="rape">
          Rape
        </option>

      </select>

      <div
        style={{
          background:
            "rgba(255,255,255,0.05)",
          borderRadius: "24px",
          padding: "30px",
          backdropFilter: "blur(18px)",
        }}
      >

        <h2
          style={{
            marginBottom: "20px",
            fontSize: "2rem",
          }}
        >
          State-wise Crime Distribution
        </h2>

        <div
          style={{
            width: "100%",
            height: "500px",
          }}
        >

          <ResponsiveContainer>

            <PieChart>

              <Pie
                data={
                  chartData[
                    crimeType
                  ]
                }
                dataKey="value"
                nameKey="name"
                outerRadius={180}
                label
              >

                {chartData[
                  crimeType
                ].map(
                  (
                    entry,
                    index
                  ) => (

                    <Cell
                      key={index}
                      fill={
                        COLORS[
                          index %
                            COLORS.length
                        ]
                      }
                    />

                  )
                )}

              </Pie>

              <Tooltip />

              <Legend />

            </PieChart>

          </ResponsiveContainer>

        </div>

      </div>

      <div
        style={{
          background:
            "rgba(255,255,255,0.05)",
          borderRadius: "24px",
          padding: "30px",
          marginTop: "40px",
          backdropFilter: "blur(18px)",
        }}
      >

        <h2
          style={{
            marginBottom: "20px",
            fontSize: "2rem",
          }}
        >
          K-Means Cluster Visualization
        </h2>

        <div
          style={{
            width: "100%",
            height: "500px",
          }}
        >

          <ResponsiveContainer>

            <ScatterChart>

              <CartesianGrid />

              <XAxis
                type="number"
                dataKey="x"
              />

              <YAxis
                type="number"
                dataKey="y"
              />

              <Tooltip />

              <Scatter
                data={scatterData}
                fill="#c084fc"
              />

            </ScatterChart>

          </ResponsiveContainer>

        </div>

      </div>

    </div>

  );
}