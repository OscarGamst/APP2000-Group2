import React, { useState, useEffect } from "react";
import ActivityItem from "./ActivityItem";
import "../styles/index.css";
import "../styles/responsive.css";
import activities from "./ActivityFeedData";

const ActivityFeed = () => { 
    
    useEffect(() => {
        const storedUser = localStorage.getItem("loggedInUser");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    const [showFollowing, setShowFollowing] = useState(false);
    const [User, setUser] = useState(); // Just a basic placeholder, until we have log in
    },[]);

    const toggleFilter = () => {
    setShowFollowing(!showFollowing);
    };

    // change placeholder to change user
    const filteredActivities = activities.filter((activity) => 
    showFriends ? activity.username !== user : activity.username === user
    );

    return (
    <div className="activity-feed">
        <h2>Activity Feed</h2>
        <button onClick={toggleFilter}> 
        {showFriends ? "Friends Activities" : "My Activities"} 
        </button>
        {filteredActivities.map((activity) => (
        <ActivityItem key={activity.id} activity={activity} />
        ))}
    </div>
    );
    };

export default ActivityFeed;