// src/layouts/MainLayout.js
import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

function MainLayout() {
  return (
    <div>
      <Navbar />
      <main style={{minHeight:"100vh"}}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default MainLayout;

