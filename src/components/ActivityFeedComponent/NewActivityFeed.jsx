import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../styles/index.css"

const NewActivityFeed = () => {

    const [feedFilter, setFeedFilter]=useState("All");

    const [user, setUser] = useState(null);
    const [activities, setActivities] = useState([]);
    const [activityRun, setRuns] = useState([]);
    const [activityWeightlift, setWeightlift] = useState([]);
    const [comments, setComments] = useState({});

    // likes må jobbes med, men vanskelig å teste før vio kan se andres aktiviteter
    //const [likedActivities, setLikedActivities] = useState({});
    // const [likeCounts, setLikeCounts] = useState({});

    useEffect(() => {
        const storedUser = localStorage.getItem("loggedInUser");
        if(storedUser) {
            setUser(JSON.parse(storedUser));
        }
    },[])

    useEffect(() => {
        const fetchActivities = async () => {
            if (user && user.username) {
                try {
                    const resRun = await axios.get(`/api/activity/allActivitiesRuns/${user.username}`);
                    const resWeight = await axios.get(`/api/activity/allActivitiesWeightlifting/${user.username}`);
                    //console.log(activityRun);
                    //console.log(activityWeightlift);
                    setRuns(resRun.data);
                    setWeightlift(resWeight.data);
                    setActivities([...resRun.data, ...resWeight.data]);
                    const allActivities = [...resRun.data, ...resWeight.data];

                    allActivities.forEach((activity) => {
                        fetchComments(activity.activityId);
                    });
                } catch (err) {
                    console.error("Failed fetch for activities", err);
                }
            }
        };
        fetchActivities();
    }, [user]);

    const fetchComments = async (activityId) => {
        try {
            const res = await axios.get("/api/comment", {
                params: { activityId: activityId }
            });
            setComments((prev) => ({ ...prev, [activityId]: res.data }));
        } catch (err) {
            console.error(`Failed to fetch comments for activity ${activityId}`, err);
        }
    };



    const getActivityClass = (type) => {
        switch (type) {
            case "weightlifting":
                return "activity-workout";
            case "run":
                return "activity-run";
            default:
                return "activity-default";
        }
    };




    return (
        <div className="activity-list-container">
            <div>
                <h2 className="activity-list-header">Activity Feed</h2>
                <form>
                    <div>
                        <label>Sort By:</label>
                        <select
                            id="feedSort"
                            name="feedSort"
                            value={feedFilter}
                            onChange={(e) => setFeedFilter(e.target.value)}
                        >
                            <option value="All">All</option>
                            <option value="Weightlifting">Weightlifting</option>
                            <option value="Running">Running</option>
                            <option value="Combined">Combined</option>
                        </select>
                    </div>
                </form>
                <hr className="divider" />
            </div>
            {activities.map((activity) => (
                <div className={`activity-item ${getActivityClass(activity.type)}`}>
                    <h4>{activity.title}</h4>
                    <p>{activity.description}</p>
                    <p><strong>Duration:</strong> {activity.duration} min</p>
                    {activity.distance !== undefined && <p><strong>Distance:</strong> {activity.distance} km</p>}
                    {activity.exercises && activity.exercises.length > 0 && (
                        <div className="exercise-section">
                            <p><strong>Exercises:</strong></p>
                            <ul>
                                {activity.exercises.map((ex, idx) => (
                                    <li key={idx}>
                                        {ex.name}: {ex.sets} sets × {ex.reps} reps  {ex.weight}kg
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                    <h5>Posted: {activity.timestamp} </h5>
                    <div className="activity-social">
                        <ul>
                            <button id="like-btn" >Edit</button>
                            <button className="activity-comment" type="button">Delete</button>
                            <span id="like-count"> likes</span>
                        </ul>
                    </div>
                    <div className="commentSection">
                        <p>Comments:</p>
                        {(comments[activity.activityId] || []).map((comment, id) => (
                            <p key={id}> {comment.commenterUsername}:  {comment.content} </p>
                        ))}

                    </div>
                </div>

            ))}
        </div>
    )
}

export default NewActivityFeed;