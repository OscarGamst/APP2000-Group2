import React from "react";
import ActivityItem from "./ActivityItem";
import "../styles/index.css";
import activities from "./ActivityData";

const ActivityFeed = () => {
  return (
    <div className="activity-feed">
      <h2>Activity Feed</h2>
      {activities.map((activity) => (
        <ActivityItem key={activity.id} activity={activity} />
      ))}
    </div>
  );
};

export default ActivityFeed;