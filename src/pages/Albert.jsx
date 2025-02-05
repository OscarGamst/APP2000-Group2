import React from "react";
import "../styles/index.css";
import BertComponent from "../components/ProfileBigEdit";
import ProfileCard from "../components/ProfileCard";
import ActivityFeed from "../components/ActivityFeed";

function Albert() {
    return (
        <div className="home">
        <div className="home-wrapper">
        <div className="flex-empty"></div>
            <div className="home-main">
            
            <BertComponent />
            </div>        
            <div className="home-sidebar">
            
            <br/>
            
            </div>
            <div className="flex-empty"></div>
        </div>
        </div>
    );
    };

export default Albert;