import React, { useState } from 'react';
import "../../styles/index.css";
import GoalRegistration from './GoalRegistration.jsx';

const NewGoal = () => {
    /*
    Variable that determine the visibility of the buttons and the title - has to be
    true by default, since we want to click the button to register a workout.
    */
    const[visibilityItems,setVisibilityItems]=useState(true);
    const[visibilityGoalRegistration, setvisibilityGoalRegistration]=useState(false);


    const disableItems = () => {
        setVisibilityItems(false);
        setvisibilityGoalRegistration(true);

    }
    const returnToDefault = () => {
        setVisibilityItems(true);
        setvisibilityGoalRegistration(false);

    }

    //Main code for component
    return (
        <div>
            {visibilityItems ? (
                <div>
                    <h4>Have a new goal in mind?</h4>
                    <button onClick={disableItems}>Add Goal</button>
                </div>
            ) : null}
            {visibilityGoalRegistration ? <GoalRegistration returnToDefault={returnToDefault}/> :null}
        </div>
    );
}

export default NewGoal;