import React from "react";
import WorkoutActivity from "./WorkoutActivity";
import RunActivity from "./RunActivity";
import "../styles/index.css";

const ActivityFeed = () => {
  // Sample data, will be changed to take from database later
  const activities = [
    {
        type: "workout",
        id: 1,
        title: "Morning Workout",
        description: "A 30-minute session.",
        duration: 30,
    },
    {
        type: "run",
        id: 2,
        title: "Morning Run",
        description: "Ran in the park.",
        distance: 5,
        time: 25,
    },
    {
        type: "workout",
        id: 3,
        title: "evnening Yoga",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce nec magna iaculis, mattis eros sit amet, varius libero. Donec quis metus id eros efficitur porttitor",
        duration: 90,
    },
    {
        type: "run",
        id: 4,
        title: "intervals",
        description: "400x10 intervals with warmup and cooldown",
        distance: 13,
        time: 123,
    },
    {
        type: "run",
        id: 5,
        title: "Evening Jog",
        description: "A slow jog around the neighborhood.",
        distance: 3,
        time: 55.20,
      },
      {
        type: "workout",
        id: 6,
        title: "Workout",
        description: "Nulla mollis orci vel odio accumsan, a finibus neque elementum.",
        duration: 1.1,
    },

  ];

  const renderActivity = (activity) => {
    switch (activity.type) {
      case "workout":
        return <WorkoutActivity key={activity.id} workout={activity} />;
      case "run":
        return <RunActivity key={activity.id} run={activity} />;
      default:
        return null;
    }
  };

  return (
    <div className="activity-feed">
      <h2>Activity Feed</h2>
      <ul>
        {activities.map(renderActivity)}
      </ul>
    </div>
  );
};

export default ActivityFeed;

