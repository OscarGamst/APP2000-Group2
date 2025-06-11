import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../styles/index.css"

const ActivityItemRun = () => {

  const [user, setUser] = useState();
  const [runs, setRuns] = useState([]);

  useEffect(() => {
    const storedUser = localStorage.getItem("loggedInUser");
    if(storedUser) {
      setUser(JSON.parse(storedUser));
    }
  },[])

  useEffect(() => {
    const fetchRuns = async () => {
      if (user && user.username) {
        try {
          const res = await axios.get(`/api/activity/allActivitiesRuns/${user.username}`);
          setRuns(res.data);
        } catch (err) {
          console.error("Failed fetch for runs", err);
        }
      }
    };
    fetchRuns();
  }, [user]);

  return (
    <div>
      {runs.map((run) => (
        <div className="activity-item activity-run">
          <h3>Username {run.user}</h3>
          <h4>Title {run.title}</h4>
          <p>Duration: {run.duration} </p>
          <p>Distance: {run.distance}km</p>
        </div>

      ))}
    </div>
  )
}

export default ActivityItemRun;