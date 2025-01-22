import React from 'react';
import BildeFidgetToy from './components/BildeFidgetToy';

/*import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import About from './pages/About';*/

function App() {
  return (
    <div>
      <h1>HEI PÅ DEG</h1>
      <BildeFidgetToy/>
      {`
      <Routes>
        <Route path="/HomePage" element={<HomePage/>} />
        <Route path="/About" element={<About/>} />
      </Routes>
      `}
    </div>
  );
}

export default App;
