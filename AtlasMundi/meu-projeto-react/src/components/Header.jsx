import React, { useState } from 'react';
import './Header.css';
import logo from '../assets/logo.png';


function Header() {
  const [language, setLanguage] = useState('pt');

  const translations = {
    pt: {
      login: 'Logar',
      register: 'Cadastrar',
      search: 'Pesquisar...',
      switch: 'EN',
    },
    en: {
      login: 'Login',
      register: 'Register',
      search: 'Search...',
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
          <img src={logo} alt="Logo" />
        </div>

        <nav className="nav">
          <input type="text" className="search-input" placeholder={t.search}/>
          <button className="btn-auth">{t.login}</button>
          <button className="btn-auth">{t.register}</button>
          <button className="lang-btn" onClick={toggleLanguage}>{t.switch}</button>
        </nav>
      </div>
    </header>
  );
}

export default Header;
