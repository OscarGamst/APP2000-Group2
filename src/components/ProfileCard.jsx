import React from "react";
import "../styles/index.css";
import default_pfp from "../pictures/default_pfp.png";

const ProfileCard = () => {

    return (
        <div className="profileCard">
            <div className="gradient"></div>
            <ul>
                
                <li><img src={default_pfp} alt=""/></li>
                <li className="profileTitle">
                <a href="/Profile" >Username</a>
                </li>
                <li className="profileDesc">
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolore et ipsum ...
                </li>
                <div className="profileStats">
                <ul>
                <li>
                    <label for="pfcfollowing">Following: </label>
                    <a href="" >69</a>
                </li>
                <li>
                    <label for="pfcfollowers">Followers: </label>
                    <a href="" >3</a>
                </li>
                <li>
                    <label for="pfcposts">Posts: </label>
                    <a href="">999</a>
                </li>
                </ul>
                </div>
            </ul>
        </div>
    );
};

export default ProfileCard;