import React from "react";
import "../styles/flex.css";
import ActivityFeed from "../components/ActivityFeed";


const TestFlex = () => {
    return (
      <div className="testflex">
            <nav className="nav">
                <ul className="navlinks">
                    <li>HERCULES</li>
                    <li>Home</li>
                    <li>Activity</li>
                </ul>
            </nav>
            <div className="container-content">
                <div className="main">
                    <div className="item">Item 1</div>
                    <div className="item">Item 2</div>
                    <ActivityFeed />
                </div>
                <div className="sidebar">
                    <div className="item">Sidebar item</div>
                </div>
            </div>
        </div>
    );
  };

  export default TestFlex;