
// src/pages/Activity.jsx
import React from "react";
import "../styles/index.css";
import ProgressBar from "../components/ProgressBar";
import RecentActivityFeed from "../components/RecentActivityFeed";
import ActivityFeed from "../components/ActivityFeed";
import ProfileCard from "../components/ProfileCard";
import Goals from "../components/Goals";
import ActivityList from "../components/ActivityList";
import Add from "../components/Add";
import GoalRunList from "../components/GoalComponent/GoalRunList";

const Activity = () => {
  return (
    <div className="activity-page-wrapper">
      <div className="activity-page-main">
      <ProgressBar/>
      <ActivityList/>
      </div> 
      
      <div className="activity-page-siebar">
      <Goals/>
      <Add />
      <GoalRunList />
      </div> 
      <div className="activity-page-empty"></div> 
    </div>
  );
};

export default Activity;
