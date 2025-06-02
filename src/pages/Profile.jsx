import React from "react";
import ProfileBig from "../components/ProfileCardComponent/ProfileBig";
import ProfilePageComponent from "../components/ProfileCardComponent/ProfilePageComponent"
import "../styles/responsive.css";
import FollowerList from "../components/FollowerListComponent/FollowerList";

function Profile() {
    return (
    <div className="profile">
        <div className="profile-wrapper">
            <div className="profile-empty"></div>
            <div className="profile-main">
                <ProfilePageComponent/>
                {/* <FollowerList followersOrFollowing={}/> */}
            </div>
            <div className="profile-empty"></div>
        </div>
    </div>
    );
}

export default Profile;