import React from "react";
import "../styles/index.css";
import default_pfp from "../pictures/default_pfp.png";

const BertComponent = () => {
    return (
        <div className="profileCard">
            <div className="gradient"></div>
            <ul>
                <li></li>
                <li><img src={default_pfp} alt=""/></li>
                <li className="profileTitle">Username</li>
                <li>
                    <label>First name: </label>
                    
                </li>
                <li>
                    <label>Last name: </label>

                </li>
                <li>
                    <label>E-mail: </label>

                </li>
                <li>
                    <label>Birthday: </label>

                </li>
                <li>
                    <label>Profile visibility: </label>

                </li>
            </ul>
        </div>
    );
};

export default BertComponent;