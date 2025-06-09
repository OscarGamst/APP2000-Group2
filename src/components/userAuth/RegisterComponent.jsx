import axios from 'axios';
import React, { useState } from 'react';

const RegisterComponent = () => {
    const [RegisterData, setRegisterData] = useState({
    username: "",
    email: "",
    password: "",
    birthday: "",
    visibility: false,
    });


  const handleSubmit = async (e) => { //når vi trykker på knappen
    e.preventDefault();
    try {
        await axios.post("api/users/register",RegisterData);
      
    } catch (err) {
        console.error(err);
        alert("YIKES!! error!!");
    }

  };



  return (<>
    <form onSubmit={handleSubmit} className="user-auth-form">
        <h2>Create a new account</h2>
        <div className="user-auth-container">

        <label htmlFor="username">Username: </label>
        <input
            type="text"
            name="username"
            placeholder="Enter Username"
            value={RegisterData.username}
            onChange={e => setRegisterData({ ...RegisterData, username: e.target.value})}
            required
            />

        <label htmlFor="password" >Password: </label>
        <input
            type="password"
            name="password"
            placeholder="Enter Password"
            value={RegisterData.password}
            onChange={e => setRegisterData({ ...RegisterData, password: e.target.value})}
            required
        />

        <label htmlFor="email">E-mail:</label>
        <input
        type="email"
        name="email"
        value={RegisterData.email}
        onChange={e => setRegisterData({ ...RegisterData, email: e.target.value})}
        required
        />

        <label htmlFor="birthday">Birthday:</label>
        <input 
        type="date"
        name="birthday"
        value={RegisterData.birthday}
        onChange={e => setRegisterData({ ...RegisterData, birthday: e.target.value})}
        required
        />

        <label htmlFor="visibility">Public profile?</label>
        <select name="visibility" value={RegisterData.visibility.toString()} 
            onChange={e => setRegisterData({ ...RegisterData, visibility: e.target.value === "true" })}>
            <option value="true">Public</option>
            <option value="false">Private</option>
        </select>

        <button type="submit" className="user-auth-button">Sign up</button>
        </div>
        {/*<button href="">Back to login</button>*/}
    </form>
  </>);
};

export default RegisterComponent; 