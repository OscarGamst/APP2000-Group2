import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
//det her ska brukes for å "redirecte" til andre sider
//med utgangspunkt i kode fra forelesninger, og hjjelp fra internett :)
//ville jeg lage en loginn-funksjon som bare tar et brukernavn og et passord fra bruker
//og sammenlikner med brukernavn og passord som er lagret et annet sted.
//lagret i tekstfil i dette tilfellet, men tenker database i fremtiden da.


const LogInComponent = () => {
  const [LoginData, setLoginData] = useState({
    username: "",
    password: ""
  });

  const [message, setMessage] = useState(''); 
  const navigate = useNavigate();

  const handleSubmit = async (e) => { //når vi trykker på knappen
    e.preventDefault();
    try {
      await axios.post("/users/user-login",{LoginData});
      setTimeout(() => navigate("/"),2000);
    } catch (err) {
      alert("Wrong login credentials");
    }

  };



  return (<>
    <form onSubmit={handleSubmit} className="user-auth-form">
      <h2>Log in</h2>
      <div className="user-auth-container">

        <label htmlFor="username">Username: </label>
        <input
          type="text"
          name="username"
          placeholder="Enter Username"
          value={LoginData.username}
          onChange={e => setLoginData({ ...LoginData, username: e.target.value})}
          required
          />



        <label htmlFor="password" >Password: </label>
        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          value={LoginData.password}
          onChange={e => setLoginData({ ...LoginData, password: e.target.value})}
          required
        />



      <button type="submit" className="user-auth-button">Log in</button>
      <p>{message}</p>
      </div>
      {/*<button href="">Create new account</button>*/}
    </form>
  </>);
};

export default LogInComponent; 