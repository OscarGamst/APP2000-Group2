import React from "react";
import ActivityItem from "./ActivityEarlyVersion/ActivityItem"; // Import the merged component
import "../../styles/index.css";
import activities from "./ActivityEarlyVersion/ActivityData"; 

const RecentActivityFeed = () => {
  return (
    <div className="activities-section">
        <h3>Recent Activities</h3>

        {activities.slice(0,3).map((activity) => (
          <ActivityItem key={activity.id} activity={activity} />
        ))}
  </div>
  );
};

export default RecentActivityFeed;
