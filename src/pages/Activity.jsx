
// src/pages/Activity.jsx
import React from "react";
import "../styles/index.css";
import ProgressBar from "../components/ProgressBarComponent/ProgressBar";
import ActivityFeed from "../components/TestingFolder/ActivityEarlyVersion/ActivityFeed";
import ProfileCard from "../components/ProfileCardComponent/ProfileCard";
import Goals from "../components/GoalsDisplayComponent/Goals";
import ActivityList from "../components/TestingFolder/ActivityEarlyVersion/ActivityList";
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
      </div>
      <div className="activity-page-empty"></div> 
    </div>
  );
};

export default Activity;
