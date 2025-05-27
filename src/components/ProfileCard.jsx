import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import "../styles/index.css";
import default_pfp from "../pictures/default_pfp.png";

const ProfileCard = () => {
    //brukerdata
        const [user,setUser] = useState(null);
        useEffect(()=> {
            const storedUser = localStorage.getItem("loggedInUser");
            if (storedUser) {
                setUser(JSON.parse(storedUser));
            }
        },[]);


    return (
        <div className="profileCard">
            <div className="gradient"></div>
            <ul>
                
                <li><img src={default_pfp} alt=""/></li>
                <li className="profileTitle">
                <a href="/Profile" >{user ? user.username : "Loading.."}</a>
                </li>
                <li className="profileDesc">
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolore et ipsum ...
                </li>
                <div className="profileStats">
                <ul>
                <li>
                    <label htmlFor="pfcfollowing">Following: </label>
                    <a href="" >69</a>
                </li>
                <li>
                    <label htmlFor="pfcfollowers">Followers: </label>
                    <a href="" >3</a>
                </li>
                <li>
                    <label htmlFor="pfcposts">Posts: </label>
                    <a href="">999</a>
                </li>
                </ul>
                </div>
            </ul>
        </div>
    );
};

export default ProfileCard;