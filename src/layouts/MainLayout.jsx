import React from "react";
import TestBar from "../components/TestComponent";

function MainLayout({ children }) {
  return (
    <div>
      <TestBar />
      <main>{children}</main>
    </div>
  );
}

export default MainLayout;
