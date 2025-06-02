import React from "react";
import "../../styles/responsive.css";
import { useState } from "react";
import { useEffect } from "react";
import default_pfp from "../../pictures/default_pfp.png";
import axios from "axios";

const ProfilePageEdit = () => {
    //brukerdata
    const [user, setUser] = useState(null);
    useEffect(()=> {
        const storedUser = localStorage.getItem("loggedInUser");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    },[]);

    const [newInfo, setNewInfo] = useState({
        username: user ? user.username : "loading..",
        email: user ? user.email : "loading..",
        password: "********",
        birthday: user ? user.birthday : "loading..",
        visibility: user ? user.visibility : "loading..",
    });

    const [username, setUsername] = useState("");
    const [email, setemail] = useState("");
    const [password, setPassword] = useState("");
    const [birthday, setBirthday] = useState("");
    const [visibility, setVisibility] = useState(false);

    useEffect(()=> {
        if (user) {
            setNewInfo(user);
        };
    },[user]);


    const handleSave = async (e) => {
        e.preventDefault();
        try {
            await axios.put("api/users/")

        } catch(error) {
            console.error(error);
            alert("Error")
        }
    };

    return (
        <div className="profileBig" >
            <div className="gradient"></div> {/*du finnern ved css for profileCard*/}
            <form>
            <ul>
                <div id="profileBigTop">
                    <li><img src={default_pfp} alt=""/></li>
                    <li id="profileBigTitle">
                        
                    </li>
                </div>
            </ul>
                <div className="profileBigRest">
                    
                        
                    <ul>
                        <li>
                            <label htmlFor="username">Username: </label>
                            <input
                                type="text"
                                name="username"
                                placeholder={newInfo.username}
                                value={newInfo.username}
                                onChange={e => setNewInfo({ ...newInfo, username: e.target.value})}
                                required
                            />
                        </li>
                        <li>
                            <label htmlFor="email">E-mail: </label>
                            <input
                                type="text"
                                name="email"
                                placeholder={newInfo.email}
                                value={newInfo.email}
                                onChange={e => setNewInfo({ ...newInfo, email: e.target.value})}
                                required
                            />
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
                    <button onClick={"handleSave"}>Save</button>
                </li>

            </form>
        </div>
    );

}

export default ProfilePageEdit;