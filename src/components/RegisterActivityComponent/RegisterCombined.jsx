import React, { useState, useEffect } from 'react';
import "../../styles/index.css";
import WorkoutObject from './WorkoutObject.jsx';
import axios from "axios";

/*
To make it easy to retrive the information, we save the information in an object. This will make it possible for the
user to change the information if they wrote something wrong. The object instansation is kept global, so that all
the functions can use the object freely.
 */

const registerWorkout=new WorkoutObject();


const RegisterCombined = ({returnToDefault}) => {
    registerWorkout.setType("combined");


    return (
        <div>
            <h3>Register Combined Activity</h3>
            <Page1 returnToDefault={returnToDefault}/>
            <button onClick={returnToDefault}>Cancel</button>
        </div>
    );
}

const Page1 = ({returnToDefault}) => {

    /*
    This function is for handling the submittion of the form. All input is converted to numbers or strings
    and added to the object initiated in the RegisterWeightlifting function.
    */

    useEffect(() => {
        const storedUser=localStorage.getItem("loggedInUser");
        if (storedUser) {
            registerWorkout.setUser((JSON.parse(storedUser).username));
        }
    }, []);

    const [postAccess, setPostAccess]=useState(registerWorkout.getAccess());


    const handleSubmit = async (event) => {

        event.preventDefault();

        registerWorkout.setDuration(Number(event.target.elements.duration.value));
        registerWorkout.setDescription(String(event.target.elements.description.value));
        registerWorkout.setTitle(String(event.target.elements.title.value));
        registerWorkout.setAccess(String(postAccess));

        try {
            await axios.post("api/activity/combined",registerWorkout);
        } catch (err) {
            console.error(err);
            alert("YIKES ! Error !!");
        }

        console.log(registerWorkout);
        registerWorkout.resetObject();
        returnToDefault();

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
                <button type="submit">Save</button>
            </form>
        </div>

    );
}


export default RegisterCombined;