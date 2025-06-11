import React, { useState, useEffect } from "react";
import axios from "axios";
// Dettte er bare chatgpt, prøver å forstå hvordan man kan få merga activities inn i en liste
const FetchActivities = () => {
  const [activities, setActivities] = useState([]); 

  useEffect(() => {
    const fetchActivities = async () => {
      const user = JSON.parse(localStorage.getItem("loggedInUser"));
      try {
        const [baseRes, runRes, workoutRes] = await Promise.all([
          axios.get(`/api/activity/allActivities/${user.username}`),
          axios.get(`/api/activity/allActivitiesRuns/${user.username}`),
          axios.get(`/api/activity/allActivitiesWeightlifting/${user.username}`)
        
        ]);

        const baseActivities = baseRes.data;
        const runActivities = runRes.data;
        const workoutActivities = workoutRes.data;
        console.log("Base activities:", baseActivities);
        console.log("Run activities:", runActivities);
        console.log("Workout activities:", workoutActivities);

        // Merge logic:
        const mergedActivities = baseActivities.map(activity => {
          if (activity.type === "run") {
            const runDetails = runActivities.find(run => run.activityId === activity.activityId);
            return { ...activity, distance: runDetails?.distance };
          } else if (activity.type === "weightlifting") {
            const workoutDetails = workoutActivities.find(weightlift => weightlift.activityId === activity.activityId);
            return { ...activity, exercises: workoutDetails?.exercises || [] };
          } else {
            return activity;
          }
        });

        setActivities(mergedActivities);
      } catch (err) {
        console.error("Error fetching activities:", err);
      }
    };

    fetchActivities();
  }, []);

return (
  <div>
    {activities.map(activity => (
      <div key={activity.activityId}>
        <h3>{activity.title}</h3>
        <p>{activity.type}</p>
        <p>Duration: {activity.duration} min</p>
        {activity.type === "run" && <p>Distance: {activity.distance} km</p>}
        {activity.type === "workout" && activity.exercises?.length > 0 && (
          <ul>
            {activity.exercises.map(ex => (
              <li key={ex.exerciseId || `${ex.exerciseName}-${ex.exerciseSets}-${ex.exerciseReps}-${ex.exerciseWeight}`}>
                {ex.exerciseName} - {ex.exerciseSets}x{ex.exerciseReps} @ {ex.exerciseWeight}kg
              </li>
            ))}
          </ul>
        )}
      </div>
    ))}
  </div>
);

};

export default FetchActivities;
