// src/App.js
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Progress from "./pages/Progress";
import Activity from "./pages/Activity";

function App() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/Progress" element={<Progress />} />
          <Route path="/Activity" element={<Activity />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}

export default App;
