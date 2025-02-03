import React, { useState } from "react";

const GoalPopup = ({ onClose, onAddGoal }) => {
  const [category, setCategory] = useState("");
  const [goal, setGoal] = useState("");

  const handleAdd = () => {
    if (category && goal) {
      onAddGoal(category, goal);
      setCategory("");
      setGoal("");
      onClose(); // Lukk popup etter at målet er lagt til
    }
  };

  return (
    <div className="popup-overlay">
      <div className="popup">
        <h3>Add New Goal</h3>
        <input
          type="text"
          placeholder="Category (e.g., Running)"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <input
          type="text"
          placeholder="Goal (e.g., 5km in 30 mins)"
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
        />
        <div className="popup-buttons">
          <button className="add-goal-button" onClick={handleAdd}>
            Add Goal
          </button>
          <button className="close-popup-button" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default GoalPopup;
