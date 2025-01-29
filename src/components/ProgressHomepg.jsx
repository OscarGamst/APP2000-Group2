import React, { useState } from 'react';
import "../styles/index.css";
import runningIcon from "../pictures/RunningIconHomepg.png";
import weightIcon from "../pictures/WeightIconHomepage.png";
import foodIcon from "../pictures/FoodIconHomepg.png";
import chechmarkIcon from "../pictures/ChechmarkIconHomepg.png";

const ProgressHomepg = () => {
    //Variables
    const[runProg,setRunProg]=useState(0);
    const[weightProg,setWeightProg]=useState(0);
    const[kalProg,setKalProg]=useState(0);
    const[numberActivities,setNumberActivities]=useState(0);

    //Update functions - Should update when page is reloaded:))
    const UpdateRunning = (NewRunProg) => {
        setRunProg(NewRunProg);
    }
    const UpdateWeight = (NewWeightProg) => {
        setWeightProg(NewWeightProg);
    }
    const UpdateKalories = (NewKalProg) => {
        setKalProg(NewKalProg);
    }
    const UpdateNumberActivities = (NewNumberActivities) => {
        setNumberActivities(NewNumberActivities);
    }

    return (
        <div className="activity-feed">
            <h2>Weekly Progress</h2>

            <div className="progressBoxRow">
                <div className="progressBoxColumn">
                    <img src={runningIcon} className="progressIcons" />
                    <p>Km ran</p>
                    <p>{runProg}</p>
                </div>
                <div className="progressBoxColumn">
                    <img src={weightIcon} className="progressIcons"/>
                    <p>Kg lifted</p>
                    <p>{weightProg}</p>
                </div>
                <div className="progressBoxColumn">
                    <img src={foodIcon} className="progressIcons"/>
                    <p>KJ burned</p>
                    <p>{kalProg}</p>
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
