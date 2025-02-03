import React, { useState, useEffect } from "react";
import "../styles/index.css";
import GoalPopup from "./GoalPopup";

const Goals = () => {
  const getStoredGoals = () => {
    const storedGoals = localStorage.getItem("goals");
    return storedGoals ? JSON.parse(storedGoals) : {
      Running: ["17km in 2 hrs", "Compete in marathon"],
      Weightlifting: ["12kg curls", "23 pushups rep", "45kg deadlift"],
    };
  };

  const [goals, setGoals] = useState(getStoredGoals);
  const [showPopup, setShowPopup] = useState(false);

  
  useEffect(() => {
    localStorage.setItem("goals", JSON.stringify(goals));
  }, [goals]);

  
  const addGoal = (category, goal) => {
    setGoals((prev) => ({
      ...prev,
      [category]: [...(prev[category] || []), goal],
    }));
  };

  
  const removeGoal = (category, goalIndex) => {
    setGoals((prev) => {
      const updatedGoals = { ...prev };
      updatedGoals[category] = updatedGoals[category].filter((_, index) => index !== goalIndex);

      if (updatedGoals[category].length === 0) {
        delete updatedGoals[category];
      }

      return updatedGoals;
    });
  };

  return (
    <div className="goals-container">
      <div className="goals-header">
        <h2>My Goals</h2>
        <button className="add-goal-button" onClick={() => setShowPopup(true)}>
          Add Goal
        </button>
      </div>

      <div className="goals-content">
        {Object.keys(goals).map((category) => (
          <div key={category} className="goal-category">
            <h3>{category}:</h3>
            <ul>
              {goals[category].map((goal, index) => (
                <li key={index}>
                  {goal}
                  <button className="delete-goal-button" onClick={() => removeGoal(category, index)}>
                    ❌
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Popup vises kun hvis showPopup er true */}
      {showPopup && <GoalPopup onClose={() => setShowPopup(false)} onAddGoal={addGoal} />}
    </div>
  );
};

export default Goals;

