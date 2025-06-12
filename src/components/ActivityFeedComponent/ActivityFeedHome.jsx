import React, { useState, useEffect } from "react";
import ActivityItem from "./ActivityItem";
import "../../styles/index.css"

const ActivityFeedHome = () => {
    return (
    <div className="activity-feed">
        <h2>Activity Feed</h2>
        <ActivityItem />
    </div>    
    );
};

export default ActivityFeedHome;