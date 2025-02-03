import React, { useState } from "react";
import ActivityItem from "./ActivityItem";
import "../styles/index.css";
import "../styles/responsive.css";
import activities from "./ActivityData";

const ActivityFeed = () => { 
  const [showFriends, setShowFriends] = useState(false);
  const [loggedInUser] = useState("Username"); // Just a basic placeholder, until we have log in

  const toggleFilter = () => {
    setShowFriends(!showFriends);
  };

  // change placeholder to change user
  const filteredActivities = activities.filter((activity) => 
    showFriends ? activity.username !== loggedInUser : activity.username === loggedInUser
  );

  return (
    <div className="activity-feed">
      <h2>Activity Feed</h2>
      <button onClick={toggleFilter}> 
        {showFriends ? "Friends Activities" : "My Activities"} 
      </button>
      {filteredActivities.map((activity) => (
        <ActivityItem key={activity.id} activity={activity} />
      ))}
    </div>
  );
};

export default ActivityFeed;





