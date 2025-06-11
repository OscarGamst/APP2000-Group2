import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../styles/index.css"

const ActivityItem = () => {

  const [user, setUser] = useState();
  const [activities, setActivities] = useState([]);

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
          const res = await axios.get(`/api/activity/allActivities//${user.username}`);
          setActivities(res.data);
        } catch (err) {
          console.error("Failed fetch for activities", err);
        }
      }
    };
    fetchActivities();
  }, [user]);

  return (
    <div>
      {activities.map((activity) => (
        <div className="activity-item">
          <h3>Username {activity.user}</h3>
          <h4>Title {activity.title}</h4>
          <p>Duration: {activity.duration} </p>
          <p>Distance: {activity.distance}km</p>
          <p>Timestamp: {activity.timestamp} </p>
        </div>

      ))}
    </div>
  )
}

export default ActivityItem;