 import React, { useState } from 'react';
 import { useNavigate } from 'react-router-dom'; //det her ska brukes for å "redirecte" til andre sider
//med utgangspunkt i kode fra forelesninger, og hjjelp fra internett :)
//ville jeg lage en loginn-funksjon som bare tar et brukernavn og et passord fra bruker
//og sammenlikner med brukernavn og passord som er lagret et annet sted.
//lagret i tekstfil i dette tilfellet, men tenker database i fremtiden da.


const LogInComponent = () => {
  const [LoginData, setLoginData] = useState({
    username: '',
    password: ''
  });

  const [message, setMessage] = useState(''); 
  const navigate = useNavigate();

  const handleChange = (e) => { //håndterer når vi skriver i inputsa
    const { name, value } = e.target;
    setLoginData(prevState => ({
      ...prevState,
      [name]: value
    }));
    console.log("Log in data:", LoginData);
  };


  const handleSubmit = (e) => { //når vi trykker på knappen
    e.preventDefault();

    console.log('Bruker:', LoginData);

    fetch("http://localhost:3000/brukere.txt")
    .then(response => response.text())
    .then(fileText => {
      //const lines = fileText.trim('\n','\r');
      const lines = fileText.split('\n').map(line => line.trim()).filter(line => line !== '');
      //console.log(lines);

      // tihi testing
      const liste = [];
      // hehe
      for (let i = 0; i < lines.length; i += 2) {
        const username = lines[i];
        const password = lines[i + 1];
        liste.push({ username, password });
        /*console.log('Brukernavn:',username);
        console.log('password',password);*/
      }
      
      const brukerFunnet = liste.find(user => user.username === LoginData.username && user.password === LoginData.password);
      
      if (brukerFunnet) {
        setMessage("Logget inn");
        setTimeout(() => {navigate("/")},1500); //går til main etter ett og et halvt sek, så brukern ser at loginn funka og greier :D
      } else {
        setMessage("Feil passord eller brukernavn! >:(")
      }
      return liste;
    });
  };


 
  return (
    <form onSubmit={handleSubmit} className="logInForm">
      <h2>Log in</h2>
      <div className="logInContainer">

        <label htmlFor="username">Username: </label>
        <input
          type="text"
          name="username"
          placeholder="Enter Username"
          value={LoginData.username}
          onChange={handleChange}
          required
          />



        <label htmlFor="password" >Password: </label>
        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          value={LoginData.password}
          onChange={handleChange}
          required
        />


      <button type="submit" className="logInBtn">Log in</button>
      <p>{message}</p>
      </div>
    </form>
    
  );
};

export default LogInComponent; 