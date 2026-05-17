import React from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

const Dashboard = () => {
  const navigate = useNavigate();

  const cards = [
    {
      title: "Crime Records",
      desc: "Interactive analytics and major crime trends",
      route: "/crime-records",
    },
    {
      title: "States Covered",
      desc: "State-wise crime intelligence visualization",
      route: "/states-covered",
    },
    {
      title: "Resources",
      desc: "Download datasets, reports and CSV resources",
      route: "/resources",
    },
    {
      title: "Visualization",
      desc: "Community-created charts and graphs",
      route: "/visualization",
    },
    {
      title: "Catalog",
      desc: "Major crime categories and insights",
      route: "/catalog",
    },
    {
      title: "Times Downloaded",
      desc: "Dataset download analytics",
      route: "/downloads",
    },
    {
      title: "Safety Classification",
      desc: "Crime severity and city safety analysis",
      route: "/safety",
    },
  ];

  return (
    <div className="dashboard-page">
      <div className="dashboard-overlay">

        <div className="dashboard-header">
          <h1>Crime Intelligence Dashboard</h1>

          <p>
            Advanced Crime Analytics & Data Science Platform
          </p>
        </div>

        <div className="dashboard-grid">
          {cards.map((card, index) => (
            <div
              key={index}
              className="dashboard-card"
              onClick={() => navigate(card.route)}
            >
              <h2>{card.title}</h2>

              <p>{card.desc}</p>

              <span>Explore →</span>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Dashboard;