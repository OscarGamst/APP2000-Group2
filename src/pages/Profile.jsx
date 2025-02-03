import React from "react";
import ProfileBigEdit from "../components/ProfileBigEdit";

function Profile() {
    return (
    <div className="profile">
        <div className="profile-wrapper">
            <div className="profile-empty"></div>
            <div className="profile-main">
                <ProfileBigEdit/>
            </div>
            <div className="profile-empty"></div>
        </div>
    </div>
    );
}

export default Profile;