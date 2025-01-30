import React, { useState } from 'react';
import "../../styles/index.css";
import WorkoutFormRegisterActivity from "./WorkoutFormRegisterActivity.jsx";
import RunFormRegisterActivity from "./RunFormRegisterActivity.jsx";

const FormRegisterActivity = ({returnToDefault}) => {
    //Variables
    const [visibilityButtons,setVisibilityButtons]=useState(true);
    const [visibilityRunForm,setVisibilityRunForm]=useState(false);
    const [visibilityWorkForm,setVisibilityWorkForm]=useState(false);
    
    //On submit function
    const handleSubmit = (event) => {
            event.preventDefault();
            const duration=Number(event.target.elements.duration.value);
            const description=String(event.target.elements.duration.value);
            const kJburned=Number(event.target.elements.duration.value);
            returnToDefault();
    };
    const showRun = () => {
        setVisibilityButtons(false);
        setVisibilityRunForm(true);
    };
    const showWork = () => {
        setVisibilityButtons(false);
        setVisibilityWorkForm(true);
    };
    const getButtons = () => {
        setVisibilityButtons(true);
        setVisibilityRunForm(false);
        setVisibilityWorkForm(false);
    }

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <h2>Register Activity</h2>
                <label>Duration (min) : </label>
                <input
                    type="number"
                    id="duration"
                    name="duration"
                    min="0"
                    required
                />
            </div>
            <div>
                <label>Description : </label>
                <input
                    type="text"
                    id="description"
                    name="description"
                    required
                />
            </div>
            <div>
                <label>KJ burned : </label>
                <input
                    type="number"
                    id="kJBurned"
                    name="kJBurned"
                    min="0"
                />
            </div>
            {visibilityButtons ? <button onClick={showRun}>Add Run</button> : null}
            {visibilityButtons ? <button onClick={showWork}>Add Workout</button> : null}
            {visibilityWorkForm ? <WorkoutFormRegisterActivity getButtons={getButtons}/> : null}
            {visibilityRunForm ? <RunFormRegisterActivity getButtons={getButtons}/> : null}
            <button type="submit">Submit</button>
        </form>
    );
}

export default FormRegisterActivity;