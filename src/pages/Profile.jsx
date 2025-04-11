import React from "react";
import ProfileBig from "../components/ProfileCardComponent/ProfileBig";

function Profile() {
    return (
    <div className="profile">
        <div className="profile-wrapper">
            <div className="profile-empty"></div>
            <div className="profile-main">
                <ProfileBig/>
            </div>
            <div className="profile-empty"></div>
        </div>
    </div>
    );
}

export default Profile;