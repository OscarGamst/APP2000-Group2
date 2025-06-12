import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../styles/index.css";

const GoalWeightliftList = () => {
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
          const res = await axios.get(`/api/goal/weightlifting/${user.username}`);
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
      <h3>Weekly Goals</h3>
      <ul>
        {goals
          .filter((goal) => goal.repeating === "weekly")
          .map((goal) => (
            <li key={goal.weightGoalId}>
              {goal.frequency} Times, {goal.exerciseName}, Sets: {goal.sets}, Weight: {goal.weight}, Reps: {goal.reps}
            </li>
          ))}
      </ul>

      <h3>Monthly Goals</h3>
      <ul>
        {goals
          .filter((goal) => goal.repeating === "monthly")
          .map((goal) => (
            <li key={goal.weightGoalId}>
              {goal.frequency} Times, {goal.exerciseName}, Sets: {goal.sets}, Weight: {goal.weight}, Reps: {goal.reps}
            </li>
          ))}
      </ul>

      <h3>Yearly Goals</h3>
      <ul>
        {goals
          .filter((goal) => goal.repeating === "yearly")
          .map((goal) => (
            <li key={goal.weightGoalId}>
            {goal.frequency} Times, {goal.exerciseName}, Sets: {goal.sets}, Weight: {goal.weight}, Reps: {goal.reps}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default GoalWeightliftList;