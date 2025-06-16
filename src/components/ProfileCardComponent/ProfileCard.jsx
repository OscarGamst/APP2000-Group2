import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import "../../styles/index.css";
import default_pfp from "../../pictures/default_pfp.png";
import axios from "axios";

const ProfileCard = () => {
    //brukerdata
    const [user,setUser] = useState(null);
    const [followerCount, setFollowerCount] = useState();
    const [followingCount, setFollowingCount] = useState();
    const [activityCount, setActivityCount] = useState();

    useEffect(()=> {
        const storedUser = localStorage.getItem("loggedInUser");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    },[]);

    const fetchFollower = async () => { // må bruke backticks `` for å flette inn verdien
        try {
            const result = await axios.get(`api/social/followers/${user.username}`) 
            setFollowerCount(result.data.length);
        } catch (err) {
            console.error(err)
        }
    }

    const fetchFollowing = async () => {
        const result = await axios.get(`api/social/following/${user.username}`)
        setFollowingCount(result.data.length);
    }
    /*
    const fetchActivityCount = async () => {
        const result1 = await axios.get(`/api/activity/allActivitiesWeightlifting/${user.username}`)
        const result2 = await axios.get(`/api/activity/allActivitiesRuns/${user.username}`)
        const result3 = await axios.get(`/api/activity/allActivitiesCombined/${user.username}`)
        setActivityCount(result1.data.length + result2.data.length + result3.data.length);
    }
    */

    useEffect(() => {
        if (user) {
        fetchFollower();
        fetchFollowing();
        }
    },[user]);



    return (
        <div className="profileCard">
            <div className="gradient"></div>
            <ul>
                
                <li><img src={default_pfp} alt=""/></li>
                <li className="profileTitle">
                <a href="/Profile" >{user ? user.username : "Loading.."}</a>
                </li>
                <div className="profileStats">
                <ul>
                <li>
                    <label htmlFor="pfcfollowers">Followers: </label>
                    <a href="" >{followerCount?followerCount:0}</a>
                </li>
                <li>
                    <label htmlFor="pfcfollowing">Following: </label>
                    <a href="" >{followingCount?followingCount:0}</a>
                </li>
                </ul>
                </div>
            </ul>
        </div>
    );
};

export default ProfileCard;