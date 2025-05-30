import React, { useState, useEffect } from "react";
import "../../styles/index.css";
import "../../styles/responsive.css";
import axios from "axios";

const FollowerList = () => {
    const [followersOrFollowing, setFollowersOrFollowing] = useState("followers");
    
    const [user, setUser] = useState();
    useEffect(()=> {
            const storedUser = localStorage.getItem("loggedInUser");
            if (storedUser) {
                setUser(JSON.parse(storedUser));
            }
    },[]);

    
    //const [followerList, setFollowerList] = useState([]);
    const [list, setList] = useState([]);
    const fetch = async () => {
        try {
            const result = await axios.get(`api/social/${followersOrFollowing}/${user.username}`);
            setList(result)
        } catch (err) {
            console.error(err);
        }
    }


    /*function FollowerListItem() {
        const {}
    }*/

    useEffect(()=> {fetch()},[])

    return (<>
        <div className="follower-list">
            <h2>{followersOrFollowing}</h2>
            {list}
        </div>

    </>)
}

export default FollowerList;