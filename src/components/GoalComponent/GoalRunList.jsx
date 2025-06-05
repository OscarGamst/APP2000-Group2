import React, { useEffect, useState } from "react";
import axios from "axios";

const GoalRunList = () => {
  const [goals, setGoals] = useState([]);
  const [user, setUser] = useState();

  useEffect(() => {
    const storedUser = localStorage.getItem("loggedInUser");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    const fetchGoals = async () => {
      if (user && user.username) {
        try {
          const res = await axios.get(`/api/goal/run/${user.username}`);
          setGoals(res.data);
        } catch (err) {
          console.error("Failed fetch", err);
        }
      }
    };
    fetchGoals();
  }, [user]);

  return (
    <div>
      <h3>Run Goals</h3>
      <ul>
        {goals.map((goal) => (
          <li key={goal.runGoalId}>
            Distance: {goal.distance} km, Time: {goal.time} min, Frequency: {goal.frequency}x/week
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GoalRunList;
