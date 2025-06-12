import React, { useState } from 'react';
import "../../styles/index.css";
import RegisterWeightlifting from './RegisterWeightlifting.jsx'
import RegisterRun from './RegisterRun.jsx'
import RegisterCombined from './RegisterCombined.jsx'

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

	const showRun = () => {
		setVisibilityRun(true);
		disableItems();
	}

	const showCombined = () => {
		setVisibilityCombo(true);
		disableItems();
	}
    /*
    */
    const disableItems = () => {
      setVisibilityItems(false);

    }
	const returnToDefault = () => {
		setVisibilityItems(true);
		setVisibilityWeightlifting(false);
		setVisibilityRun(false);
		setVisibilityCombo();

	}

    return (
		<div>
			{visibilityItems ? (
				<div className="register-activity-container">
					<h3>Register Activity</h3>
				<button onClick={showWeightlift} className="register-button">Weightlifting</button>
				<button onClick={showRun} className="register-button">Run</button>
				<button onClick={showCombined} className="register-button">Combined</button>
			  </div>
			  
			) : null}
			{visibilityWeightlifting ? <RegisterWeightlifting returnToDefault={returnToDefault}/> :null}
			{visibilityRun ? <RegisterRun returnToDefault={returnToDefault}/> :null}
			{visibilityCombo ? <RegisterCombined returnToDefault={returnToDefault}/> :null}
			
		</div>
    );
}

export default RegisterActivity;