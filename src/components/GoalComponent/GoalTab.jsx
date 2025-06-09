import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../styles/index.css";
import GoalRunList from "./GoalRunList";
import GoalWeightliftList from "./GoalWeightliftList";
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
        <div className="goalTab">
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
                <GoalRunList/>
            </div>

            <div className="goalTabContent" style={{ display: activeTab ==="Weightlift" ? "block" : "none"}}>
                <GoalWeightliftList/>
            </div>
        </div>
    );
};

export default GoalTab;