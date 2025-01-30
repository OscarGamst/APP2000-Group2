
// src/pages/Activity.jsx
import React from "react";
import "../styles/index.css";
import ProgressBar from "../components/ProgressBar";
import RecentActivityFeed from "../components/RecentActivityFeed";

const Activity = () => {
  return (
    <div className="activity-page-wrapper">
      <div className="activity-page-main">
        <ProgressBar />
        <RecentActivityFeed />
      </div>
        <ProgressBar />
      <div className="activity-page-siebar">

      </div>
    </div>
  );
};

export default Activity;
