import React from "react";
import "../styles/index.css";
import "../styles/responsive.css";
import { useState } from "react";
import { useEffect } from "react";
import SearchResult from "../components/SearchBarComponent/SearchResult";


function Search(searchValue) {
    //brukerdata
    const [user,setUser] = useState(null);
    useEffect(()=> {
        const storedUser = localStorage.getItem("loggedInUser");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    },[]);

    const [fetchedResults, setFetchedResults] = useState();


    return (
        <div>
            <SearchResult input={searchValue}/>
        </div>
    );

}

export default Search;