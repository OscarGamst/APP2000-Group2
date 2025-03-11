import React, { useState } from 'react';
import "../../styles/index.css";

/*
The component is divided into three parts.

Part 1: Form to get general information about activity, such as duration and description.
Part 2: Button to allow users to add individual sets and an overview of the sets added
Part 3: Form to get information about set, such as type, reps, etc.

The information in the form should not be submitted to the database before the user has clicked save!
This is to make sure that the user can go back and make corrections to the information before its
submitted.

The user should be able to go back to the set they added! For this reason, the information has to be saved in an object called Workout, that includes a list
of workout exercises.
*/

class Workout {

    constructor() {
        this.exercises=[];
        this.lastIndex=0;
        this.description="";
        this.duration=0;
    }
    setDescription(description) {
        this.description=description;
    }
    setDuration(duration) {
        this.duration=duration;
    }
    updateLastIndex() {
        this.lastIndex+=1;
    }
    createNewExercise() {
        this.exercises[this.lastIndex]=new Exercise;
        this.updateLastIndex();
        return this.exercises[this.lastIndex-1];
    }
    getExercise(index) {
        return this.exercises[index];
    }
    resetObject() {
        this.exercises=[];
        this.lastIndex=0;
        this.description="";
        this.duration=0;
    }
}

class Exercise {
    constructor() {
        this.reps=0;
        this.name="";
        this.set=0;
        this.kilos=0;
    }
    setReps(reps) {
        this.reps=reps;
    }
    setName(name) {
        this.name=name;
    }
    setSets(sets) {
        this.set=sets;
    }
    setKilos(kilos) {
        this.kilos=kilos;
    }
}

/*
Global variable that creates the object we use for temporarily storing information about the workout exercise that the user wants to register.
 */
const registerWorkout=new Workout();

const RegisterWeightlifting = ({setVisibilityItems}) => {
    /*
    To make the component easier to program, we decided to only use one boolean variable (poge) to determine
    which page is shown. True means that page one is shown, while false shows that page two is shown.
    The default is therefore set to true.

    To toggle the pages, we have two functions called "back" and "next". These functions toggle the
    state of the variable.
    */
    
    const [page, setPage]=useState(true);

    /*
    To make it easy to retrive the information, we save the information in an object. This will make it possible for the user to change the information
    if the wrote something wrong.
    */

    const back = () => {
        setPage(true);
    }
    
    const next = () => {
        setPage(false);
    }
    return (
        <div>
            <h3>Register Weightlifting</h3>
            {page ? <Page1 next={next}/>:<Page2 back={back} setVisibilityItems={setVisibilityItems}></Page2>}     
        </div>
    );
}

const Page1 = (next) => {

    /*
    This function is for handling the submittion of the form. All input is converted to numbers or strings
    and added to the object initiated in the RegisterWeightlifting function.
    */

    const handleSubmit = (event) => {
        
            event.preventDefault();
            registerWorkout.setDuration(Number(event.target.elements.duration.value));
            registerWorkout.setDescription(String(event.target.elements.description.value));
            console.log(registerWorkout);
            console.log(next);
            next.next();

    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
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
                <button type="submit">Next</button>
            </form>
        </div>
    );
}

const Page2 = ({back},{setVisibilityItems}) => {

    const [visibilityAdd, setVisibilityAdd]=useState(true);

    const disableButton = () => {
        setVisibilityAdd(false);
    }
    
    const enableButton = () => {
        setVisibilityAdd(true);
    }
    
    const submitObject = () => {
        registerWorkout.resetObject();
        setVisibilityItems(true);

    }
    
    return (
        <div>
            <div key={registerWorkout.exercises.id}>
                <p>type: {registerWorkout.exercises.name}</p>
                <p>sets: {registerWorkout.exercises.sets}, reps: {registerWorkout.exercises.reps}, kilos: {registerWorkout.exercises.kilos}</p>
            </div>
            {visibilityAdd ? <button onClick={disableButton}>Add</button>:null}
            {!visibilityAdd?<AddWorkout enableButton={enableButton}/>:null}
            {visibilityAdd ? <button onClick={back}>Back</button>:null}
            {visibilityAdd ? <button onClick={submitObject}>Save</button>:null}
        </div>
    );
}

const AddWorkout = (enableButton) => {
    console.log(enableButton);
    
    const handleSubmit = (event) => {
        event.preventDefault();
        const exerciseObject=registerWorkout.createNewExercise();

        exerciseObject.setName(Number(event.target.elements.exerciseName.value));
        exerciseObject.setSets(Number(event.target.elements.sets.value));
        exerciseObject.setKilos(Number(event.target.elements.kg.value));
        exerciseObject.setReps(Number(event.target.elements.reps.value));

        enableButton.enableButton();
        console.log(registerWorkout.getExercise(0));

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