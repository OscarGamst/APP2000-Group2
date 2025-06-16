import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../styles/index.css";

const ActivityItem = () => {
  //her lagres de ulike statsene og objekter
  const [user, setUser] = useState();
  //Egne aktiviteter
  const [activities, setActivities] = useState([]);
  const [activityRun, setRuns] = useState([]); 
  const [activityWeightlift, setWeightlift] = useState([]);
  const [activityCombined, setCombined] = useState([]);
  //Following aktiviteter
  const [activitiesFollow, setActivitiesFollow] = useState([]);
  const [activityRunFollow, setRunsFollow] = useState([]); 
  const [activityWeightliftFollow, setWeightliftFollow] = useState([]);
  const [activityCombinedFollow, setCombinedFollow] = useState([]);
  //Kommentarer
  const [comments, setComments] = useState([]);
  const [openComments, setOpenComments] = useState([]);
  const [newComments, setNewComments] = useState([]);
  //console.log(openComments);
  //Filter på egne og andres aktiviteter
  const [activityFilter, setActivityFilter] = useState("own");

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
          //Henter fra endpoinsta
          const resRun = await axios.get(`/api/activity/allActivitiesRuns/${user.username}`);
          const resWeight = await axios.get(`/api/activity/allActivitiesWeightlifting/${user.username}`);
          const resCombined = await axios.get(`/api/activity/allActivitiesCombined/${user.username}`);
          //console.log(activityRun);
          //console.log(activityWeightlift);
          //setter det som ble hentet
          setRuns(resRun.data);
          setWeightlift(resWeight.data);
          setCombined(resCombined.data);
          setActivities([...resRun.data, ...resWeight.data, ...resCombined.data]);
          const allActivities = [...resRun.data, ...resWeight.data, ...resCombined.data];
          //Henter kommentarer
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

  //Henter andres aktiviteter, ganske lik logikk som med egne aktiviteter
  useEffect(() => {
      const fetchFollowingActivities = async () => {
        if (user && user.username) {
          try {
            //Hnenter alle following og mapper de så vi kan gå gjennom med løkke
            const followRes = await axios.get(`/api/social/following/${user.username}`);
            const followedUsernames = followRes.data.map((follow) => follow.followedUsername);
            
            //midlertidlige lister så daten ikke blir borte i forløkka
            const runs = [];
            const weightlifts = [];
            const combined = [];

            //
            for (const username of followedUsernames) {
              const resRun = await axios.get(`/api/activity/allActivitiesRuns/${username}`);
              const resWeight = await axios.get(`/api/activity/allActivitiesWeightlifting/${username}`);
              const resCombined = await axios.get(`/api/activity/allActivitiesCombined/${username}`);

              //legger aktivitetne i de midlertidlige listene
              runs.push(...resRun.data);
              weightlifts.push(...resWeight.data);
              combined.push(...resCombined.data);
            }

            //Setter dataen
            setRunsFollow(runs);
            setWeightliftFollow(weightlifts);
            setCombinedFollow(combined);

            const all = [...runs, ...weightlifts, ...combined];
            setActivitiesFollow(all);

            //Henter kommentarer på aktivitetene
            all.forEach((activity) => fetchComments(activity.activityId));

          } catch (err) {
            console.error("Failed to fetch following activities", err);
          }
        }
      };
      fetchFollowingActivities();
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
    ...visible,[activityId]: !visible[activityId],
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
//Selve filteret på egne og andres aktiviteter 
const filteredActivities = activityFilter === "following" ? activitiesFollow : activities;

//Denne er fra chatgpt, sortering på når det legges ut
  const sortedActivities = [...filteredActivities].sort(
    (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
  );

  const likeActivity = async (activityId) => {
    try {
      await axios.post(`/api/social/like?username=${user.username}&activityId=${activityId}`);
    } catch (error) {
      console.error("Error submitting like:", error);
    }
  }

//Her retuneres alle aktivitetItemsene som er laget
   return (
    <div>
      {/* Filter til egne/andres aktiviteter */}
      <div className="activity-filter">        
        <select value={activityFilter} onChange={(e) => setActivityFilter(e.target.value)}>
          <option value="own">My Activities</option>
          <option value="following">Following</option>
        </select>
      </div>
      {/* Aktivitetene mappes her */}
      {sortedActivities.map((activity) => (
        <div key={activity.activityId} className={`activity-item ${getActivityClass(activity.type)}`}>
          <h3>{activity.user}</h3>
          <h4>{activity.title}</h4>
          <p>Activity-{activity.type}</p>
          <p>Duration: {activity.duration}min</p>
          {activity.distance !== undefined && <p><strong>Distance:</strong> {activity.distance} km</p>}
          {activity.exercises && activity.exercises.length > 0 && (
            <div className="exercise-section">
              <h5>Exercises:</h5>
              <ul>
                {activity.exercises.map((ex, idx) => (
                  <li key={idx}>
                    {ex.name}: {ex.sets} sets x {ex.reps} reps {ex.weight}kg
                  </li>
                ))}
              </ul>
            </div>
          )}
          <p>{activity.description}</p>
          <p>Published: {(activity.timestamp).slice(0,10)} at {(activity.timestamp).slice(12,19)}</p>
          <div className="activity-social">
            <ul>
              <button id="like-btn"
                onClick={()=>likeActivity(activity.activityId)}>
                  Like
              </button>
              <button onClick={() => toggleComments(activity.activityId)} className="activity-comment">
                Comment
              </button>
              <span id="like-count">likes</span>
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
                <button className="commentButton" onClick={() => handleCommentSubmit(activity.activityId)}>Submit</button>
              </div>
              {(comments[activity.activityId] || []).map((comment, idx) => (
                <div className="commentContent" key={idx}>
                  <h5>{comment.username}</h5>
                  <p>{comment.comment_content}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ActivityItem;