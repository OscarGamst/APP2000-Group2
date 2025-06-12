import React from "react";
import "../styles/index.css";
import RegisterActivity from "./RegisterActivityComponent/RegisterActivity.jsx";
import NewGoal from "./NewGoalComponent/NewGoal.jsx";

const Add = () => {
    return (
        <div>
            <div className="">
                <NewGoal/>
            </div>
            <div className="add-container">
                <RegisterActivity/>
            </div>
        </div>
        );
};

export default Add;
