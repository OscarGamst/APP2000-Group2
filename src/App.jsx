// src/App.js
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Activity from "./pages/Activity";
import TestPageNoNav from "./pages/TestPageNoNav";
import "./styles/responsive.css";
import AuthPage from "./pages/AuthPage";
import Search from "./pages/Search";

function App() {

  return (
    <BrowserRouter>
        <Routes>
            <Route element={<MainLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/Profile" element={<Profile />} />
                <Route path="/Activity" element={<Activity />} />
                <Route path="/Search" element={<Search/>}/>
            </Route>
            <Route path="/TestPageNoNav" element={<TestPageNoNav />} />
            <Route path="/Auth" element={<AuthPage />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;

