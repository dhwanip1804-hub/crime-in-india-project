import { Link } from "react-router-dom";
import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Activity,
  
  MapPinned,
  Database,
  Download,
  BookOpen,
  BarChart3
} from "lucide-react";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  ScatterChart,
  Scatter,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  RadialBarChart,
  RadialBar,

  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
  CartesianGrid,
  Cell,
} from "recharts";

import visuals from "../data/dashboard_visuals.json";

import "./Dashboard.css";

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="dashboard-page">

      <div className="dashboard-overlay">


  {/* TOP RIGHT BUTTONS */}

<div
  style={{
    position: "absolute",
    top: "22px",
    right: "30px",
    zIndex: 9999,
    display: "flex",
    alignItems: "center",
    gap: "18px",
    padding: "12px 20px",
    borderRadius: "18px",
    background: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(255,255,255,0.08)",
    backdropFilter: "blur(14px)",
    boxShadow: "0 0 35px rgba(255,255,255,0.03)",
  }}
>

  {/* LINE */}

  <div
    style={{
      width: "38px",
      height: "1px",
      background:
        "linear-gradient(to right, transparent, rgba(255,255,255,0.45))",
    }}
  />

  {/* UPLOAD CSV */}

  <Link to="/upload-csv">
    <button
      style={{
        background:
          "linear-gradient(135deg, rgba(139,92,246,0.22), rgba(99,102,241,0.18))",
        border: "1px solid rgba(255,255,255,0.14)",
        color: "#ffffff",
        padding: "12px 24px",
        borderRadius: "12px",
        fontSize: "14px",
        fontWeight: "600",
        fontFamily: "inherit",
        letterSpacing: "0.8px",
        cursor: "pointer",
        backdropFilter: "blur(14px)",
        boxShadow: "0 0 22px rgba(139,92,246,0.18)",
        transition: "0.3s ease",
      }}
    >
      Upload CSV
    </button>
  </Link>

  {/* ABOUT */}

  <Link to="/about-us">
    <button
      style={{
        background: "rgba(255,255,255,0.06)",
        border: "1px solid rgba(255,255,255,0.10)",
        color: "#ffffff",
        padding: "10px 18px",
        borderRadius: "10px",
        fontSize: "13px",
        fontWeight: "500",
        fontFamily: "inherit",
        letterSpacing: "0.5px",
        cursor: "pointer",
        backdropFilter: "blur(12px)",
        transition: "0.3s ease",
      }}
    >
      About Us
    </button>
  </Link>

  {/* LOGOUT */}

  <Link to="/login">
    <button
      style={{
        background: "rgba(255,255,255,0.06)",
        border: "1px solid rgba(255,255,255,0.10)",
        color: "#ffffff",
        padding: "10px 18px",
        borderRadius: "10px",
        fontSize: "13px",
        fontWeight: "500",
        fontFamily: "inherit",
        letterSpacing: "0.5px",
        cursor: "pointer",
        backdropFilter: "blur(12px)",
        transition: "0.3s ease",
      }}
    >
      Log Out
    </button>
  </Link>

</div>

        {/* HEADER */}

        <div className="dashboard-header"></div>

        {/* HEADER */}

        <div className="dashboard-header">

          <h1
            style={{
              fontSize: "5rem",
              fontWeight: "500",
              letterSpacing: "6px",
              marginBottom: "18px",
              marginLeft: "15px",
              color: "rgba(255,255,255,0.96)",
              fontFamily: "'Cormorant Garamond', serif",
              textTransform: "uppercase",
              textShadow: "0 0 30px rgba(255,255,255,0.08)"
            }}
          >
            Crime Analytics in India
          </h1>

          <p>
            Advanced Crime Intelligence & Data Science System
          </p>

        </div>

        {/* HERO CARD */}

        <div
          className="hero-card"
          onClick={() => navigate("/crime-records")}
        >

          <div className="hero-left">

            <span className="hero-tag">
              PRIMARY ANALYTICS MODULE
            </span>

            <h2>
              Crime Records Intelligence
            </h2>

            <p>
              District-wise IPC crime analytics engine
              processing NCRB datasets from 2001–2012.
            </p>

            <div className="hero-stats">

              <div>
                <h3>9017+</h3>
                <span>Crime Records</span>
              </div>

              <div>
                <h3>28</h3>
                <span>States Covered</span>
              </div>

              <div>
                <h3>12</h3>
                <span>Years Processed</span>
              </div>

            </div>

          </div>

          <div className="hero-right">

            <ResponsiveContainer width="100%" height={320}>
  <AreaChart data={visuals.yearly_crime}>

    <XAxis
      dataKey="YEAR"
      stroke="#71717a"
    />

    <YAxis stroke="#71717a" />

    <Tooltip />

    <Area
      type="monotone"
      dataKey="TOTAL IPC CRIMES"
      stroke="#991b1b"
      fill="#3f0d12"
      strokeWidth={3}
      animationDuration={2500}
    />

  </AreaChart>
