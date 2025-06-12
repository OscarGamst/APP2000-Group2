import React from 'react';
import { useNavigate } from 'react-router-dom'; 

const LogOutButton = () => {
    const navigate = useNavigate();
    const handleClick = () => {
        localStorage.removeItem("loggedInUser");
        setTimeout(() => navigate("/auth"), 700);
    }

    return (<>
        <button onClick={handleClick} className="logout-button">Log out</button>
    </>)
}

export default LogOutButton;