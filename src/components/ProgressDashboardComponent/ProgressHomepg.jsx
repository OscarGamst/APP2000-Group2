import React, {useEffect, useState} from 'react';
import "../../styles/index.css";
import runningIcon from "../../pictures/RunningIconHomepg.png";
import weightIcon from "../../pictures/WeightIconHomepage.png";
import chechmarkIcon from "../../pictures/ChechmarkIconHomepg.png";
import axios from "axios";

const ProgressHomepg = () => {
    //Variables
    const [user,setUser] = useState(null);
    const[runProg,setRunProg]=useState(0);
    const[weightProg,setWeightProg]=useState(0);
    const[numberActivities,setNumberActivities]=useState(0);

    useEffect(() => {
        if (user) {
            UpdateRunning();
            UpdateWeight();
            UpdateNumberActivities();
        }
    },[user]);

    useEffect(()=> {
        const storedUser = localStorage.getItem("loggedInUser");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    },[]);

    //Update functions - Should update when page is reloaded:))
    const UpdateRunning = async () => {
        const result2 = await axios.get(`/api/activity/allActivitiesRuns/${user.username}`)
        setRunProg(result2.data.length);
    }
    const UpdateWeight = async () => {
        const result1 = await axios.get(`/api/activity/allActivitiesWeightlifting/${user.username}`)
        setWeightProg(result1.data.length);
    }

    const UpdateNumberActivities = async () => {
        const result1 = await axios.get(`/api/activity/allActivitiesWeightlifting/${user.username}`)
        const result2 = await axios.get(`/api/activity/allActivitiesRuns/${user.username}`)
        const result3 = await axios.get(`/api/activity/allActivitiesCombined/${user.username}`)
        setNumberActivities(result1.data.length + result2.data.length + result3.data.length);
    }

    return (
        <div className="activity-feed">
            <h2>Overall Progress</h2>

            <div className="progressBoxRow">
                <div className="progressBoxColumn">
                    <img src={runningIcon} className="progressIcons" />
                    <p>Running Sessions</p>
                    <p>{runProg}</p>
                </div>


                <div className="progressBoxColumn">
                    <img src={weightIcon} className="progressIcons"/>
                    <p>weightlifting sessions</p>
                    <p>{weightProg}</p>
                </div>

                <div className="progressBoxColumn">
                    <img src={chechmarkIcon} className="progressIcons"/>
                    <p>Activities Completed</p>
                    <p>{numberActivities}</p>

                </div>

            </div>
        </div>
    )
}

export default ProgressHomepg;
