import React from "react";
import { Link } from "react-router-dom";
import "../styles/index.css";

const TestBar = () => {
    return (
        <nav className ="testBar">
            <ul className="testbar-links">
                <li><Link to="/">Homepage</Link></li>
                <li><Link to="/profile">profile</Link></li>
            </ul>
        </nav>
    );
};

export default TestBar;