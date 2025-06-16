import React, {useEffect, useState} from 'react';
import "../../styles/index.css";
import GoalObject from './GoalObject.jsx';
import axios from "axios";

const goal = new GoalObject();

const GoalRegistration = ({returnToDefault}) => {
    useEffect(() => {
        const storedUser = localStorage.getItem("loggedInUser");
        if (storedUser) {
            goal.setUser((JSON.parse(storedUser)).username);
        }
    }, []);

    const [page, setPage] = useState(true);

    const back = () => setPage(true);
    const next = () => setPage(false);

    return (
        <div>
            <h3>Register Goal</h3>
            {page ? <Page1 next={next} returnToDefault={returnToDefault}/> : <Page2 back={back} returnToDefault={returnToDefault}/>}
        </div>
    );
}

const Page1 = ({returnToDefault, next}) => {
    const [goalType, setGoalType] = useState(goal.getType());
    const [repeating, setRepeating] = useState(goal.getRepeating());

    const handleSubmit = (event) => {
        event.preventDefault();
        goal.setType(goalType);
        goal.setRepeating(repeating);
        goal.setFrequency(Number(event.target.elements.frequency.value));
        console.log(goal);
        next();
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Type : </label>
                    <select
                        id="type"
                        name="type"
                        value={goalType}
                        onChange={(e) => setGoalType(e.target.value)}
                    >
                        <option value="weightlifting">weightlifting</option>
                        <option value="run">run</option>
                    </select>
                </div>
                <div>
                    <label>Repeating : </label>
                    <select
                        id="repeating"
                        name="repeating"
                        value={repeating}
                        onChange={(e) => setRepeating(e.target.value)}
                    >
                        <option value="yearly">yearly</option>
                        <option value="monthly">monthly</option>
                        <option value="weekly">weekly</option>
                    </select>
                </div>
                <div>
                    <label>Number of days: </label>
                    <input
                        type="number"
                        id="frequency"
                        name="frequency"
                    />
                </div>
                <button type="submit" className="add-button">Next</button>
            </form>
            <button onClick={returnToDefault} className="add-button">Cancel</button>
        </div>
    );
}

const Page2 = ({back, returnToDefault}) => {
    const goalChoice = goal.getType();

    return (
        <div>
            {goalChoice === "weightlifting"
                ? <WeightliftingGoalLayout returnToDefault={returnToDefault}/>
                : <RunGoalLayout returnToDefault={returnToDefault}/>}
            <button onClick={back} className="add-button">Back</button>
            <button onClick={returnToDefault} className="add-button">Cancel</button>
        </div>
    );
}

const WeightliftingGoalLayout = ({returnToDefault}) => {
    const handleSubmit = async (event) => {
        event.preventDefault();
        goal.setExerciseName(event.target.elements.exerciseName.value);
        goal.setSets(Number(event.target.elements.sets.value));
        goal.setWeight(Number(event.target.elements.weight.value));
        goal.setReps(Number(event.target.elements.reps.value));

        try {
            console.log("SENDING:", JSON.stringify(goal));
            await axios.post("api/goal/register/weightlift", goal);
        } catch (err) {
            alert("YIKES ! Error!");
        }

        goal.resetObject();
        returnToDefault();
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Exercise name : </label>
                    <input type="text" id="exerciseName" name="exerciseName" min="0" required />
                </div>
                <div>
                    <label>Sets : </label>
                    <input type="number" id="sets" name="sets" min="0" required />
                </div>
                <div>
                    <label>kg weight used : </label>
                    <input type="number" id="weight" name="weight" min="0" required />
                </div>
                <div>
                    <label>reps : </label>
                    <input type="number" id="reps" name="reps" min="0" required />
                </div>
                <button type="submit" className="add-button">Save</button>
            </form>
        </div>
    );
}

const RunGoalLayout = ({returnToDefault}) => {
    const handleSubmit = async (event) => {
        event.preventDefault();
        goal.setDistance(Number(event.target.elements.distance.value));
        goal.setTime(Number(event.target.elements.time.value));

        try {
            await axios.post("api/goal/register/run", goal);
            console.log(goal);
        } catch (err) {
            alert("YIKES ! Error!");
        }

        goal.resetObject();
        returnToDefault();
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Distance : </label>
                    <input type="number" id="distance" name="distance" min="0" required />
                </div>
                <div>
                    <label>Time : </label>
                    <input type="number" id="time" name="time" min="0" required />
                </div>
                <button type="submit" className="add-button">Save</button>
            </form>
        </div>
    );
}

export default GoalRegistration;
