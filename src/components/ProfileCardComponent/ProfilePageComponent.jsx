import React, { useEffect, useState } from "react";
import "../../styles/index.css";
import default_pfp from "../../pictures/default_pfp.png";
import EditField from "./ProfileCardBigEditField";



//initialValue i detta tilfellet burde være nokså enkle å få inn fra databasen
const ProfileBigEdit = () => {

    //brukerdata
    const [user, setUser] = useState(null);
    useEffect(()=> {
        const storedUser = localStorage.getItem("loggedInUser");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    },[]);

    const handleSubmit = async () => {
        console.log(user);
    };

    return (
        <div className="profileBig" >
            <div className="gradient"></div> {/*du finnern ved css for profileCard*/}
            <ul>

                <div id="profileBigTop">
                    <li><img src={default_pfp} alt=""/></li>
                    <li id="profileBigTitle">
                        {user ? user.username : "Loading.."}
                    </li>
                </div>

                <div className="profileBigRest">
                    <ul>
                        <li>
                            <label>E-mail: </label>
                            {user ? user.email : "e-mail"}
                        </li>
                        <li>
                            <label>Birthday: </label>
                            {user ? user.birthday : "birthday"}
                        </li>
                        <li>
                            <label>Public profile: </label>
                            {user ? user.visibility==false?"false":"true" : "visibility"}
                        </li>
                    </ul>
                </div>

                

                <li>
                    <button onClick={handleSubmit}>Edit</button>
                </li>

            </ul>
        </div>
    );
};

export default ProfileBigEdit;