</ResponsiveContainer>

          </div>

        </div>

        {/* GRID */}

        <div className="dashboard-grid">

          {/* STATES */}

          <div
            className="dashboard-card"
            onClick={() => navigate("/states-covered")}
          >

            <h2>States Covered</h2>

            <p>
              Geographic crime intelligence coverage across India.
            </p>

            <ResponsiveContainer width="78%" height={170}>
              <BarChart
                layout="vertical"
                data={visuals.state_crime.slice(0, 5)}
                margin={{ top: 5, right: 10, left: 10, bottom: 5 }}
              >

                <XAxis type="number" hide />

                <YAxis
                  type="category"
                  dataKey="STATE/UT"
                  stroke="#d1d5db"
                  width={90}
                  tick={{ fill: "#d1d5db", fontSize: 10 }}
                />

                <Tooltip />

                <Bar
                  dataKey="TOTAL IPC CRIMES"
                  fill="#7c3aed"
                  radius={[0, 6, 6, 0]}
                />

              </BarChart>
            </ResponsiveContainer>

          </div>

          {/* RESOURCES */}

          <div
            className="dashboard-card"
            onClick={() => (
              window.location.href = "/resources"
            )}
          >

            <h2>Resources</h2>

            <p>
              Crime category intelligence extracted from datasets.
            </p>

            <ResponsiveContainer width="78%" height={170}>
              <RadarChart data={visuals.crime_totals}>

                <PolarGrid stroke="#3f3f46" />

                <PolarAngleAxis
                  dataKey="crime"
                  tick={{ fill: "#d4d4d8", fontSize: 10 }}
                />

                <PolarRadiusAxis tick={false} />

                <Radar
                  dataKey="value"
                  stroke="#d97706"
                  fill="#92400e"
                  fillOpacity={0.7}
                />

              </RadarChart>
            </ResponsiveContainer>

          </div>

          {/* VISUALIZATION */}

          <div
            className="dashboard-card"
            onClick={() => navigate("/visualization")}
          >

            <h2>Visualization</h2>

            <p>
              Statistical visualization and crime correlation analytics.
            </p>

            <ResponsiveContainer width="78%" height={170}>
              <ScatterChart>

                <XAxis dataKey="MURDER" hide />
                <YAxis dataKey="THEFT" hide />

                <Tooltip />

                <Scatter
                  data={visuals.scatter_data.slice(0,120)}
                  fill="#7c3aed"
                />

              </ScatterChart>
            </ResponsiveContainer>

          </div>

          {/* CATALOG */}

          <div
            className="dashboard-card"
            onClick={() => navigate("/catalog")}
          >

            <h2>Catalog</h2>

            <p>
              IPC hierarchy and crime classification architecture.
            </p>

            <ResponsiveContainer width="78%" height={170}>
  <BarChart
    data={visuals.crime_totals}
    margin={{ top: 8, right: 10, left: -15, bottom: 0 }}
  >

    <CartesianGrid
      strokeDasharray="3 3"
      stroke="rgba(255,255,255,0.06)"
    />

    <XAxis
      dataKey="crime"
      tick={{ fill: "#d1d5db", fontSize: 9 }}
      stroke="#6b7280"
    />

    <YAxis hide />

    <Tooltip />

    <Bar
      dataKey="value"
      radius={[5, 5, 0, 0]}
    >

      {visuals.crime_totals.map((entry, index) => (
        <Cell
          key={`catalog-preview-${index}`}
          fill={
            [
              "#06b6d4",
              "#14b8a6",
              "#8b5cf6",
              "#f97316"
            ][index % 4]
          }
        />
      ))}

    </Bar>

  </BarChart>
