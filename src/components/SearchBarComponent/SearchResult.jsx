import React from "react";
import { Link } from "react-router-dom";
import "../../styles/index.css";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

const SearchResultItem = () => {
    //brukerdata
    const [user,setUser] = useState(null);
    useEffect(()=> {
        const storedUser = localStorage.getItem("loggedInUser");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    },[]);

    const [fetchedResults, setFetchedResults] = useState([]);
    let searchValue="ber"
    const handleSearch = async () => {
        try {
                const res = await axios.get(`api/users/search/${searchValue}`);
                setFetchedResults(res.data);
                console.log(res.data)
        } catch (err) {
                console.error(err);
        }
    }
            //await axios.post("api/social/follow",
            //    {
            //        followerUsername : user.username,
            //        followedUsername : followTarget,
            //    });
            //funka ikke, Mr. GPT foreslo denne endringa ->>
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
                .filter(item => item.visibility === true)
                .map(item => (
                    <li key={item.username}>
                        {item.username}
                        <button onClick={()=>handleFollow(item.username)}>Follow</button>
                    </li>
                ))}
        </ul>
        <button onClick={handleSearch}>search</button></>
    );

}

export default SearchResultItem;