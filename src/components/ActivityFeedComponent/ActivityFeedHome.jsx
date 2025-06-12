import React, { useState, useEffect } from "react";
import ActivityItem from "./ActivityItem";
import ActivityItemFriends from "./ActivityItemFriends";
import "../../styles/index.css"
import FetchActivities from "./FetchActivity";



const ActivityFeedHome = () => {

    //Variable that controls which feed should be shown
    const [feedType, setFeedType]=useState("friends");

    return (
    <div className="activity-feed">
        <h2>Activity Feed</h2>
        <form>
            <label>Sort by: </label>
            <select
                id="feedType"
                name="feedType"
                value={feedType}
                onChange={(e)=>setFeedType(e.target.value)}
                >
                <option value="friends">Friends</option>
                <option value="mine">Mine</option>
            </select>
        </form>
        {(feedType==="mine")? <ActivityItem />:<ActivityItemFriends/>}
    </div>
    );
    };

export default ActivityFeedHome;