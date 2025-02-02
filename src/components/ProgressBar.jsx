import React from "react";
import ActivityItem from "./ActivityItem"; // Import the merged component
import "../styles/index.css";
import activities from "./ActivityData"; 


const ProgressBar = () => {
  // Extracting durations for the chart
  const durations = activities.map((activity) => activity.duration);

  // Normalize durations to percentages (max height 100%)
  const maxDuration = Math.max(...durations);
  const chartData = durations.map((duration) => (duration / maxDuration) * 100);

  return (
    <div className="progress-chart">
      <div className="header">
        <h2 className="title">Progress Last 30 days</h2>
        <button className="filter-button">Filter</button>
      </div>
      <div className="progress-bar-container">
        <div className="progress-bar" style={{ width: "50%" }}></div>
        <span className="progress-value">249</span>
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



