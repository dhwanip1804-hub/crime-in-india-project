import React, {
  useEffect,
  useMemo,
  useState
} from "react";

import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

import { motion } from "framer-motion";

import backgroundImage from "../assets/background.jpg";

const COLORS = [
  "#7f1d1d",
  "#92400e",
  "#1e3a5f",
  "#164e63",
  "#52525b",
];

export default function CrimeRecords() {

  const [processedData, setProcessedData] = useState(null);

  const [selectedState, setSelectedState] = useState("");

  useEffect(() => {

    fetch("http://localhost:5001/api/crime-records")
      .then((res) => res.json())
      .then((data) => {
        setProcessedData(data);
      })
      .catch((err) => {
        console.error(err);
      });

  }, []);

  const topStates = useMemo(() => {

    if (!processedData) return [];

    return Object.entries(processedData.top_states).map(
      ([state, value]) => ({
        state,
        value,
      })
    );

  }, [processedData]);

  const yearlyTrend = processedData
    ? Object.entries(processedData.yearly_trend).map(
        ([year, value]) => ({
          year,
          value,
        })
      )
    : [];

  const insight = processedData
    ? processedData.crime_insight
    : {};

  useEffect(() => {

    if (topStates.length > 0 && !selectedState) {
      setSelectedState(topStates[0].state);
    }

  }, [topStates, selectedState]);

  const selectedStateData = useMemo(() => {

    return (
      topStates.find(
        (item) => item.state === selectedState
      ) || topStates[0] || {}
    );

  }, [selectedState, topStates]);

  if (!processedData) {

    return (
      <div className="min-h-screen bg-[#07111f]" />
    );

  }

  const getClassification = (value) => {

    if (value > 1000000) return "Critical";
    if (value > 500000) return "High";
    if (value > 200000) return "Moderate";

    return "Low";
  };

  const getObservation = (state) => {

    const observations = {

      Maharashtra:
        "Large metropolitan concentration and rapid urban growth contributed to elevated crime intensity across multiple districts.",

      Gujarat:
        "Industrial and commercial activity showed increased financial and theft-related crime patterns over time.",

      Delhi:
        "The capital region reflected strong fluctuations associated with population density and metropolitan expansion.",

      Karnataka:
        "Technology-oriented urban regions demonstrated gradual growth in cyber-related crime activity after 2008.",

      "Uttar Pradesh":
        "Large district spread and population distribution produced consistently high crime record accumulation."
    };

    return (
      observations[state] ||
      "Crime records indicate mixed regional and urban activity patterns throughout the dataset period."
    );
  };

  return (

    <div
      className="min-h-screen text-white px-6 py-8 bg-cover bg-center bg-fixed"
      style={{
        backgroundImage: `
          linear-gradient(
            rgba(7,11,18,0.22),
            rgba(7,11,18,0.38)
          ),
          url(${backgroundImage})
        `,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >

      <div className="flex items-center justify-between mb-14">

        <button
          onClick={() => (window.location.href = "/dashboard")}
          className="border border-white/10 bg-black/20 hover:bg-black/40 transition-all duration-300 px-5 py-3 rounded-2xl backdrop-blur-xl"
        >
          ← Back To Dashboard
        </button>

        <div className="text-sm text-gray-400 hidden md:block">
          NCRB DATASET · 2001 — 2012
        </div>

      </div>

      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-5xl mb-16"
      >

        <p className="uppercase text-sm tracking-[6px] text-red-300 mb-5">
          Crime Intelligence System
        </p>

        <h1
          className="text-[5rem] leading-[0.95] mb-8"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 500,
          }}
        >
          Crime Records
          <br />
          Intelligence
        </h1>

        <p className="text-lg text-gray-300 leading-relaxed max-w-3xl">
          Analytical exploration of district-wise IPC crime records
          processed through Python-based data science pipelines using
          NCRB datasets between 2001 and 2012.
        </p>

      </motion.div>

      <div className="grid grid-cols-1 xl:grid-cols-[1.3fr_0.7fr] gap-8 mb-14">

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-black/25 border border-white/10 rounded-[36px] p-8 backdrop-blur-xl shadow-2xl"
        >

          <div className="h-[500px]">

            <ResponsiveContainer width="100%" height="100%">

              <AreaChart data={topStates}>

                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="rgba(255,255,255,0.05)"
                />

                <XAxis
                  dataKey="state"
                  stroke="#9ca3af"
                />

                <YAxis
                  stroke="#9ca3af"
                />

                <Tooltip />

                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#ef4444"
                  fill="#7f1d1d"
                  fillOpacity={0.35}
                  strokeWidth={3}
                />

              </AreaChart>

            </ResponsiveContainer>

          </div>

        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex flex-col gap-6"
        >

          <div className="bg-black/25 border border-white/10 rounded-[36px] p-7 backdrop-blur-xl">

            <p className="uppercase tracking-[4px] text-sm text-red-300 mb-5">
              Interactive State Explorer
            </p>

            <div className="flex flex-wrap gap-3 mb-7">

              {topStates.slice(0, 6).map((item) => (

                <button
                  key={item.state}
                  onClick={() => setSelectedState(item.state)}
                  className={`px-4 py-3 rounded-2xl transition-all duration-300 text-sm border ${
                    selectedState === item.state
                      ? "bg-red-900/40 border-red-500/40 text-red-200"
                      : "bg-white/5 border-white/10 hover:bg-white/10"
                  }`}
                >
                  {item.state}
                </button>

              ))}

            </div>

            <motion.div
              key={selectedState}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >

              <h2
                className="text-5xl mb-4"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                }}
              >
                {selectedState}
              </h2>

              <p className="text-gray-300 leading-relaxed mb-7">
                {getObservation(selectedState)}
              </p>

              <div className="grid grid-cols-2 gap-4">

                <div className="bg-white/5 border border-white/10 rounded-2xl p-5">

                  <p className="text-gray-400 text-sm mb-2">
                    Estimated Records
                  </p>

                  <h3 className="text-2xl font-semibold text-red-300">
                    {selectedStateData.value?.toLocaleString()}
                  </h3>

                </div>

                <div className="bg-white/5 border border-white/10 rounded-2xl p-5">

                  <p className="text-gray-400 text-sm mb-2">
                    Classification
                  </p>

                  <h3 className="text-2xl font-semibold text-amber-300">
                    {getClassification(selectedStateData.value || 0)}
                  </h3>

                </div>

              </div>

            </motion.div>

          </div>

          <div className="bg-gradient-to-br from-red-950/40 to-black/30 border border-red-500/10 rounded-[36px] p-7 backdrop-blur-xl">

            <p className="uppercase tracking-[4px] text-sm text-red-300 mb-5">
              Intelligence Observation
            </p>

            <h2
              className="text-4xl leading-tight mb-5"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
              }}
            >
              {insight.most_dangerous_state}
            </h2>

            <p className="text-gray-300 leading-relaxed">
              {insight.insight}
            </p>

          </div>

        </motion.div>

      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">

        <div className="bg-black/25 border border-white/10 rounded-[36px] p-8 backdrop-blur-xl">

          <div className="h-[360px]">

            <ResponsiveContainer width="100%" height="100%">

              <AreaChart data={yearlyTrend}>

                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="rgba(255,255,255,0.05)"
                />

                <XAxis
                  dataKey="year"
                  stroke="#9ca3af"
                />

                <YAxis
                  stroke="#9ca3af"
                />

                <Tooltip />

                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#d97706"
                  fill="#78350f"
                  fillOpacity={0.4}
                  strokeWidth={3}
                />

              </AreaChart>

            </ResponsiveContainer>

          </div>

        </div>

        <div className="bg-black/25 border border-white/10 rounded-[36px] p-8 backdrop-blur-xl">

          <div className="h-[360px]">

            <ResponsiveContainer width="100%" height="100%">

              <PieChart>

                <Pie
                  data={topStates.slice(0, 5)}
                  dataKey="value"
                  nameKey="state"
                  outerRadius={125}
                >

                  {topStates.slice(0, 5).map((entry, index) => (

                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />

                  ))}

                </Pie>

                <Tooltip />

              </PieChart>

            </ResponsiveContainer>

          </div>

        </div>

      </div>

    </div>
  );
}