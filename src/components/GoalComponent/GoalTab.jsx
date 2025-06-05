import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../styles/index.css";
import GoalRunList from "./GoalRunList";
/*
<div className="goalTab">
    <button className="goalTabLinks" onClick="openGoal(event, 'Run')">Run</button>
    <button className="goalTabLinks" onClick="openGoal(event, 'Weight')">Run</button>
</div>
*/

const GoalTab = () => {
    // dette er hvor vi lagrer en activeTab, satt den på run som default for nå, kanskje la bruker velge
    const [activeTab, setActiveTab] = useState("Run")

    // Denne funksjonen kalles når man trykker på en av knappene, setter tabben som aktiv
    const handleTabClick = (goal) => {
        setActiveTab(goal);
    };

    return (
        <div>
            <div className="goalTabs">
                {/* Hver button er en tab, enten så er den "active" eller så er det en tom string */}
                <button
                    className={`tabLinks ${activeTab === "Run" ? "active" : ""}`}
                    onClick={() => handleTabClick("Run")}
                    > Run                    
                </button>
                <button
                    className={`tabLinks ${activeTab === "Weightlift" ? "active" : ""}`}
                    onClick={() => handleTabClick("Weightlift")}
                > Weightlift
                </button>
            </div>

            <div className="goalTabContent" style={{ display: activeTab ==="Run" ? "block" : "none"}}>
                <h3>RunGoal</h3>
                <p>test</p>
                <GoalRunList/>
            </div>

            <div className="goalTabContent" style={{ display: activeTab ==="Weightlift" ? "block" : "none"}}>
                <h3>WeightGoal</h3>
                <p>test2</p>
            </div>
        </div>
    );
};

export default GoalTab;