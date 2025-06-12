import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../styles/index.css";

const Goals = () => {
  const [runGoals, setRunGoals] = useState([]);
  const [weightGoals, setWeightGoals] = useState([]);
  const [user, setUser] = useState(null);

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

  const periods = ["weekly", "monthly", "yearly"];
  const hasAnyGoals = runGoals.length > 0 || weightGoals.length > 0;

  return (
      <div className="goals-container">
        <h2>My Goals</h2>

        {!hasAnyGoals && (
            <p className="no-goals-message">No goals yet </p>
        )}

        {hasAnyGoals && (
            <div className="goals-content">
              {/* RUNNING GOALS */}
              {runGoals.length > 0 && (
                  <div className="goal-category">
                    <h3> Running Goals</h3>
                    {periods.map((period) => {
                      const goalsForPeriod = runGoals.filter(goal => goal.repeating === period);
                      if (goalsForPeriod.length === 0) return null;

                      return (
                          <div key={period}>
                            <h4>{period.charAt(0).toUpperCase() + period.slice(1)}</h4>
                            <ul>
                              {goalsForPeriod.map(goal => (
                                  <li key={goal.runGoalId}>
                                    {goal.frequency} times – {goal.distance} km in {goal.time} min
                                  </li>
                              ))}
                            </ul>
                          </div>
                      );
                    })}
                  </div>
              )}

              {/* WEIGHTLIFTING GOALS */}
              {weightGoals.length > 0 && (
                  <div className="goal-category">
                    <h3> Weightlifting Goals</h3>
                    {periods.map((period) => {
                      const goalsForPeriod = weightGoals.filter(goal => goal.repeating === period);
                      if (goalsForPeriod.length === 0) return null;

                      return (
                          <div key={period}>
                            <h4>{period.charAt(0).toUpperCase() + period.slice(1)}</h4>
                            <ul>
                              {goalsForPeriod.map(goal => (
                                  <li key={goal.weightGoalId}>
                                    {goal.frequency} times – {goal.exerciseName}, {goal.sets} sets, {goal.reps} reps, {goal.weight} kg
                                  </li>
                              ))}
                            </ul>
                          </div>
                      );
                    })}
                  </div>
              )}
            </div>
        )}
      </div>
  );
};

export default Goals;

