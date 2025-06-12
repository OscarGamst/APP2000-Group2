// src/App.js
import React from "react";
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, useNavigate, Navigate } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Activity from "./pages/Activity";
import TestPageNoNav from "./pages/TestPageNoNav";
import "./styles/responsive.css";
import AuthPage from "./pages/AuthPage";
import Search from "./pages/Search";

function App() {
    //Optimalt så burde vi nok bruke "sessionStorage" istedenfor, men det her var 
    //enklere å jobbe med :)
    const [loading, setLoading] = useState(true);
    const [user,setUser] = useState(null);
        useEffect(()=> {
            const storedUser = localStorage.getItem("loggedInUser");
            if (storedUser) {
                setUser(JSON.parse(storedUser));
            }
            setLoading(false);
    },[]);
    //loading er lagt til så ikke react rendrer at vi skal til "/auth" 
    // før vi har lest bruker
    if(loading){
        return (
            <div style={{top:"50%", left:"50%", fontSize:"50vw"}}>Loading..</div>
        )
    }

    return (
        <BrowserRouter>

            <Routes> 
                <Route path="/Auth/*" element={<AuthPage />} />

                {/* hvis vi ikke finner bruker, sender vi deg til auth page */}
                <Route element={user?<MainLayout />:<Navigate to="/Auth" replace/>}>
                    <Route path={"/"} element={<Home />} />
                    <Route path="/Profile" element={<Profile />} />
                    <Route path="/Activity" element={<Activity />} />
                    <Route path="/Search" element={<Search/>}/>
                </Route>

                {/* testside som ikke bruker MainLayout */}
                <Route path="/TestPageNoNav" element={<TestPageNoNav />} />
            
                {/* plukke opp alle mulige paths og sende til auth page */}
                <Route path="*" element={<Navigate to="/Auth" replace />} />
            </Routes>

        </BrowserRouter>
    );
}

export default App;

