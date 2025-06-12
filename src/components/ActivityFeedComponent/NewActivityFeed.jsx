import React, {useEffect, useState} from 'react';
import "../../styles/index.css";

//Placeholder:3
import axios from "axios";


//To get the activities from the database, we have to get the username of the user that is currently
//logged in.




//Should be able to get activities from friends and your own.
//Your activities can be filtered to show only runs, weightlifting or
//combined activities.

const NewActivityFeed = () => {

    const [feedFilter, setFeedFilter]=useState("all");
    const [updateButton, setUpdateButton]=useState({});

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
                    //console.log(activityRun);
                    //console.log(activityWeightlift);
                    setRuns(resRun.data);
                    setWeightlift(resWeight.data);
                    setCombined(resCombined.data);
                    setActivities([...resRun.data, ...resWeight.data, ...resCombined.data]);
                    const allActivities = [...resRun.data, ...resWeight.data, ...resCombined.data];

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

    //Henter alle kommentarer på en aktivitet
    const fetchComments = async (activityId) => {
        try {
            const res = await axios.get("/api/social/comment", {
                params: { activityId: activityId }
            });
            setComments((prev) => ({ ...prev, [activityId]: res.data }));
        } catch (err) {
            console.error(`Failed to fetch comments for activity ${activityId}`, err);
        }
    };

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

//Gjør kommentarer synlig med en toggleknapp
    const toggleComments = (activityId) => {
        setOpenComments((prev) => ({
            ...prev,
            [activityId]: !prev[activityId],
        }));
    };

    const deletePost = async (activityId) => {
        try {
            const deleteActivity=await axios.delete(`/api/activity/deleteActivity/${activityId}`);
        } catch (err) {
            console.error(`Failed to delete activity ${activityId}`, err);
        }
    }

    const [postAccess, setPostAccess]=useState("private");

    const showUpdateForm = (activityId) => {
        
        setUpdateButton((visible) => ({
            ...visible,
            [activityId:!visible[activityId],
        }));
    }

    const UpdatePost = (activityId) => {


        const handleSubmit = async (event) => {

            event.preventDefault();

            const newPostInfo={};

            newPostInfo.duration(Number(event.target.elements.duration.value));
            newPostInfo.description(String(event.target.elements.description.value));
            newPostInfo.title(String(event.target.elements.title.value));
            newPostInfo.access(String(postAccess));
            newPostInfo.activityId(activityId);

            try {
                await axios.put("api/activity/updateActivity",newPostInfo);
            } catch (err) {
                console.error(err);
                alert("YIKES ! Error !!");
            }
            setUpdateButton(true);

        }

        return(
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
        )
    }

    return (
        <div className="activity-list-container">
            <h2 className="activity-list-header">Activity Feed</h2>
            <div>
                <form>
                    <div>
                        <label>Sort By:</label>
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
                                <ul>
                                    <button id="like-btn"
                                        onClick={()=> deletePost(activity.activityId)}
                                    >Delete</button>
                                    {setUpdateButton[activity.activityId] && <button id="like-btn"
                                            onClick={() => showUpdateForm(activity.activityId)}
                                            >Edit</button> : <UpdatePost activityId={(activity.activityId)}/>
                                    }
                                </ul>
                            </div>
                            {openComments[activity.activityId] && (
                                <div className="commentSection">
                                    <p>Comments:</p>
                                    {(comments[activity.activityId] || []).map((comment, id) => (
                                        <div className="commentContent" key={id}>
                                            <h5>{comment.username}</h5>
                                            <p>{comment.comment_content}</p>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>:null}
                </div>

            ))}
        </div>
    )
};

export default NewActivityFeed;
