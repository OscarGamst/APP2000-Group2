import React from "react";
import "../styles/index.css";

// Function to format the duration
const formatDuration = (durationInSeconds) => {
  const hours = Math.floor(durationInSeconds / 3600); // Convert to hours
  const minutes = Math.floor((durationInSeconds % 3600) / 60); // Convert to minutes
  const seconds = durationInSeconds % 60; // Get remaining seconds

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

const WorkoutActivity = ({ workout }) => {
  const formattedDuration = formatDuration(workout.duration * 60); // Time in minutes

  return (
    <div className="activity-item workout">
      <h4>{workout.title}</h4>
      <p>{workout.description}</p>
      <p><strong>Duration:</strong> {formattedDuration}</p>
    </div>
  );
};

export default WorkoutActivity;
