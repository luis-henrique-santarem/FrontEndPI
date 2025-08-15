import React from 'react';
import './Footer.css';
import logo from '../assets/logo.png'

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="logo">
          <img src= {logo}  alt="Logo" />
        </div>
        <p className="footer-text">© 2025 AtlasMundi.</p>
      </div>
    </footer>
  );
}

export default Footer;
