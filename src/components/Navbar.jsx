// src/components/Navbar.js
import React from "react";
import { Link } from "react-router-dom";
import "../styles/index.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul className="navbar-links">
        <li><Link to="/">Dashboard</Link></li>
        <li><Link to="/profile">My Profile</Link></li>
        <li><Link to="/progress">Progress</Link></li>
        <li><Link to="/friends">Friends</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
