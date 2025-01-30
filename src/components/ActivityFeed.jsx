import React from "react";
import ActivityItem from "./ActivityItem"; // Import the merged component
import "../styles/index.css";
import activities from "./ActivityData"; 

const ActivityFeed = () => {
  return (
    <div className="activity-feed">
      <h2>Activity Feed</h2>
      <ul>
        {activities.map((activity) => (
          <ActivityItem key={activity.id} activity={activity} />
        ))}
      </ul>
    </div>
  );
};

export default ActivityFeed;