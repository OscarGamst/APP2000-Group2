import React from "react";
import { useLocation  } from "react-router-dom";
import "../../styles/index.css";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

const SearchResult = () => {
    //brukerdata
    const [user,setUser] = useState(null);
    useEffect(()=> {
        const storedUser = localStorage.getItem("loggedInUser");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    },[]);

    const [fetchedResults, setFetchedResults] = useState([]);
    const location = useLocation();
    const queryParameters = new URLSearchParams(location.search);
    const searchValue = queryParameters.get("q") || "";

    useEffect(()=> {
        const handleSearch = async () => {
            try {
                const res = await axios.get(`api/users/search/${searchValue}`);
                setFetchedResults(res.data);
                console.log(res.data)
            } catch (err) {
                console.error(err);
            }
        }
        
        if (searchValue) {
            handleSearch();
        }

    },[searchValue]);
    


            //await axios.post("api/social/follow",
            //    {
            //        followerUsername : user.username,
            //        followedUsername : followTarget,
            //    });
            //funka ikke, Mr. GPT foreslo å legget til "null", params pga JSON-kluss
    const handleFollow = async (followTarget) => {
        try {
            await axios.post("api/social/follow", null,{
                params: {
                    followerUsername : user.username,
                    followedUsername : followTarget,
                }
            });
            alert(`You are now following ${followTarget}!`);
        } catch (err) {
            console.error(err);
        }
    }
    

    return (<>
        <ul>
            {fetchedResults
                .filter(item => item.visibility === true && item.username!==user.username)
                .map(item => (
                    <li key={item.username}>
                        {item.username}
                        <button onClick={()=>handleFollow(item.username)}>Follow</button>
                    </li>
                ))}
        </ul>
    </>);
}

export default SearchResult;