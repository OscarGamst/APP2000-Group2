import React, { useEffect, useState } from "react";
import "../../styles/index.css";
import default_pfp from "../../pictures/default_pfp.png";
import EditField from "./ProfileCardBigEditField";



//initialValue i detta tilfellet burde være nokså enkle å få inn fra databasen
const ProfileBigEdit = ( {id = 5 }) => {
    //en state for hvert av feltene
    //const [userName, setUserName] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [birthday, setBirthday] = useState("");
    const [profileVisibility, setProfileVisibility] = useState("");
     //intill vi får fetcha real ID når vi får logga inn med google
    //fetching av brukerdata fra databasen. useEffect som kjøres når component rendres og når ID endres.
    useEffect(()=> {
        const fetchUser = async () => {
            try {
                const get = await fetch(`http://localhost:8080/api/users/${id}`);
                if (!get.ok) throw new Error("Failed to fetch user data :(");
                const data = await get.json();
                setFirstName(data.first_name);
                setLastName(data.last_name);
                setEmail(data.email);
                setBirthday(data.birthday);
                setProfileVisibility(data.visibility);
            } catch (error) { console.error("Error", error);}
        };
        fetchUser();
    },[id])

    //brukerdata
    const [user,setUser] = useState(null);
    useEffect(()=> {
        const storedUser = localStorage.getItem("loggedInUser");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    },[]);

    // EKSEMPEL KINDA CLOSE TIL DET VI KOMMER TIL Å BRUKE TROR JEG
    const handleSubmit = async () => {
        //setUserName(firstName , " " , lastName);
        const userData = {
            id: 5, //denne må evt byttes ut med når vi får inn userID fra google token seinere
            first_name: firstName,
            last_name: lastName,
            email,
            birthday,
            visibility:profileVisibility,

        };
        
        try {
            const response = await fetch(`http://localhost:8080/api/users/${id}`, {
                method: "PUT",
                headers: {
                    "content-type" : "application/json"
                },
                body: JSON.stringify(userData)
            });

            if (response.ok) {alert("Update successful!!");}
            else {console.error("Failed to update :(")}
        } catch (error) { console.error("Error:", error);}
    };

    return (
        <div className="profileBig" >
            <div className="gradient"></div> {/*du finnern ved css for profileCard*/}
            <ul>

                <div id="profileBigTop">
                    <li><img src={default_pfp} alt=""/></li>
                    <li id="profileBigTitle">
                        {firstName ? `${firstName} ${lastName}` : "Username"}
                    </li>
                </div>

                <div className="profileBigRest">
                    <EditField label="First name:" value={firstName} onChange={setFirstName} />
                    <EditField label="Last name:" value={lastName} onChange={setLastName} />
                    <EditField label="E-mail:" value={email} onChange={setEmail} />
                    <EditField label="Birthday:" type="date" value={birthday} onChange={setBirthday} />
                    <li className="profileGrid">
                        <label>Profile visibility: </label>
                        <select name="profileVisibility" value={profileVisibility} 
                            onChange={(e)=>setProfileVisibility(e.target.value)}>
                            <option value="true">Public</option>
                            <option value="false">Private</option>
                        </select>
                    </li>
                </div>

                <li>
                    <button onClick={handleSubmit}>Submit</button>
                </li>

            </ul>
        </div>
    );
};

export default ProfileBigEdit;