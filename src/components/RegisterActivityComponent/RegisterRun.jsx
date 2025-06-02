import React, { useState, useEffect } from 'react';
import "../../styles/index.css";
import WorkoutObject from './WorkoutObject.jsx';

/*
To make it easy to retrive the information, we save the information in an object. This will make it possible for the
user to change the information if they wrote something wrong. The object instansation is kept global, so that all
the functions can use the object freely.
 */

const registerWorkout=new WorkoutObject();
registerWorkout.setType("run");


const RegisterRun = ({returnToDefault}) => {

    return (
        <div>
            <h3>Register Run</h3>
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
            registerWorkout.setUser(JSON.parse(storedUser.username));
        }
    }, []);

    const [postAccess, setPostAccess]=useState(registerWorkout.getAccess());

    const submitObject = async () => {
        try {
            const responseFromBackend = await fetch(`http://localhost:8080/api/activity/workout`, {
                method: "PUT",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(registerWorkout)
            });

            if (responseFromBackend.ok) {
                alert("Update successful!!");
            } else {
                console.error("Failed to update :(")
            }
        } catch (error) {
            console.error("Error:", error);
        }

    }

    const handleSubmit = (event) => {

        event.preventDefault();

        registerWorkout.setDuration(Number(event.target.elements.duration.value));
        registerWorkout.setDescription(String(event.target.elements.description.value));
        registerWorkout.setTitle(String(event.target.elements.title.value));
        registerWorkout.setAccess(String(postAccess));
        registerWorkout.setDistance(Number(event.target.elements.distance.value));


        console.log(registerWorkout);
        submitObject();
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
                <div>
                    <label>Distance (km) : </label>
                    <input
                        type="number"
                        id="distance"
                        name="distance"
                        min="0"
                        required
                        defaultValue={registerWorkout.getDistance()}
                    />
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>

    );
}


export default RegisterRun;