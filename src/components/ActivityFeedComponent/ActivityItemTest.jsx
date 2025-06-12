import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../styles/index.css";

const ActivityItemTest = () => {
  const [user, setUser] = useState();

  // Own activities
  const [activities, setActivities] = useState([]);
  const [activityRun, setRuns] = useState([]);
  const [activityWeightlift, setWeightlift] = useState([]);
  const [activityCombined, setCombined] = useState([]);

  // Following activities
  const [activitiesFollow, setActivitiesFollow] = useState([]);
  const [activityRunFollow, setRunsFollow] = useState([]);
  const [activityWeightliftFollow, setWeightliftFollow] = useState([]);
  const [activityCombinedFollow, setCombinedFollow] = useState([]);

  // Comments
  const [comments, setComments] = useState({});
  const [openComments, setOpenComments] = useState({});
  const [newComments, setNewComments] = useState({});

  // Filter state: "own" or "following"
  const [activityFilter, setActivityFilter] = useState("own");

  useEffect(() => {
    const storedUser = localStorage.getItem("loggedInUser");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Fetch own activities
  useEffect(() => {
    const fetchActivities = async () => {
      if (user?.username) {
        try {
          const resRun = await axios.get(`/api/activity/allActivitiesRuns/${user.username}`);
          const resWeight = await axios.get(`/api/activity/allActivitiesWeightlifting/${user.username}`);
          const resCombined = await axios.get(`/api/activity/allActivitiesCombined/${user.username}`);

          setRuns(resRun.data);
          setWeightlift(resWeight.data);
          setCombined(resCombined.data);

          const all = [...resRun.data, ...resWeight.data, ...resCombined.data];
          setActivities(all);

          all.forEach((activity) => fetchComments(activity.activityId));
        } catch (err) {
          console.error("Failed to fetch own activities", err);
        }
      }
    };
    fetchActivities();
  }, [user]);

  // Fetch followed users' activities
  useEffect(() => {
    const fetchFollowingActivities = async () => {
      if (user?.username) {
        try {
          const followRes = await axios.get(`/api/social/following/${user.username}`);
          const followedUsernames = followRes.data.map((f) => f.followedUsername);

          const runs = [];
          const weightlifts = [];
          const combined = [];

          for (const username of followedUsernames) {
            const resRun = await axios.get(`/api/activity/allActivitiesRuns/${username}`);
            const resWeight = await axios.get(`/api/activity/allActivitiesWeightlifting/${username}`);
            const resCombined = await axios.get(`/api/activity/allActivitiesCombined/${username}`);

            runs.push(...resRun.data);
            weightlifts.push(...resWeight.data);
            combined.push(...resCombined.data);
          }

          setRunsFollow(runs);
          setWeightliftFollow(weightlifts);
          setCombinedFollow(combined);

          const all = [...runs, ...weightlifts, ...combined];
          setActivitiesFollow(all);

          all.forEach((activity) => fetchComments(activity.activityId));
        } catch (err) {
          console.error("Failed to fetch following activities", err);
        }
      }
    };
    fetchFollowingActivities();
  }, [user]);

  const fetchComments = async (activityId) => {
    try {
      const res = await axios.get("/api/social/comment", {
        params: { activityId },
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

  const toggleComments = (activityId) => {
    setOpenComments((prev) => ({
      ...prev,
      [activityId]: !prev[activityId],
    }));
  };

  const handleCommentChange = (activityId, value) => {
    setNewComments((prev) => ({
      ...prev,
      [activityId]: value,
    }));
  };

  const handleCommentSubmit = async (activityId) => {
    const content = newComments[activityId];
    if (!content || content.trim() === "") return;

    try {
      await axios.post("/api/social/comment", {
        comment_content: content,
        username: user.username,
        activityId,
      });

      fetchComments(activityId);
      setNewComments((prev) => ({ ...prev, [activityId]: "" }));
    } catch (err) {
      console.error("Error submitting comment:", err);
    }
  };

  // Filtered activities based on selection
  const filteredActivities = activityFilter === "following" ? activitiesFollow : activities;

  // Optional: sort by timestamp (latest first)
  const sortedActivities = [...filteredActivities].sort(
    (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
  );

  return (
    <div>
      {/* Filter dropdown */}
      <div className="activity-filter">
        <label>Filter:</label>
        <select value={activityFilter} onChange={(e) => setActivityFilter(e.target.value)}>
          <option value="own">My Activities</option>
          <option value="following">Following</option>
        </select>
      </div>

      {/* Render activities */}
      {sortedActivities.map((activity) => (
        <div key={activity.activityId} className={`activity-item ${getActivityClass(activity.type)}`}>
          <h3>{activity.user}</h3>
          <h4>{activity.title}</h4>
          <p>Type: {activity.type}</p>
          <p>Duration: {activity.duration}</p>
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
          <p>Timestamp: {activity.timestamp}</p>
          <div className="activity-social">
            <ul>
              <button id="like-btn">Like</button>
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
                <button onClick={() => handleCommentSubmit(activity.activityId)}>Submit</button>
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

export default ActivityItemTest;
