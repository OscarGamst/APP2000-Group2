import React, { useState } from "react";
import "../styles/index.css";



const Goals = () => {
  const [goals, setGoals] = useState({
    Running: ["17km in 2 hrs", "compete in marathon"],
    Weightlifting: ["12kg curls", "23 pushups rep", "45kg deadlift"],
  });

  const addGoal = () => {
    const category = prompt("Enter category (e.g., Running):");
    const goal = prompt("Enter goal (e.g., 5km in 30 mins):");
    if (category && goal) {
      setGoals((prev) => ({
        ...prev,
        [category]: [...(prev[category] || []), goal],
      }));
    }
  };

  return (
    <div className="goals-container">
      <div className="goals-header">
        <h2>My Goals</h2>
        <button className="add-goal-button" onClick={addGoal}>
          Add Goal
        </button>
      </div>
      <div className="goals-content">
        {Object.keys(goals).map((category) => (
          <div key={category} className="goal-category">
            <h3>{category}:</h3>
            <ul>
              {goals[category].map((goal, index) => (
                <li key={index}>{goal}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Goals;
