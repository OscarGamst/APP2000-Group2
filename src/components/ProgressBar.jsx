import React from "react";
import ActivityItem from "./ActivityItem";
import "../styles/index.css";
import activities from "./ActivityData"; 

const ProgressBar = () => {
  // Feilhåndtering: Sjekk om activities finnes og ikke er tomt
  if (!activities || activities.length === 0) {
    return <div className="error-message">No activity data available.</div>;
  }
  const durations = activities.map((activity) => activity.duration);
  const totalDuration = durations.reduce((acc, duration) => acc + duration, 0);
  const goal = 1000;
  const progressPercentage = Math.min((totalDuration / goal) * 100, 100);
  const maxDuration = Math.max(...durations);
  const chartData = durations.map((duration) => (duration / maxDuration) * 100);

  return (
    <div className="progress-chart">
      <div className="header">
        <h2 className="title">Progress Last 30 days</h2>
      </div>
      <div className="progress-bar-container">
        {}
        <div className="progress-bar" style={{ width: `${progressPercentage}%` }}></div>
        {}
        <span className="progress-value">{totalDuration} / {goal}</span>
      </div>
      <div className="chart-container">
        {chartData.map((value, index) => (
          <div
            key={index}
            className="chart-bar"
            style={{ height: `${value}%` }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default ProgressBar;



