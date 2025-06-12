import React from "react";
import "../styles/index.css";
import "../styles/responsive.css";
import SearchResult from "../components/SearchBarComponent/SearchResult";


function Search() {
    
    return (<>
        {/* <div className="home-empty"></div> */}
        <div className="search-result-page">
            
            <h2 style={{marginTop:"2vh"}}>Search Results</h2>
            <div className="search-result-wrapper">
            <SearchResult/>
            </div>
        </div>
        {/* <div className="home-empty"></div> */}
    </>);

}

export default Search;