import React from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import "../../styles/index.css";
import { useState } from "react";
import { useEffect } from "react";

const SearchBar = () => {
    const [searchValue, setSearchValue] = useState("");
    const nav = useNavigate();

    const handleSearch = () => {
        if (searchValue.trim()) { //sånn at den ikke gjør no hvis den er tom
            nav(`/search?q=${encodeURIComponent(searchValue.trim())}`)
        }
    };

    return (
        <div className="searchbox">
            <input type="text" 
                placeholder="Search..." 
                value={searchValue}
                onChange={(e)=>setSearchValue(e.target.value)}
            />
            <button className="searchbutton" onClick={handleSearch}>
            Search
            </button>
      </div>
    )
}

export default SearchBar;