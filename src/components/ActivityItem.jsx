import React from "react";
import "../styles/index.css";

// Function to format the duration
const formatDuration = (durationInSeconds) => {
  const hours = Math.floor(durationInSeconds / 3600);
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

const ActivityItem = ({ activity }) => {
  const formattedDuration = formatDuration(activity.duration ? activity.duration * 60 : activity.time * 60);

  return (
    <div className={`activity-item ${activity.type}`}>
      <h4>{activity.title}</h4>
      <p>{activity.description}</p>
      <p><strong>Duration:</strong> {formattedDuration}</p>
      {activity.distance !== undefined && <p><strong>Distance:</strong> {activity.distance} km</p>}
      <div className="activity-social">
        <ul>
            <li><button>Like</button></li>
            <li><button>Comment</button></li>
        </ul>
      </div>
    </div>
  );
};

export default ActivityItem;

