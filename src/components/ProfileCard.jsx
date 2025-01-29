import React from "react";
import "../styles/index.css";
import default_pfp from "../components/default_pfp.png";

const ProfileCard = () => {

    return (
        <div className="profileCard">
            <div className="gradient"></div>
            <ul>
                <li className="profileDown"></li>
                <li><img src={default_pfp} alt=""/></li>
                <li className="profileTitle">
                <a href="" >Username</a>
                </li>
                <li className="profileDesc">
                    asdfasdf
                </li>
                <div className="profileFollow">
                <li>
                    <label for="following">Following: </label>
                    <a href="" >69</a>
                </li>
                <li>
                    <label for="followers">Followers: </label>
                    <a href="" >3</a>
                </li>
                </div>
            </ul>
        </div>
    );
};

export default ProfileCard;