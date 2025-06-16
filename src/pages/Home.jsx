// src/pages/Dashboard.js
import React from "react";
import ProfileCard from "../components/ProfileCardComponent/ProfileCard";
import ProgressHomepg from "../components/ProgressDashboardComponent/ProgressHomepg";
import FollowerList from "../components/FollowerListComponent/FollowerList";
import GoalTab from "../components/GoalComponent/GoalTab";
import ActivityFeedHome from "../components/ActivityFeedComponent/ActivityFeedHome";

const Home = () => {
  return (
    <div className="home">
      <div className="home-wrapper"> {/* Flex wrapper */}
        <div className="flex-empty"></div> {/* Adds space to the side */}
          <div className="home-main"> {/* main content of HomePage */}
            <ProgressHomepg />
            <ActivityFeedHome />
          </div>        
          <div className="home-sidebar"> {/* Side content */}
            <ProfileCard />
            <FollowerList/>
            {/*<GoalTab />*/}
          </div>
          <div className="flex-empty"></div> {/* Adds space to the side */}
      </div>
    </div>
  );
};

export default Home;
