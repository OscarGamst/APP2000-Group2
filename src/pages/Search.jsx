import React from "react";
import "../styles/index.css";
import "../styles/responsive.css";
import { useState } from "react";
import { useEffect } from "react";
import SearchResult from "../components/SearchBarComponent/SearchResult";


function Search() {
    //brukerdata
    const [user,setUser] = useState(null);
    useEffect(()=> {
        const storedUser = localStorage.getItem("loggedInUser");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    },[]);

    return (
        <div>
            <h2>Search Results</h2>
            <SearchResult/>
        </div>
    );

}

export default Search;