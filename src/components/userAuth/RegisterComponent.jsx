import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
//det her ska brukes for å "redirecte" til andre sider
//med utgangspunkt i kode fra forelesninger, og hjjelp fra internett :)
//ville jeg lage en Registern-funksjon som bare tar et brukernavn og et passord fra bruker
//og sammenlikner med brukernavn og passord som er lagret et annet sted.
//lagret i tekstfil i dette tilfellet, men tenker database i fremtiden da.


const RegisterComponent = () => {
  const [RegisterData, setRegisterData] = useState({
    username: "",
    email: "",
    password: "",
    birthday: "",
    visibility: "",
  });

  const [message, setMessage] = useState(''); 
  const navigate = useNavigate();

  const handleSubmit = async (e) => { //når vi trykker på knappen
    e.preventDefault();
    try {
      await axios.post("/users/user-Register",{RegisterData});
      
    } catch (err) {
      alert("YIKES!! error!!");
    }

  };



  return (<>
    <form onSubmit={handleSubmit} className="logInForm">
      <h2>Create a new account</h2>
      <div className="logInContainer">

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
        type="text"
        name="email"
        value={RegisterData.email}
        required
        />

        <label htmlFor="birthday">Birthday:</label>
        <input 
        type="date"
        name="birthday"
        value={RegisterData.birthday}
        required
        />

        <label htmlFor="visibility">Public profile?</label>
        <input
        type="checkbox"
        name="visibility"
        value={RegisterData.visibility}
        required
        />

      <button type="submit" className="logInBtn">Sign up</button>
      <p>{message}</p>
      </div>
      {/*<button href="">Back to login</button>*/}
    </form>
  </>);
};

export default RegisterComponent; 