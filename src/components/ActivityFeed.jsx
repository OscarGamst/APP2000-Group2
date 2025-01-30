import React, { useState } from "react";
import ActivityItem from "./ActivityItem";
import "../styles/index.css";
import activities from "./ActivityData";

const ActivityFeed = () => { 
  const [showFriends, setShowFriends] = useState(false); //sets showfriends to false (will show "myActivites")

  const toggleFilter = () => {
    setShowFriends(!showFriends); // changes the state (true/false)
  };

  return (
    <div className="activity-feed">
      <h2>Activity Feed</h2>
      <button id="filter-activity" onClick={toggleFilter}> {/*Triggers the filter function */}
        {showFriends ? "Friends Activities" : "My Activities"} {/*button changes names based on state */}
      </button>
      {activities
        .filter((activity) => (showFriends ? activity.username === false : activity.username === true))
        .map((activity) => (
          <ActivityItem key={activity.id} activity={activity} />
        ))}
    </div>
  );
};

export default ActivityFeed;





