import React, { useState, useEffect } from 'react';
import "../../styles/index.css";
import WorkoutObject from './WorkoutObject.jsx';

/*
The component is divided into three main parts.

Part 1: Form to get general information about activity, such as duration and description.
Part 2: Button to allow users to add individual sets and an overview of the sets added
Part 3: Form to get information about set, such as type, reps, etc.

The information in the form should not be submitted to the database before the user has clicked save!
This is to make sure that the user can go back and make corrections to the information before its
submitted.
*/





/*
To make it easy to retrive the information, we save the information in an object. This will make it possible for the
user to change the information if they wrote something wrong. The object instansation is kept global, so that all
the functions can use the object freely.
 */

const registerWorkout=new WorkoutObject();
registerWorkout.setType("weightlifting");

/*
Fetch function used to update the list on page 2 when a new exercise is added to the exercise list in the workout object
*/


const RegisterWeightlifting = ({returnToDefault}) => {
    /*
    To make the component easier to program, we decided to only use one boolean variable (poge) to determine
    which page is shown. True means that page one is shown, while false shows that page two is shown.
    The default is therefore set to true.

    To toggle the pages, we have two functions called "back" and "next". These functions toggle the
    state of the variable.
    */
    
    const [page, setPage]=useState(true);

    const back = () => {
        setPage(true);
    }
    
    const next = () => {
        setPage(false);
    }
    return (
        <div>
            <h3>Register Weightlifting</h3>
            {page ? <Page1 next={next}/>:<Page2 back={back} returnToDefault={returnToDefault}/>}
            <button onClick={returnToDefault}>Cancel</button>
        </div>
    );
}

const Page1 = ({next}) => {

    /*
    This function is for handling the submittion of the form. All input is converted to numbers or strings
    and added to the object initiated in the RegisterWeightlifting function.
    */

    useEffect(() => {
        const storedUser=localStorage.getItem("loggedInUser");
        if (storedUser) {
            registerWorkout.setUser((JSON.parse(storedUser)).username);
        }
    }, []);

    const [postAccess, setPostAccess]=useState(registerWorkout.getAccess());

    const handleSubmit = (event) => {

        event.preventDefault();

        registerWorkout.setDuration(Number(event.target.elements.duration.value));
        registerWorkout.setDescription(String(event.target.elements.description.value));
        registerWorkout.setTitle(String(event.target.elements.title.value));
        registerWorkout.setAccess(String(postAccess));
        console.log(registerWorkout);
        next();

    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Title : </label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        required
                        defaultValue={registerWorkout.getTitle()}
                    />
                </div>
                <div>
                    <label>Description : </label>
                    <textarea
                        id="description"
                        name="description"
                        required
                        defaultValue={registerWorkout.getDescription()}
                    >
                    </textarea>
                </div>
                <div>
                    <label>Private : </label>
                    <select
                        id="access"
                        name="access"
                        value={postAccess}
                        onChange={(e) => setPostAccess(e.target.value)}
                    >
                        <option value="private">Private</option>
                        <option value="public">Public</option>
                    </select>
                </div>
                <div>
                    <label>Duration (min) : </label>
                    <input
                        type="number"
                        id="duration"
                        name="duration"
                        min="0"
                        required
                        defaultValue={registerWorkout.getDuration()}
                    />
                </div>
                <button type="submit">Next</button>
            </form>
        </div> 
           
    );
}

const Page2 = ({back, returnToDefault}) => {

    const [visibilityAdd, setVisibilityAdd]=useState(true);

    const disableButton = () => {
        setVisibilityAdd(false);
    }
    
    const enableButton = () => {
        setVisibilityAdd(true);
    }

    /*
    The function that handles submitting the information in the objects to the database

    Copy of Alberts code:3
    */

    const submitObject = async () => {
        try {
            const responseFromBackend=await fetch(`http://localhost:8080/api/activity/workout`, {
                method: "PUT",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(registerWorkout)
            });

            if (responseFromBackend.ok) {alert("Update successful!!");
            } else {console.error("Failed to update :(")}
        } catch (error) { console.error("Error:", error);}


        registerWorkout.resetObject();
        returnToDefault();

    }
    
    let exerciseList=registerWorkout.exercises.map(exercise => 
        <div>
            <p>
                {exercise.name}, {exercise.reps} reps with {exercise.kilos} kg for {exercise.sets} sets
            </p>
        </div>
        );


    return (
        <div>
            <div>
                {exerciseList}
            </div>
            {visibilityAdd? <button onClick={disableButton}>Add</button>:null}
            {!visibilityAdd? <AddWorkout enableButton={enableButton}/>:null}
            {visibilityAdd? <button>Cancel</button>:null}
            {visibilityAdd? <button onClick={back}>Back</button>:null}
            {visibilityAdd? <button onClick={submitObject}>Save</button>:null}
        </div>
    );
}

const AddWorkout = ({enableButton}) => {
    console.log(enableButton);
    
    const handleSubmit = (event) => {
        event.preventDefault();

        const arg_name=(event.target.elements.exerciseName.value);
        const arg_sets=(Number(event.target.elements.sets.value));
        const arg_kilo=(Number(event.target.elements.kg.value));
        const arg_reps=(Number(event.target.elements.reps.value));

        registerWorkout.createNewExercise(arg_name,arg_sets,arg_kilo,arg_reps);
        console.log(registerWorkout.getExercise());

        enableButton();



    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <h3>Add Exercise</h3>
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
                    <label>kg weight used : </label>
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
                <button type="Submit">Add</button>
            </form>
        </div>
    );
}

export default RegisterWeightlifting;