</ResponsiveContainer>

          </div>

          {/* DOWNLOADS */}

          <div
            className="dashboard-card"
            onClick={() => navigate("/downloads")}
          >

            <h2>Times Downloaded</h2>

            <p>
              Dataset usage analytics and platform interaction metrics.
            </p>

            <ResponsiveContainer width="78%" height={170}>
              <AreaChart data={visuals.downloads}>

                <defs>

                  <linearGradient
                    id="downloadGlow"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >

                    <stop
                      offset="5%"
                      stopColor="#f59e0b"
                      stopOpacity={0.8}
                    />

                    <stop
                      offset="95%"
                      stopColor="#78350f"
                      stopOpacity={0}
                    />

                  </linearGradient>

                </defs>

                <XAxis
                  dataKey="day"
                  stroke="#9ca3af"
                  tick={{ fill: "#d1d5db", fontSize: 10 }}
                />

                <YAxis hide />

                <Tooltip />

                <Area
                  type="monotone"
                  dataKey="downloads"
                  stroke="#f59e0b"
                  fill="url(#downloadGlow)"
                  strokeWidth={3}
                />

              </AreaChart>
            </ResponsiveContainer>

          </div>

          {/* SAFETY */}

          
          <div
          className="dashboard-card"
          onClick={() => navigate("/safety-classification")}
          >

            <h2>Safety Classification</h2>

            <p>
              Risk assessment and intelligent safety classification.
            </p>

            <ResponsiveContainer width="78%" height={170}>
              <RadialBarChart
                innerRadius="20%"
                outerRadius="90%"
                data={visuals.safety_data}
                startAngle={180}
                endAngle={0}
              >

                <RadialBar
                  dataKey="value"
                  background
                  clockWise
                />

                <Tooltip />

              </RadialBarChart>
            </ResponsiveContainer>

          </div>

         </div>

        {/* FEATURE PREVIEW SECTION */}

<div className="feature-preview-section">

  {/* CRIME RECORDS */}

  <div className="preview-card">

    <div className="preview-left">

      <Activity
      size={26}
      strokeWidth={1.6}
      color="#ef4444"
      style={{ marginBottom: "14px" }}
      />

      <span>Crime Records Intelligence</span>

      <h2>Crime Records Intelligence</h2>

      <p>
        District-level IPC crime analytics showing yearly
        trend escalation extracted from NCRB datasets.
      </p>

      <button onClick={() => navigate("/crime-records")}>
        Analyze More
      </button>

    </div>

    <div className="preview-right">

      <ResponsiveContainer width="78%" height={170}>
        <AreaChart data={visuals.yearly_crime}>

          <XAxis dataKey="YEAR" />
          <YAxis />
          <Tooltip />

          <Area
            type="monotone"
            dataKey="TOTAL IPC CRIMES"
            stroke="#991b1b"
            fill="#3f0d12"
          />

        </AreaChart>
      </ResponsiveContainer>

    </div>

  </div>

  {/* STATES */}

  <div className="preview-card">

    <div className="preview-left">

      <MapPinned
      size={26}
      strokeWidth={1.6}
      color="#8b5cf6"
      style={{ marginBottom: "14px" }}
      />

      <span>States Covered</span>

      <h2>States Covered</h2>

      <p>
        State-wise crime density and geographic crime
        intelligence extracted from real NCRB records.
      </p>

      <button onClick={() => navigate("/states-covered")}>
        Analyze 
      </button>

    </div>

    <div className="preview-right">

      <ResponsiveContainer width="78%" height={170}>
        <BarChart
          layout="vertical"
          data={visuals.state_crime.slice(0,5)}
        >

          <XAxis type="number" hide />

          <YAxis
            type="category"
            dataKey="STATE/UT"
            width={90}
            tick={{ fill: "#d1d5db", fontSize: 10 }}
          />

          <Tooltip />

          <Bar
            dataKey="TOTAL IPC CRIMES"
            fill="#7c3aed"
            radius={[0, 6, 6, 0]}
          />

        </BarChart>
      </ResponsiveContainer>

    </div>

  </div>

  {/* RESOURCES */}

  <div className="preview-card">

    <div className="preview-left">

      <Database
      size={26}
      strokeWidth={1.6}
      color="#f59e0b"
      style={{ marginBottom: "14px" }}
      />

      <span>Resources</span>

      <h2>Resources</h2>

      <p>
        Crime category intelligence engine representing
        major IPC classifications from dataset analysis.
      </p>

      <button
      onClick={() => (
      window.location.href = "/resources"
      )}
