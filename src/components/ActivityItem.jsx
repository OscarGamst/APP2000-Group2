import React, { useState } from "react";
import "../styles/index.css";
import "../styles/responsive.css";
import { FormatDuration } from "./FormatDuration"; //this will format the duration

const getActivityClass = (type) => { // checks the type of activity
  switch (type) {
    case "workout":
      return "activity-workout"; //returns CSS class
    case "run":
      return "activity-run"; // returns CSS class
    default:
      return "activity-default"; // Default if it's not defined
  }
};

const ActivityItem = ({ activity }) => { // Like function
  const [likes, setLikes] = useState(0); // default state is 0
  const [liked, setLiked] = useState(false); //If liked it will be false

  const toggleLike = () => {
    if (liked) { //if you have already liked it, it will unlike (onoclick)
      setLikes(likes - 1);
    } else {
      setLikes(likes + 1); // if you have not, it will be liked (onclick)
    }
    setLiked(!liked);
  };

  return (
    <div className={`activity-item ${getActivityClass(activity.type)}`}> {/*it will call the function for type/class*/}
      <h4>{activity.title}</h4> 
      <p>{activity.description}</p>
      <p><strong>Duration:</strong> {FormatDuration(activity.duration)}</p> {/* calls the format function */}
      {activity.distance !== undefined && <p><strong>Distance:</strong> {activity.distance} km</p>} {/* adds distance if needed */}
      <div className="activity-social">
        <ul>
          <button id="like-btn" onClick={toggleLike}> {/* ToggleLike function (either it's liked or not) */}
            {liked ? "Unlike" : "Like"}
          </button>
          <button className="activity-comment" type="button">Comment</button>
          <span id="like-count">{likes} likes</span> {/*Keeps count of amount of likes */}
        </ul>
      </div>
    </div>
  );
};

export default ActivityItem;



