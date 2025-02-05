import React from "react";
import "../styles/index.css";
import LogInComponent from "../components/LogInComponent";

function LogIn() {
    return (
        <div className="login-page-wrapper">
            <div className="login-page-empty"></div><div className="login-page-empty"></div>
            <div className="login-page-main">
                <LogInComponent/>
            </div>
            <div className="login-page-empty"></div><div className="login-page-empty"></div>
        </div>
    );
}

export default LogIn;