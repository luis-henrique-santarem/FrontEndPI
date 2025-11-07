import React from 'react';
import './Footer.css';
import logo from '../assets/logo.png'

// Componente funcional "Footer"
function Footer() {
  return (
    // Elemento <footer> semântico da página
    <footer className="footer">
      <div className="footer-container">
        {/* Seção do logo */}
        <div className="logo">
          <img src={logo} alt="Logo" /> {/* Imagem do logo*/}
        </div>
        {/* Texto do copyright */}
        <p className="footer-text">© 2025 AtlasMundi</p>
      </div>
    </footer>
  );
}
export default Footer;
