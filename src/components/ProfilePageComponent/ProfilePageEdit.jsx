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
        email: user ? user.email : "loading..",
        birthday: user ? user.birthday : "2000-01-01",
        visibility: user ? user.visibility : "loading..",
    });

    useEffect(()=> {
        if (user) {
            setNewInfo(user);
        };
    },[user]);

    const handleSave = async (e) => {
        e.preventDefault();
        setNewInfo({...newInfo, username: user.username})
        const updatedUser = {...user, ...newInfo}; //merger gammel med ny
        try {
            await axios.put(`api/users/update-no-pw/${newInfo.username}`,{
                email: newInfo.email,
                birthday: newInfo.birthday,
                visibility: newInfo.visibility,
            });
            //oppdaterer lagra bruker også
            setUser(updatedUser);
            localStorage.setItem("loggedInUser",JSON.stringify(updatedUser))
            alert("Updated userinfo")
        } catch(error) {
            console.error(error);
            alert("Error")
        }
    };

    return (
        <div className="profileBig" >
            <div className="gradient"></div> {/*du finnern ved css for profileCard*/}
            <form>
                <div id="profileBigTop">
                    <img src={default_pfp} alt=""/>
                    <div id="profileBigTitle">
                        {user ? user.username : "Loading.."}
                    </div>
                </div>
                <div className="profileBigRest">
                    <label htmlFor="email">E-mail: </label>
                    <input
                        type="text"
                        name="email"
                        placeholder={newInfo.email}
                        value={newInfo.email}
                        onChange={e => setNewInfo({ ...newInfo, email: e.target.value })}
                        required
                    />

                    <label htmlFor="birthday">Birthday:</label>
                    <input
                        type="date"
                        name="birthday"
                        placeholder={newInfo.birthday}
                        value={newInfo.birthday}
                        onChange={e => setNewInfo({ ...newInfo, birthday: e.target.value })}
                        required
                    />

                    <label htmlFor="visibility">Public profile?</label>
                    <select
                        name="visibility"
                        value={newInfo.visibility.toString()}
                        onChange={e => setNewInfo({ ...newInfo, visibility: e.target.value === "true" })}
                    >
                        <option value="true">Public</option>
                        <option value="false">Private</option>
                    </select>
                </div>

                    <button onClick={handleSave}>Save</button>
            </form>
        </div>
    );

}

export default ProfilePageEdit;