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
    const searchValue = queryParameters.get("q") || ""; //default er da tom string

    const [following,setFollowing] = useState([]);
    useEffect(()=> {
        if (!user || !searchValue) {return};
        const fetchFollowing = async () => {
            const result = await axios.get(`api/social/following/${user.username}`)
            setFollowing(result.data);
        }

        const handleSearch = async () => {
            try {
                const res = await axios.get(`api/users/search/${searchValue}`);
                setFetchedResults(res.data);
                console.log(res.data)
            } catch (err) {
                console.error(err);
            }
        }
        
        //hvis searchValue ikke er en tom string
        if (searchValue) {
            handleSearch();
            fetchFollowing();
        }

    },[user,searchValue]);
    


            //await axios.post("api/social/follow",
            //    {
            //        followerUsername : user.username,
            //        followedUsername : followTarget,
            //    });
            //funka ikke, Mr. GPT foreslo å legge til "null", params pga JSON-kluss
    const handleFollow = async (followTarget) => {
        try {
            await axios.post("api/social/follow", null,{
                params: {
                    followerUsername : user.username,
                    followedUsername : followTarget,
                }
            });
            setFollowing(prev => [...prev, {followedUsername:followTarget}]);
        } catch (err) {
            console.error(err);
        }
    }

    const handleUnfollow = async (unfollowTarget) => {
        try {
            await axios.delete("api/social/unfollow", {
                data: {
                    followerUsername : user.username,
                    followedUsername : unfollowTarget,
                }
            });
            setFollowing(prev => prev.filter(f => f.followedUsername !== unfollowTarget)); //fjerne fra lista, så knappen endrer seg riktig
        } catch (err) {
            console.error(err);
        }
    }
    

    return (<>
        <div className="search-result-wrapper">
            {fetchedResults
                .filter(item => item.visibility === true && item.username!==user.username)
                .map(item => (
                    <div key={item.username} className="search-result-item">
                        {item.username}
                        {!following.map(f => f.followedUsername).includes(item.username) ?
                        <button onClick={()=>handleFollow(item.username)}>Follow</button> :
                        <button onClick={()=>handleUnfollow(item.username)}>Unfollow</button>
                        }
                    </div>
                ))}
        </div>
    </>);
}

export default SearchResult;