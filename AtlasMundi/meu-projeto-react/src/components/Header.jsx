import React, { useState } from 'react';
import './Header.css';
import logo from '../assets/logo.png'

function Header() {
  const [language, setLanguage] = useState('pt');

  const translations = {
    pt: {
      home: 'Home',
      sobre: 'Sobre',
      servicos: 'Serviços',
      contato: 'Contato',
      switch: 'EN',
    },
    en: {
      home: 'Home',
      sobre: 'About',
      servicos: 'Services',
      contato: 'Contact',
      switch: 'PT',
    },
  };

  const toggleLanguage = () => {
    setLanguage(prevLang => (prevLang === 'pt' ? 'en' : 'pt'));
  };

  const t = translations[language];

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo-header">
          <img src={logo} alt="Logo"/>
        </div>

        <nav className="nav">
          <a href="#home">{t.home}</a>
          <a href="#sobre">{t.sobre}</a>
          <a href="#servicos">{t.servicos}</a>
          <a href="#contato">{t.contato}</a>
          <button className="lang-btn" onClick={toggleLanguage}>
            {t.switch}
          </button>
        </nav>
      </div>
    </header>
  );
}

export default Header;
