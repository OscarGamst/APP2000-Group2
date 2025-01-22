import React from 'react';
import BildeFidgetToy from './components/BildeFidgetToy';

function App() {
  return (
    <div>
      <h1>Hello world</h1>
      <BildeFidgetToy/>

      {`<Routes>
        <Route path="/Home" element={<Home/>} />
        <Route path="/Spill" element={<Spill/>} />
        <Route path="/About" element={<About/>} />
      </Routes>`}
    </div>
  );
}

export default App;
