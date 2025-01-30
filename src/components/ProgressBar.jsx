import React from "react";
import ActivityItem from "./ActivityItem"; // Import the merged component
import "../styles/index.css";
import activities from "./ActivityData"; 

const ProgressBar = () => {
  return (
            <div className="progress-section">
                <h3>Progress Last 30 Days</h3>
                <div className="progress-chart"> [chart] </div>
                <div className="chart-placeholder"></div>
            </div>
       
  );
};

export default ProgressBar;
