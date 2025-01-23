import React from "react";
import "../styles/index.css";


// Function to format the duration
const formatDuration = (durationInSeconds) => {
  const hours = Math.floor(durationInSeconds / 3600); // 1 hour = 3600 seconds
  const minutes = Math.floor((durationInSeconds % 3600) / 60);
  const seconds = durationInSeconds % 60;

  let formattedDuration = "";

  if (hours > 0) {
    formattedDuration += `${hours}h `;
  }
  if (minutes > 0) {
    formattedDuration += `${minutes}min `;
  }
  if (seconds > 0 || (hours === 0 && minutes === 0)) {
    formattedDuration += `${seconds}s`;
  }

  return formattedDuration;
};

const RunActivity = ({ run }) => {
  const formattedDuration = formatDuration(run.time * 60); // Time in minutes

  return (
    <div className="activity-item run">
      <h4>{run.title}</h4>
      <p>{run.description}</p>
      <p><strong>Duration:</strong> {formattedDuration}</p>
      <p><strong>Distance:</strong> {run.distance} km</p>
    </div>
  );
};

export default RunActivity;
