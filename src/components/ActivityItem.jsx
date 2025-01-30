// Function to format the duration
import React from "react";
import "../styles/index.css";
import { FormatDuration } from "./FormatDuration";

const getActivityClass = (type) => {
  switch (type) {
    case "workout":
      return "activity-workout";
    case "run":
      return "activity-run";
    default:
      return "activity-default";
  }
};

const ActivityItem = ({ activity }) => {
  return (
    <div className={`activity-item ${getActivityClass(activity.type)}`}>
      <h4>{activity.title}</h4>
      <p>{activity.description}</p>
      <p><strong>Duration:</strong> {FormatDuration(activity.duration)}</p>
      {activity.distance !== undefined && <p><strong>Distance:</strong> {activity.distance} km</p>}
      <div className="activity-social">
        <button> Like</button>
        <button> Comment</button>
      </div>
    </div>
  );
};

export default ActivityItem;

