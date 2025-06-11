import React from "react";
import ProfilePageComponent from "../components/ProfileCardComponent/ProfilePageComponent"
import "../styles/responsive.css";
import { useState } from "react";
import ProfilePageEdit from "../components/ProfileCardComponent/ProfilePageEdit";
import ProfilePageEditLogin from "../components/ProfileCardComponent/ProfilePageEditLogin";

function Profile() {
    const [editing, setEditing] = useState(false);
    const [editing2, setEditing2] = useState(false);
    const [mode,setMode] = useState("default");

    const modeContent = () => {
        switch (mode) {
            case "edit":
                return <ProfilePageEdit/>;
            case "password":
                return <ProfilePageEditLogin/>
            default:
                return <ProfilePageComponent/>
        }
    }

    return (
    <div className="profile">
        <div className="profile-wrapper">
            
            <div className="profile-main">
                
                {modeContent()}

                <button onClick={()=>{setMode(mode==="edit"?"default":"edit")}}className="user-auth-button">
                    {mode === "edit" || mode === "password" ? "Exit" : "Edit"}
                </button>

                {mode !== "default" && mode !== "password" && 
                    <button onClick={()=>setMode("password")}className="user-auth-button">
                        Change password
                    </button>
                }

                {mode === "password"&&(
                    <button onClick={()=>setMode("edit")}className="user-auth-button">
                        back
                    </button>
                )}
                
            </div>
            
        </div>
    </div>
    );
}

export default Profile;