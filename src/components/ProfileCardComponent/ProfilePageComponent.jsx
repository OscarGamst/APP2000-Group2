import React, { useEffect, useState } from "react";
import "../../styles/index.css";
import default_pfp from "../../pictures/default_pfp.png";


const ProfilePageComponent = () => {

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
                    <table>
                        <tr>
                            <td>
                                <label>E-mail: </label>
                            </td>
                            <td>
                                <span>{user ? user.email : "e-mail"}</span>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label>Birthday: </label>
                            </td>
                            <td>
                                <span>{user ? user.birthday : "birthday"}</span>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label>Public profile: </label>
                            </td>
                            <td>
                                <span>{user ? user.visibility==false?"false":"true" : "visibility"}</span>
                            </td>
                        </tr>
                    </table>
                </div>
            </ul>
        </div>
    );
};

export default ProfilePageComponent;