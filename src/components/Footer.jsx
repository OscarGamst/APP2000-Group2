import React from "react";
import "../styles/index.css";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="footer">
      <p>&copy; Group 2.</p>
      <button className="back-to-top" onClick={scrollToTop}>
        Back to Top
      </button>
    </footer>
  );
};

export default Footer;
