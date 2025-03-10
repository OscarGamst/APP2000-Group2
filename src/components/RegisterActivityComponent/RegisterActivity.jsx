import React, { useState } from 'react';
import "../../styles/index.css";
import RegisterWeightlifting from './RegisterWeightlifting.jsx'

const RegisterActivity = () => {
    /*
    Variable that determine the visibility of the buttons and the title - has to be
    true by default, since we want to click the button to register a workout.
    */
    const[visibilityItems,setVisibilityItems]=useState(true);

	/*
	Variable that determines the visibity of each record activity option. These are accessed when clicking
	one of the buttons and therefore have to be set to false by default.
	
	Weightlift - weightlifting
	run - running
	combined - both above
	 */

	const[visibilityWeightlifting, setVisibilityWeightlifting]=useState(false);
	const[visibilityRun, setVisibilityRun]=useState(false);
	const[visibilityCombo, setVisibilityCombo]=useState(false);

	const showWeightlift = () => {
		setVisibilityWeightlifting(true);
		disableItems();
	}
    /*
    */
    const disableItems = () => {
      setVisibilityItems(false);

    }

    //Main code for component
    return (
		<div>
			{visibilityItems ? (
				<div>
					<h3>Register Activity</h3>
					<button onClick={showWeightlift}>Weightlifting</button>
					<button>Run</button>
					<button>Combined</button>
				</div>
			) : null}
			{visibilityWeightlifting ? <RegisterWeightlifting setVisibilityItems={setVisibilityItems}/> :null}
			
		</div>
    );
}

export default RegisterActivity;