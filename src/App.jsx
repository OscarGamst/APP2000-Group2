// src/App.js
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Progress from "./pages/Progress";
import Activity from "./pages/Activity";
import TestPageNoNav from "./pages/TestPageNoNav";
import Albert from "./pages/Albert";
import LogIn from "./pages/LogIn";
import "./styles/responsive.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/Progress" element={<Progress />} />
          <Route path="/Activity" element={<Activity />} />
          <Route path="/Albert" element={<Albert />} />
          <Route path="/LogIn" element={<LogIn />} />
        </Route>
        <Route path="/TestPageNoNav" element={<TestPageNoNav />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

