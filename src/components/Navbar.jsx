// src/components/Navbar.js
import React from "react";
import { Link } from "react-router-dom";
import "../styles/index.css";
import pp from "../components/PP.png";
import bell from "../components/bell.png";

const Navbar = () => {
  const handleSearch = () => {
    const searchValue = document.querySelector(".searchbox input").value;
    alert(`You searched: ${searchValue}`);
  };

  return (
    <nav className="navbar">
      <ul className="navbar-links">
        <li><Link to="/">HERCULES</Link></li>
        <li><Link to="/Home">Home</Link></li>
        <li><Link to="/Activity">Activity</Link></li>
      </ul>
      <div className="searchbox">
        <input type="text" placeholder="Search..." />
        <button className="searchbutton" onClick={handleSearch}>
          Søk
        </button>
      </div>
      <ul className="navbarbilde">
        <li><img src={pp} alt="0" className="defaultpp" /></li>
        <li><img src={bell} alt="0" className="defaultpp" /></li>
      </ul>
    </nav>
  );
};

export default Navbar;

