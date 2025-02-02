import React, { useState } from "react";
import activities from "./ActivityData";
import "../styles/index.css";

const ActivityList = () => {
  const [visibleActivities, setVisibleActivities] = useState(3);

  const showMoreActivities = () => {
    setVisibleActivities((prev) => prev + 3);
  };

  return (
    <div className="activity-list-container">
      <h2 className="activity-list-header">Activities Last 30 Days</h2>
      <hr className="divider" />
      {activities.slice(0, visibleActivities).map((activity) => (
        <div key={activity.id} className="activity-item">
          <h3>{activity.title}</h3>
          <p>
            <strong>Type:</strong> {activity.type}
          </p>
          {activity.distance && (
            <p>
              <strong>Distance:</strong> {activity.distance} km
            </p>
          )}
          <p>
            <strong>Duration:</strong> {Math.floor(activity.duration / 60)} hrs {activity.duration % 60} min
          </p>
          <p>
            <strong>Description:</strong> {activity.description}
          </p>
          <hr className="divider" />
        </div>
      ))}
      {visibleActivities < activities.length && (
        <button className="show-more-button" onClick={showMoreActivities}>
          Show more
        </button>
      )}
    </div>
  );
};

export default ActivityList;
