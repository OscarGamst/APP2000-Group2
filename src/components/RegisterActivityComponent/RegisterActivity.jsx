import React, { useState } from 'react';
import "../../styles/index.css";
import FormRegisterActivity from './FormRegisterActivity';

const RegisterActivity = () => {
    /*
    Variable that determine the visibility of the register button - has to be
    true by default, since we want to click the button for the form to show.
    */
    const[visibilityRegister,setVisibilityRegister]=useState(true);

    /*
    Variable that determine the visibility of the form - has to be false by
    default.
    */
    const[visibilityForm,setVisibilityForm]=useState(false);

    //Functions to turn on/off visibility of button and form
    const showForm = () => {
      setVisibilityRegister(false);
      setVisibilityForm(true);

    }
    const returnToDefault = () => {
      setVisibilityRegister(true);
      setVisibilityForm(false);
    }

    //Main code for component
    return (
        <div>
            {visibilityRegister ? <button onClick={showForm}>Register Activity</button> : null}
            {visibilityForm ? <FormRegisterActivity returnToDefault={returnToDefault}/> : null}
        </div>

    );
}

export default RegisterActivity;