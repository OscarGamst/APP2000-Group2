import React from "react";
import ProfilePageComponent from "../components/ProfileCardComponent/ProfilePageComponent"
import "../styles/responsive.css";
import { useState } from "react";
import ProfilePageEdit from "../components/ProfileCardComponent/ProfilePageEdit";

function Profile() {
    const [editing, setEditing] = useState(false);

    return (
    <div className="profile">
        <div className="profile-wrapper">
            <div className="profile-empty"></div>
            <div className="profile-main">
                {!editing ? <ProfilePageComponent/> : <ProfilePageEdit/>}
                
                <button onClick={()=>setEditing(!editing)}className="user-auth-button">
                    {editing ? "Exit" : "Edit"}
                </button>
                
            </div>
            <div className="profile-empty"></div>
        </div>
    </div>
    );
}

export default Profile;