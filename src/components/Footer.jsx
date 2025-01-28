import React from "react";
import "../styles/index.css";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

    return (
        <footer className="footer">
            <ul className="footerList">
                <li><ul id="footerLeft">
                    <li><h3>Contact</h3></li>
                    <li>
                        <label for="phone">Tlf: </label>
                        <a href="tlf:+4712345678">+47 12345678</a>
                    </li>
                    <li>
                        <label for="email">E-mail: </label>
                        <a href="mailto:gruppe2@app2000.no" >gruppe2@app2000.no</a>
                    </li>
                </ul></li>
                <li><ul id="footerMid">
                    <li><p>&copy; Group 2.</p></li>
                    <li><button className="back-to-top"
                    onClick={scrollToTop}>
                        Back to top
                    </button></li>
                </ul></li>
            </ul>
        </footer>
    );
};

export default Footer;