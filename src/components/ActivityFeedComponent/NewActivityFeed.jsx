import React, {useEffect, useState} from 'react';
import "../../styles/index.css";

import axios from "axios";

const NewActivityFeed = () => {

    const [feedFilter, setFeedFilter]=useState("all");
    const [updateButton, setUpdateButton]=useState({});
    const [tempActivityId, setTempActivityId]=useState(0);

    const [user, setUser] = useState();
    //Her lagres alle aktiviteter
    const [activities, setActivities] = useState([]);
    //Her lagres type aktiviteter inn i egne lister, for fremtidig bruk (Hvis man skal bruke filter)
    const [activityRun, setRuns] = useState([]);
    const [activityWeightlift, setWeightlift] = useState([]);
    const [activityCombined, setCombined] = useState([]);
    const [comments, setComments] = useState({});
    const [openComments, setOpenComments] = useState({});

    // likes må jobbes med, men vanskelig å teste før vio kan se andres aktiviteter
    //const [likedActivities, setLikedActivities] = useState({});
    // const [likeCounts, setLikeCounts] = useState({});
    useEffect(() => {
        const storedUser = localStorage.getItem("loggedInUser");
        if(storedUser) {
            setUser(JSON.parse(storedUser));
        }
    },[])

    //Henter aktiviteter for bruker som er logget inn
    useEffect(() => {
        const fetchActivities = async () => {
            if (user && user.username) {
                try {
                    const resRun = await axios.get(`/api/activity/allActivitiesRuns/${user.username}`);
                    const resWeight = await axios.get(`/api/activity/allActivitiesWeightlifting/${user.username}`);
                    const resCombined = await axios.get(`/api/activity/allActivitiesCombined/${user.username}`);
                    setRuns(resRun.data);
                    setWeightlift(resWeight.data);
                    setCombined(resCombined.data);
                    setActivities([...resRun.data, ...resWeight.data, ...resCombined.data]);
                    const allActivities = [...resRun.data, ...resWeight.data, ...resCombined.data];

                } catch (err) {
                    console.error("Failed fetch for activities", err);
                }
            }
        };
        fetchActivities();
    }, [user]);

    //Setter en CSS class på en item basert på type aktivitet
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


    const deletePost = async (activityId) => {
        try {
            await axios.delete(`/api/activity/deleteActivity/${activityId}`);
        } catch (err) {
            console.error(`Failed to delete activity ${activityId}`, err);
        }
    }

    const [postAccess, setPostAccess]=useState("private");

    const showUpdateForm = (activityId) => {

        setUpdateButton((visible) => ({
            ...visible,
            [activityId]:!visible[activityId],
        }));
    }




    const handleSubmit = async (event) => {

        event.preventDefault();

        const newPostInfo={};

        console.log(tempActivityId);

        newPostInfo.duration=(Number(event.target.elements.duration.value));
        newPostInfo.description=(String(event.target.elements.description.value));
        newPostInfo.title=(String(event.target.elements.title.value));
        newPostInfo.access=(String(postAccess));
        newPostInfo.activityId=Number(tempActivityId);

        try {
            await axios.put("api/activity/updateActivity",newPostInfo);
        } catch (err) {
            console.error(err);
            alert("YIKES ! Error !!");
        }
        setUpdateButton(true);

    }

    return (
        <div className="activity-list-container">
            <h2 className="activity-list-header">Activity Feed</h2>
            <div>
                <form>
                    <div>
                        <select
                            id="feedSort"
                            name="feedSort"
                            value={feedFilter}
                            onChange={(e) => setFeedFilter(e.target.value)}
                        >
                            <option value="all">All</option>
                            <option value="weightlifting">Weightlifting</option>
                            <option value="run">Running</option>
                            <option value="combined">Combined</option>
                        </select>
                    </div>
                </form>
            </div>
            {activities.map((activity) => (
                <div className={`activity-item ${getActivityClass(activity.type)}`}>
                    {(feedFilter==="all" || feedFilter===activity.type) ?
                        <div>
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
                                                {ex.name}: {ex.sets} sets x {ex.reps} reps  {ex.weight}kg
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                            <p>Timestamp: {activity.timestamp} </p>
                            <div className="activity-social">
                                <button id="like-btn"
                                        onClick={()=> deletePost(activity.activityId)}
                                >Delete</button>
                                {!updateButton[activity.activityId] ?
                                    (<div><button id="like-btn"
                                                  onClick={() => {
                                                      setTempActivityId(activity.activityId);
                                                      showUpdateForm(Number(activity.activityId));}}
                                    >Edit</button>
                                    </div>):(
                                        <div>
                                            <div>
                                                <form onSubmit={handleSubmit}>
                                                    <div>
                                                        <label>Title : </label>
                                                        <input
                                                            type="text"
                                                            id="title"
                                                            name="title"
                                                            required
                                                        />
                                                    </div>
                                                    <div>
                                                        <label>Description : </label>
                                                        <textarea
                                                            id="description"
                                                            name="description"
                                                            required
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
                                                        />
                                                    </div>
                                                    <button type="submit">Save</button>
                                                </form>
                                            </div>
                                        </div>)}
                            </div>
                        </div>:null}
                </div>

            ))}
        </div>
    )
};

export default NewActivityFeed;
