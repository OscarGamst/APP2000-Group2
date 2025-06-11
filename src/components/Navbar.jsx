// src/components/Navbar.js
import React from "react";
import { Link } from "react-router-dom";
import "../styles/index.css";
import pp from "../pictures/default_pfp.png";
import bell from "../pictures/NavbarBell.png";
import LogOutButton from "./userAuth/LogOutButton";
import SearchBar from "./SearchBarComponent/SearchBar";

const Navbar = () => {
  const handleSearch = () => {
    const searchValue = document.querySelector(".searchbox input").value;
    alert(`You searched for: ${searchValue}`);
  };

  return (
    <nav className="navbar">
      <ul className="navbar-links">
        <li><span className="navbar-title" style={{userSelect:"none"}}>HERCULES</span></li>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/Activity">Activity</Link></li>
        <li><Link to="/Profile">Profile</Link></li>
      </ul>
      <SearchBar/>
      <ul className="navbarbilde">
        <li>
            <LogOutButton/>
        </li>
        <li>
          <Link to="/Profile">
            <img src={pp} alt="Profile" className="defaultpp" />
          </Link>
        </li>
        <li>
          <img src={bell} alt="Notifications" className="defaultpp" />
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;

