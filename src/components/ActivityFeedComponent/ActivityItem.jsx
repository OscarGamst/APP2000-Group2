import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../styles/index.css"

const ActivityItem = () => {
  const [user, setUser] = useState();
  const [activities, setActivities] = useState([]);
  const [activityRun, setRuns] = useState([]);
  const [activityWeightlift, setWeightlift] = useState([]);

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
          console.log(activityRun);
          console.log(activityWeightlift);
          setRuns(resRun.data);
          setWeightlift(resWeight.data);

          setActivities([...resRun.data, ...resWeight.data]);
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
          <p>Type: {activity.type} </p>
          <p>Duration: {activity.duration} </p>
          <p>Distance: {activity.distance}km</p>
          <p>Timestamp: {activity.timestamp} </p>
        </div>

      ))}
    </div>
  )
}

export default ActivityItem;