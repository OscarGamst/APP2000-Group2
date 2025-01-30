import React from "react";
import ActivityFeed from "../components/ActivityFeed";
import ProfileCard from "../components/ProfileCard";
import ProgressBar from "../components/ProgressBar";
import RecentActivityFeed from "../components/RecentActivityFeed";
import "../styles/index.css";


const TestPageNoNav = () => {
    return (
      <div className="activity-page">
      {/* Toppseksjon */}
      <div className="activity-header">
        <h2>Running</h2>
        <button className="filter-button">Filter ▼</button>
      </div>

      <div className="activity-layout">
        {/* Venstre kolonne */}
        <div className="left-column">
          {/* Progress */}
          <div className="progress-section">
            <h3>Progress Last 30 Days</h3>
            <div className="progress-chart">
              <div className="chart-placeholder">[Chart]</div>
            </div>
          </div>

          {/* Activities */}
          <div className="activities-section">
            <h3>Activities Last 30 Days</h3>
            <div className="activity-item">
              <h4>Løping</h4>
              <p>date: </p>
              <p>km ran: 7km</p>
              <p>time: 1hrs 58min</p>
              <p>"Følte jeg fikk gjort mye i dag!"</p>
            </div>
            <div className="activity-item">
              <h4>Løping</h4>
              <p>date: </p>
              <p>km ran: 7km</p>
              <p>time: 1hrs 58min</p>
              <p>Følte jeg fikk gjort mye i dag!</p>
            </div>
          </div>
        </div>

        {/* Høyre kolonne */}
        <div className="right-column">
          {/* My Goals */}
          <div className="goals-section">
            <h3>My Goals</h3>
            <ul>
              <li>Running: [17km in 2 hrs], [compete in marathon]</li>
              <li>Weightlifting: [12kg curls], [23 pushups rep], [45kg deadlift]</li>
            </ul>
            <button className="add-goal-button">Add Goal</button>
          </div>

          {/* Add Activity */}
          <div className="add-activity-section">
            <h3>Add Activity</h3>
            <button className="add-activity-button">Add Activity</button>
          </div>
        </div>
      </div>
    </div>
  );
};

  export default TestPageNoNav;