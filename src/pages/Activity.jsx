
// src/pages/Activity.jsx
import React from "react";
import "../styles/index.css";
import ProgressBar from "../components/ProgressBarComponent/ProgressBar";
import Goals from "../components/GoalsDisplayComponent/Goals";
import ActivityList from "../components/TestingFolder/ActivityEarlyVersion/ActivityList";
import Add from "../components/Add";
import NewActivityList from "../components/ActivityFeedComponent/NewActivityFeed";

const Activity = () => {
  return (
    <div className="activity-page-wrapper">
            <div className="activity-page-empty"></div> 
      <div className="activity-page-main">
        <br/>
      <ProgressBar/>
      <br/>
          <NewActivityList/>
      </div> 
      
      <div className="activity-page-siebar">
        <br/>
      <Goals/>
      <Add />
      </div>
      <div className="activity-page-empty"></div> 
    </div>
  );
};

export default Activity;
