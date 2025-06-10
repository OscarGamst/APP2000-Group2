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
import "./styles/responsive.css";
import AuthPage from "./pages/AuthPage";
import { useEffect } from "react";
import { useState } from "react";
import Search from "./pages/Search";

function App() {
    //brukerdata
    const [user,setUser] = useState(null);
    useEffect(()=> {
        const storedUser = localStorage.getItem("loggedInUser");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    },[]);

  return (
    <BrowserRouter>
        <Routes>
            <Route element={<MainLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/Profile" element={<Profile />} />
                <Route path="/Progress" element={<Progress />} />
                <Route path="/Activity" element={<Activity />} />
                <Route path="/Albert" element={<Albert />} />
                <Route path="/Search" element={<Search/>}/>
            </Route>
            <Route path="/TestPageNoNav" element={<TestPageNoNav />} />
            <Route path="/Auth" element={<AuthPage />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;

