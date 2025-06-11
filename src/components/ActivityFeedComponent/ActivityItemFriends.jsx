import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../styles/index.css"

const ActivityItemFriends = () => {
    const [user, setUser] = useState();
    const [activities, setActivities] = useState([]);
    const [activityRun, setRuns] = useState([]);
    const [activityWeightlift, setWeightlift] = useState([]);
    const [activityCombined, setCombined] = useState([]);
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
                    //All activities
                    const allActivities=[];

                    const following= await axios.get(`/api/social/following/${user.username}`);
                    const keys =following.keys();

                    for (let userOfInterest of keys) {
                        //Get the user from backend
                        const userFollowing=await axios.get(`/api/users/getUser/${userOfInterest}`);

                        //Check if user is public
                        if (userFollowing.visibility===true) {
                            const resRun = await axios.get(`/api/activity/allActivitiesRuns/${userFollowing.username}`);
                            const resWeight = await axios.get(`/api/activity/allActivitiesWeightlifting/${userFollowing.username}`);
                            const resCombined = await axios.get(`/api/activity/allActivitiesCombined/${userFollowing.username}`);

                            setRuns(resRun.data);
                            setWeightlift(resWeight.data);
                            setCombined(resCombined.data);

                            allActivities.add([...resRun.data, ...resWeight.data, ...resCombined.data])
                        }

                    }

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
        <div>
            {activities.map((activity) => (
                <div className={`activity-item ${getActivityClass(activity.type)}`}>
                    <h3>Username {activity.user}</h3>
                    <h4>Title {activity.title}</h4>
                    <p>Type: {activity.type} </p>
                    <p>Duration: {activity.duration} </p>
                    {activity.distance !== undefined && <p><strong>Distance:</strong> {activity.distance} km</p>}
                    {activity.exercises && activity.exercises.length > 0 && (
                        <div className="exercise-section">
                            <h5>Exercises:</h5>
                            <ul>
                                {activity.exercises.map((ex, idx) => (
                                    <li key={idx}>
                                        {ex.name}: {ex.sets} sets × {ex.reps} reps  {ex.weight}kg
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                    <p>Timestamp: {activity.timestamp} </p>
                    <div className="activity-social">
                        <ul>
                            <button id="like-btn" >Like</button>
                            <button className="activity-comment" type="button">Comment</button>
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
};

export default ActivityItemFriends;