>
        Analyze 
      </button>

    </div>

    <div className="preview-right">

      <ResponsiveContainer width="78%" height={170}>
        <RadarChart outerRadius={75} data={visuals.crime_totals}>

          <PolarGrid stroke="#374151" />

          <PolarAngleAxis
            dataKey="crime"
            tick={{ fill: "#d1d5db", fontSize: 10 }}
          />

          <Radar
            dataKey="value"
            stroke="#d97706"
            fill="#92400e"
            fillOpacity={0.6}
          />

        </RadarChart>
      </ResponsiveContainer>

    </div>

  </div>

  {/* VISUALIZATION */}

  <div className="preview-card">

    <div className="preview-left">

      <BarChart3
      size={26}
      strokeWidth={1.6}
      color="#06b6d4"
      style={{ marginBottom: "14px" }}
      />

      <span>Visualization</span>

      <h2>Visualization</h2>

      <p>
        Correlation mapping between violent and property
        crimes using statistical visualization pipelines.
      </p>

      <button onClick={() => navigate("/visualization")}>
        Analyze 
      </button>

    </div>

    <div className="preview-right">

      <ResponsiveContainer width="78%" height={170}>
        <ScatterChart>

          <XAxis dataKey="MURDER" />
          <YAxis dataKey="THEFT" />

          <Tooltip />

          <Scatter
            data={visuals.scatter_data.slice(0,120)}
            fill="#7c3aed"
          />

        </ScatterChart>
      </ResponsiveContainer>

    </div>

  </div>

  {/* CATALOG */}

  <div className="preview-card">

    <div className="preview-left">

      <BookOpen
      size={26}
      strokeWidth={1.6}
      color="#14b8a6"
      style={{ marginBottom: "14px" }}
      />

      <span>Catalog</span>

      <h2>Catalog</h2>

      <p>
        Structured IPC crime catalog architecture showing
        classification hierarchy and category distribution.
      </p>

      <button onClick={() => navigate("/catalog")}>
        Analyze 
      </button>

    </div>

    <div className="preview-right">

      <ResponsiveContainer width="78%" height={170}>
  <BarChart
    data={visuals.crime_totals}
    margin={{ top: 8, right: 10, left: -15, bottom: 0 }}
  >

    <CartesianGrid
      strokeDasharray="3 3"
      stroke="rgba(255,255,255,0.06)"
    />

    <XAxis
      dataKey="crime"
      tick={{ fill: "#d1d5db", fontSize: 9 }}
      stroke="#6b7280"
    />

    <YAxis hide />

    <Tooltip />

    <Bar
      dataKey="value"
      radius={[5, 5, 0, 0]}
    >

      {visuals.crime_totals.map((entry, index) => (
        <Cell
          key={`catalog-preview-${index}`}
          fill={
            [
              "#06b6d4",
              "#14b8a6",
              "#8b5cf6",
              "#f97316"
            ][index % 4]
          }
        />
      ))}

    </Bar>

  </BarChart>
</ResponsiveContainer>

    </div>

  </div>

  {/* DOWNLOADS */}

  <div className="preview-card">

    <div className="preview-left">

      <Download
      size={26}
      strokeWidth={1.6}
      color="#f97316"
      style={{ marginBottom: "14px" }}
      />

      <span>Downloads</span>

      <h2>Times Downloaded</h2>

      <p>
        Weekly platform interaction analytics showing
        intelligent dataset engagement activity.
      </p>

      <button onClick={() => navigate("/downloads")}>
        Analyze 
      </button>

    </div>

    <div className="preview-right">

      <ResponsiveContainer width="78%" height={170}>
  <AreaChart data={visuals.downloads}>

    <XAxis dataKey="day" />
    <YAxis />
    <Tooltip />

    <Area
      type="monotone"
      dataKey="downloads"
      stroke="#f59e0b"
      fill="#78350f"
    />

  </AreaChart>
</ResponsiveContainer>

    </div>

  </div>

  {/* SAFETY */}

  <div className="preview-card">

    <div className="preview-left">

      <Activity
      size={26}
      strokeWidth={1.6}
      color="#ef4444"
      style={{ marginBottom: "14px" }}
      />

      <span>Safety</span>

      <h2>Safety Classification</h2>

      <p>
        AI-assisted safety classification engine
        categorizing crime risk intensity levels.
      </p>

      <button onClick={() => navigate("/safety-classification")}>
        Analyze 
      </button>

    </div>

    <div className="preview-right">

      <ResponsiveContainer width="78%" height={170}>
        <RadialBarChart
          innerRadius="20%"
          outerRadius="90%"
          data={visuals.safety_data}
          startAngle={180}
          endAngle={0}
        >

          <RadialBar
            dataKey="value"
            background
            clockWise
          />

          <Tooltip />

        </RadialBarChart>
      </ResponsiveContainer>

    </div>

  </div>

</div>
        </div>

      </div>

   
  );
};

export default Dashboard;
