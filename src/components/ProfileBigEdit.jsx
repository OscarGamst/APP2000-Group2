import React from "react";
import "../styles/index.css";
import default_pfp from "../pictures/default_pfp.png";

const ProfileBigEdit = () => {
    return (
        <div className="profileBig" >
            <div className="gradient"></div> {/*du finnern ved css for profileCard*/}
            <ul>

                <div id="profileBigTop">
                    <li><img src={default_pfp} alt=""/></li>
                    <li id="profileBigTitle">
                        Username
                    </li>
                </div>

                <div className="profileBigRest">
                    <li className="profileGrid">
                        <div className="profileGridEmpty"></div>
                        <label>First name: </label>
                        <input type="text"/>
                        <div className="profileGridEmpty"></div>
                    </li>
                    <li className="profileGrid">
                        <div className="profileGridEmpty"></div>
                        <label>Last name: </label>
                        <input type="text"/>
                        <div className="profileGridEmpty"></div>
                    </li>
                    <li className="profileGrid">
                        <div className="profileGridEmpty"></div>
                        <label>E-mail: </label>
                        <input type="text"/>
                        <div className="profileGridEmpty"></div>
                    </li>
                    <li className="profileGrid">
                        <div className="profileGridEmpty"></div>
                        <label>Birthday: </label>
                        <input type="date"/>
                        <div className="profileGridEmpty"></div>
                    </li>
                    <li className="profileGrid">
                        <div className="profileGridEmpty"></div>
                        <label>Profile visibility: </label>
                        <select name="profileVisibility">
                            <option value="public">Public</option>
                            <option value="private">Private</option>
                        </select>
                        <div className="profileGridEmpty"></div>
                    </li>
                </div>

                <li>
                    <button>Submit</button>
                </li>

            </ul>
        </div>
    );
};

export default ProfileBigEdit;