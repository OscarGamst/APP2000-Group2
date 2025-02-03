import React, { useState } from "react";
import "../styles/index.css";
import "../styles/responsive.css";
import { FormatDuration } from "./FormatDuration";


// checks the type of activity, and returns a CSS class
const getActivityClass = (type) => { 
  switch (type) {
    case "workout":
      return "activity-workout"; 
    case "run":
      return "activity-run"; 
    default:
      return "activity-default"; 
  }
};

const ActivityItem = ({ activity }) => { 
  const [likes, setLikes] = useState(0); 
  const [liked, setLiked] = useState(false); 

  const toggleLike = () => {
    if (liked) { 
      setLikes(likes - 1);
    } else {
      setLikes(likes + 1); 
    }
    setLiked(!liked);
  };

  // returns items and adds HTML tags based on class and data input
  return (
    <div className={`activity-item ${getActivityClass(activity.type)}`}>
      <img src={activity.profilePic} alt="#" />
      <h3>{activity.username}</h3> 
      <h4>{activity.title}</h4> 
      <p>{activity.description}</p>
      <p><strong>Duration:</strong> {FormatDuration(activity.duration)}</p> 
      {activity.distance !== undefined && <p><strong>Distance:</strong> {activity.distance} km</p>} 
      <div className="activity-social">
        <ul>
          <button id="like-btn" onClick={toggleLike}> 
            {liked ? "Unlike" : "Like"}
          </button>
          <button className="activity-comment" type="button">Comment</button>
          <span id="like-count">{likes} likes</span> 
        </ul>
      </div>
    </div>
  );
};

export default ActivityItem;



