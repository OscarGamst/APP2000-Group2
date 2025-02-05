import React from "react";
import LogInComponent from "../components/LogInComponent";

function LogIn() {
    return (
    <div className="profile">
        <div className="profile-wrapper">
            <div className="profile-empty"></div>
            <div className="profile-main">
                <LogInComponent/>
            </div>
            <div className="profile-empty"></div>
        </div>
    </div>
    );
}

export default LogIn;