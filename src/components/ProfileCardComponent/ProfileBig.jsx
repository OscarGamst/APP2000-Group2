import React from "react";
import "../../styles/index.css";
import default_pfp from "../../pictures/default_pfp.png";
import EditField from "./ProfileCardBigEditField";

// EKSEMPEL KINDA CLOSE TIL DET VI KOMMER TIL Å BRUKE TROR JEG
// const handleSubmit = async () => {
//     const profileData = {
//         firstName: firstName,
//         lastName: lastName,
//         email: email,
//         birthday: birthday,
//         profileVisibility:true

//     };
    
//     await fetch("http://localhost:8080/api/users", {
//         method: "PUT",
//         headers: {
//             "content-type" : "application/json"
//         },
//         body: JSON.stringify(profileData)
//     });
// };

//initialValue i detta tilfellet burde være nokså enkle å få inn fra databasen
const ProfileBigEdit = () => {
    return (
        <div className="profileBig" >
            <div className="gradient"></div> {/*du finnern ved css for profileCard*/}
            <ul>

                <div id="profileBigTop">
                    <li><img src={default_pfp} alt=""/></li>
                    <li id="profileBigTitle">
                        Username
                    </li>
                </div>

                <div className="profileBigRest">
                    <EditField label="First name:" initialValue="Bertulf" />
                    <EditField label="Last name:" initialValue="Oscarsen" />
                    <EditField label="E-mail:" initialValue="malin@sara.no" />
                    <EditField label="Birthday:" type="date" initialValue="1990-01-01" />
                    <li className="profileGrid">
                        <label>Profile visibility: </label>
                        <select name="profileVisibility">
                            <option value="public">Public</option>
                            <option value="private">Private</option>
                        </select>
                    </li>
                </div>

                <li>
                    <button>Submit</button>
                </li>

            </ul>
        </div>
    );
};

export default ProfileBigEdit;