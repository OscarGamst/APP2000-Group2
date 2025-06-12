import React, { useState } from 'react';
import "../../styles/index.css";
import GoalRegistration from './GoalRegistration.jsx';

const NewGoal = () => {
    const [visibilityItems, setVisibilityItems] = useState(true);
    const [visibilityGoalRegistration, setvisibilityGoalRegistration] = useState(false);

    const disableItems = () => {
        setVisibilityItems(false);
        setvisibilityGoalRegistration(true);
    };

    const returnToDefault = () => {
        setVisibilityItems(true);
        setvisibilityGoalRegistration(false);
    };

    return (
        <div>
            {visibilityItems ? (
                <div className="add-container">
                    <h4 className="add-heading">Have a new goal in mind?</h4>
                    <button onClick={disableItems} className="add-button">Add Goal</button>
                </div>
            ) : null}
            {visibilityGoalRegistration ? (
                <GoalRegistration returnToDefault={returnToDefault} />
            ) : null}
        </div>
    );
};

export default NewGoal;
