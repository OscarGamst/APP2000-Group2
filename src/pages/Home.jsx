// src/pages/Dashboard.js
import React from "react";
import ActivityFeed from "../components/ActivityFeed";
import SideBar from "../components/SideBar";
import ProfileCard from "../components/ProfileCard";
import ProgressHomepg from "../components/ProgressHomepg";
import FidgetSpinner from "../components/FidgetSpinner";

const Home = () => {
  return (
    <div className="home">
      <div className="home-wrapper">
      <div className="flex-empty"></div>
        <div className="home-main">
          <ProgressHomepg />
          <ActivityFeed />
        </div>        
        <div className="home-sidebar">
          <ProfileCard />
        </div>
        <div className="flex-empty"></div>
      </div>
    </div>
  );
};

export default Home;
