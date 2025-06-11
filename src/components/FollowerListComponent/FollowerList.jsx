import React, { useState, useEffect } from "react";
import "../../styles/index.css";
import "../../styles/responsive.css";
import axios from "axios";

const FollowerList = () => {
    const [followersOrFollowing, setFollowersOrFollowing] = useState("following");
    const [followers, setFollowers] = useState([]);
    const [following, setFollowing] = useState([]);
    
    const [user, setUser] = useState();
    useEffect(()=> {
            const storedUser = localStorage.getItem("loggedInUser");
            if (storedUser) {
                setUser(JSON.parse(storedUser));
            }
    },[]);

    
    //const [followerList, setFollowerList] = useState([]);
    //const [list, setList] = useState([]);
    
    useEffect(() => { 
        const fetch = async () => {
            try {
                if (user) {
                const result = await axios.get(`api/social/${followersOrFollowing}/${user.username}`);
                //setList(result.data)
                if (followersOrFollowing==="followers") {setFollowers(result.data)}
                if (followersOrFollowing==="following") {setFollowing(result.data)}
                }
            } catch (err) {
                console.error("Failed fetch",err);
            }
            
            
        }
        fetch();
    },[user,followersOrFollowing]) //utfører useEffecten bare når en av dissa endrer seg.

    const list = followersOrFollowing==="followers" ? followers : following;
    return (<>
        <div className="follower-list">
            <div className="followers-buttons">
                <button onClick={()=>{setFollowersOrFollowing("followers")}}
                    id={followersOrFollowing === "followers" ? "active" : undefined}
                >Followers</button>
                <button onClick={()=>{setFollowersOrFollowing("following")}}
                    id={followersOrFollowing === "following" ? "active" : undefined}
                >Following</button>
            </div>
            {/* <h2>{followersOrFollowing}</h2> */}
            {followersOrFollowing==="followers" ? 
                list.map((item, index) => (
                    <div className="follow-list-item" key={index}>{JSON.stringify(item.followerUsername).replace(/"/g,'')}</div>
                )) :
                list.map((item, index) => (
                    <div className="follow-list-item" key={index}>{JSON.stringify(item.followedUsername).replace(/"/g,'')}</div>
                ))
            }
        </div>

    </>)
}

export default FollowerList;