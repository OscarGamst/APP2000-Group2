import React from 'react';
import "../../styles/index.css";

const WorkoutFormRegisterActivity = ({getButtons}) => {
    
    const handleSubmit = (event) => {
        event.preventDefault();
        const exerciseName=String(event.target.elements.duration.value);
        const sets=Number(event.target.elements.duration.value);
        const kg=Number(event.target.elements.duration.value);
        const reps=Number(event.target.elements.duration.value);

        getButtons();
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <h3>Workout Exercise</h3>
                <label>Exercise name : </label>
                <input
                    type="text"
                    id="exerciseName"
                    name="exerciseName"
                    min="0"
                    required
                />
            </div>
            <div>
                <label>Sets : </label>
                <input
                    type="number"
                    id="sets"
                    name="sets"
                    min="0"
                    required
                />
            </div>
            <div>
                <label>kg : </label>
                <input
                    type="number"
                    id="kg"
                    name="kg"
                    min="0"
                    required
                />
            </div>
            <div>
                <label>reps : </label>
                <input
                    type="number"
                    id="reps"
                    name="reps"
                    min="0"
                    required
                />
            </div>
            <button>Submit</button>
        </form>
    );
}

export default WorkoutFormRegisterActivity;