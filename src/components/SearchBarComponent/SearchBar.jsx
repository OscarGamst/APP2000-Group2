import React from "react";
import { Link } from "react-router-dom";
import "../../styles/index.css";
import { useState } from "react";
import { useEffect } from "react";

const SearchBar = () => {

    const handleSearch = () => {
        const searchValue = document.querySelector(".searchbox input").value;
        alert(`You searched for: ${searchValue}`);
        return searchValue;
    };

    return (
        <div className="searchbox">
            <input type="text" placeholder="Search..." />
            <button className="searchbutton" onClick={handleSearch}>
            Search
            </button>
      </div>
    )
}

export default SearchBar;