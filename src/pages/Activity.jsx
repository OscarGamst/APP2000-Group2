
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
import GoalTab from "../components/GoalComponent/GoalTab";
import NewActivityList from "../components/ActivityFeedComponent/NewActivityFeed";

const Activity = () => {
  return (
    <div className="activity-page-wrapper">
      <div className="activity-page-main">
      <ProgressBar/>
          <NewActivityList/>
      <ActivityList/>
      </div> 
      
      <div className="activity-page-siebar">
      <Goals/>
      <Add />
      <GoalTab />
      </div>
      <div className="activity-page-empty"></div> 
    </div>
  );
};

export default Activity;
