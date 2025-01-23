import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./pages/HomePage";
import Profile from "./pages/Profile";
import MainLayout from './layouts/MainLayout';

function App() {
  return(
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </MainLayout>
  </BrowserRouter>
  );
}

export default App;
