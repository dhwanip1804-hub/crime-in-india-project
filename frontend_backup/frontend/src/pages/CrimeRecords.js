import React from "react";
import data from "../data/crime_trends.json";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell, Legend
} from "recharts";

const COLORS = ["#3b82f6", "#22c55e", "#f59e0b", "#ef4444", "#a855f7"];

const CrimeRecords = () => {
  return (
    <div className="min-h-screen bg-black text-white p-8">

      <h1 className="text-3xl font-bold mb-6">Crime Records Analysis</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

        <div className="bg-gray-900 p-6 rounded-xl">
          <h2 className="mb-4">Crimes by Category</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <XAxis dataKey="crime" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-gray-900 p-6 rounded-xl">
          <h2 className="mb-4">Trend Over Time</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip />
              <Line dataKey="count" stroke="#22c55e" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-gray-900 p-6 rounded-xl">
          <h2 className="mb-4">Crime Distribution</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={data} dataKey="count" nameKey="crime" outerRadius={100}>
                {data.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Legend />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-gray-900 p-6 rounded-xl">
          <h2 className="mb-4">Top Crimes</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data.slice(0, 5)}>
              <XAxis dataKey="crime" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#f59e0b" />
            </BarChart>
          </ResponsiveContainer>
        </div>

      </div>

    </div>
  );
};

export default CrimeRecords;
