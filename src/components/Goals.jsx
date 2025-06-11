import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/index.css";

const Goals = () => {
  const [runGoals, setRunGoals] = useState([]);
  const [weightGoals, setWeightGoals] = useState([]);
  const [user, setUser] = useState(null);

  // Hent innlogget bruker
  useEffect(() => {
    const storedUser = localStorage.getItem("loggedInUser");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Hent mål fra databasen
  useEffect(() => {
    const fetchGoals = async () => {
      if (user && user.username) {
        try {
          const runRes = await axios.get(`/api/goal/run/${user.username}`);
          setRunGoals(runRes.data);

          const weightRes = await axios.get(`/api/goal/weightlifting/${user.username}`);
          setWeightGoals(weightRes.data);
        } catch (err) {
          console.error("Feil ved henting av mål:", err);
        }
      }
    };

    fetchGoals();
  }, [user]);

  return (
      <div className="goals-container">
        <h2>My Goals</h2>

        <div className="goals-content">
          <div className="goal-category">
            <h3> Running Goals</h3>

            {["weekly", "monthly", "yearly"].map((period) => (
                <div key={period}>
                  <h4>{period.charAt(0).toUpperCase() + period.slice(1)}</h4>
                  <ul>
                    {runGoals
                        .filter(goal => goal.repeating === period)
                        .map(goal => (
                            <li key={goal.runGoalId}>
                              {goal.frequency} times – {goal.distance} km in {goal.time} min
                            </li>
                        ))}
                  </ul>
                </div>
            ))}
          </div>

          <div className="goal-category">
            <h3>Weightlifting Goals</h3>

            {["weekly", "monthly", "yearly"].map((period) => (
                <div key={period}>
                  <h4>{period.charAt(0).toUpperCase() + period.slice(1)}</h4>
                  <ul>
                    {weightGoals
                        .filter(goal => goal.repeating === period)
                        .map(goal => (
                            <li key={goal.weightGoalId}>
                              {goal.frequency} times – {goal.exerciseName}, {goal.sets} sets, {goal.reps} reps, {goal.weight} kg
                            </li>
                        ))}
                  </ul>
                </div>
            ))}
          </div>
        </div>
      </div>
  );
};

export default Goals;



