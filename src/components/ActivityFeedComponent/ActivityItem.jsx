import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../styles/index.css";

const ActivityItem = () => {
  //her lagres de ulike statsene og objekter
  const [user, setUser] = useState();
  //Her lagres alle aktiviteter
  const [activities, setActivities] = useState([]);
  //Her lagres type aktiviteter inn i egne lister, for fremtidig bruk (Hvis man skal bruke filter)
  const [activityRun, setRuns] = useState([]); 
  const [activityWeightlift, setWeightlift] = useState([]);
  const [activityCombined, setCombined] = useState([]);
  const [comments, setComments] = useState({});
  const [openComments, setOpenComments] = useState({});
  const [newComments, setNewComments] = useState({});

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
  setOpenComments((visible) => ({
    ...visible,
    [activityId]: !visible[activityId],
  }));
};
//håndterer det som blit inputta av bruker og blir kalt når man begynner å skrive
const handleCommentChange = (activityId, value) => {
  setNewComments((inputs) => ({
    ...inputs,
    [activityId]: value,
  }));
};
//her poster man kommentaren som man har skrevet, og som ble lagret setNewComments
const handleCommentSubmit = async (activityId) => {
  const commentContent = newComments[activityId];
  //Hvis kommentaren er bare mellomrom eller ingenting
  if (!commentContent || commentContent.trim() === "") return;
  //dette som skal sendes av data
  try {
    const commentData = {
      comment_content: commentContent,
      username: user.username,
      activityId: activityId
    };

    await axios.post("/api/social/comment", commentData);

    // refresher når man har posta en kommentar
    fetchComments(activityId);
    setNewComments((refresh) => ({ ...refresh, [activityId]: "" }));
  } catch (error) {
    console.error("Error submitting comment:", error);
  }
};

//Her retuneres alle aktivitetItemsene som er laget
  return (
    <div>
      {activities.map((activity) => (
        <div className={`activity-item ${getActivityClass(activity.type)}`}>
          <h3>{activity.user}</h3>
          <h4>{activity.title}</h4>
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
              <button id="like-btn" >Like</button>
              <button
                onClick={() => toggleComments(activity.activityId)}
                className="activity-comment"
                type="button"
              >
                Comment
            </button>
              <span id="like-count"> likes</span>
            </ul>
           </div>
            {openComments[activity.activityId] && (
              <div className="commentSection">
                <div className="commentForm">
                <textarea
                  placeholder="Write a comment..."
                  value={newComments[activity.activityId] || ""}
                  onChange={(e) => handleCommentChange(activity.activityId, e.target.value)}
                  rows={2}
                  className="commentInput"
                />
                <button onClick={() => handleCommentSubmit(activity.activityId)}>
                  Submit
                </button>
                </div>                           
                {(comments[activity.activityId] || []).map((comment, id) => (
                  <div className="commentContent" key={id}>
                    <h5>{comment.username}</h5>
                    <p>{comment.comment_content}</p>  
                  </div>
                ))}
                
              </div>
            )}
        </div>

      ))}
    </div>
  )
};

export default ActivityItem;