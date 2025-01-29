import React, { useState } from 'react';
import "../styles/index.css";

const ProgressHomepg = () => {
    //Variables
    const[runProg,setRunProg]=useState(0);
    const[weightProg,setWeightProg]=useState(0);
    const[kalProg,setKalProg]=useState(0);

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

    return (
        <div className="progressBoxColumn">
            <h3>Weekly Progress</h3>

            <div className="progressBoxRow">
                <div className="progressBoxColumn">
                    <p>icon</p>
                    <p>Km ran</p>
                    <p>{runProg}</p>
                </div>
                <div className="progressBoxColumn">
                    <p>icon</p>
                    <p>Kg lifted</p>
                    <p>{weightProg}</p>
                </div>
                <div className="progressBoxColumn">
                    <p>icon</p>
                    <p>KJ burned</p>
                    <p>{kalProg}</p>
                </div>
            </div>
        </div>
    )
}

export default ProgressHomepg;
