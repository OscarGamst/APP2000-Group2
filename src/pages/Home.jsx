// src/pages/Dashboard.js
import React from "react";
import ActivityFeed from "../components/ActivityFeed";
import SideBar from "../components/SideBar";
import ProfileCard from "../components/ProfileCard";

const Home = () => {
  return (
    <div className="home">
      <div className="home-wrapper">
        <div className="home-main">
        <ActivityFeed />
        </div>        
        <div className="home-sidebar">
          <ProfileCard />
          </div>
        
      </div>
    </div>
  );
};

export default Home;
