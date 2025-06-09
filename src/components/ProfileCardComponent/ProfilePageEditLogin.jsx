import React from "react";
import "../../styles/responsive.css";
import { useState } from "react";
import { useEffect } from "react";
import default_pfp from "../../pictures/default_pfp.png";
import axios from "axios";

const ProfilePageEditLogin = () => {
    //brukerdata
    const [user, setUser] = useState(null);
    useEffect(()=> {
        const storedUser = localStorage.getItem("loggedInUser");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    },[]);

    const [newInfo1, setnewInfo1] = useState({
        username: user ? user.username : "loading...",
        email: user ? user.email : "loading..",
        password: "",
        birthday: user ? user.birthday : "2000-01-01",
        visibility: user ? user.visibility : "loading..",
    });

    useEffect(()=> {
        if (user) {
            setnewInfo1(user);
        };
    },[user]);

    const [compare, setCompare] = useState("");
    const handleSave = async (e) => {
        e.preventDefault();
        if (!newInfo1 || !user) {return;}

        if (newInfo1.password !== compare) {
            alert("Passwords must match")
            return;
        }

        setnewInfo1({...newInfo1, username: user.username})
        
        try {
            const updatedUser = {...user, ...newInfo1}; //merger gammel med ny

            await axios.put(`api/users/${newInfo1.username}`,{
                username: newInfo1.username,
                email: newInfo1.email,
                password: newInfo1.password,
                birthday: newInfo1.birthday,
                visibility: newInfo1.visibility,
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
                    <label htmlFor="password">New password: </label>
                    <input
                        type="password"
                        name="password"
                        placeholder={"Enter new password"}
                        value={newInfo1.password}
                        onChange={e => setnewInfo1({ ...newInfo1, password: e.target.value})}
                        required
                    />
                
                    <label htmlFor="confirmPassword">Confirm password:</label>
                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder={"Confirm password"}
                        value={compare}
                        onChange={e => setCompare(e.target.value)}
                        required
                    />                    
                </div>
                    <button onClick={handleSave}>Save</button>
            </form>
        </div>
    );

}

export default ProfilePageEditLogin;