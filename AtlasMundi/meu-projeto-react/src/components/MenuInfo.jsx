import React, { useEffect, useState } from 'react';
import './MenuInfo.css';
import Configuracoes from "./Configuracoes";

function MenuInfo({ onClose, onLoginClick, onRegisterClick, onUserClick }) { 
  const [visible, setVisible] = useState(false);
  const [openConfig, setOpenConfig] = useState(false);

  useEffect(() => {
    setTimeout(() => setVisible(true), 50);
  }, []);

  const translations = {
    pt: {
      title: 'Menu',
      access: 'Acesso',
      login: 'Logar',
      register: 'Cadastrar',
      others: 'Outros',
      settings: 'Configurações',
      help: 'Ajuda',
      close: 'Fechar',
      user: 'Usuário'
    },
    en: {
      title: 'Menu',
      access: 'Access',
      login: 'Login',
      register: 'Register',
      others: 'Others',
      settings: 'Settings',
      help: 'Help',
      close: 'Close',
      user: 'User'
    },
  };

  const currentLang = translations.pt;

  return (
    <>
      <div className={`menu-info ${visible ? 'show' : ''}`}> 
        <button onClick={onClose} className="close-menu"> X</button>
        <h2 className="menu-title">{currentLang.title}</h2>
        <div className="menu-section">
          <h3>{currentLang.access}</h3>
          <button className="menu-btn" onClick={onLoginClick}> {currentLang.login}</button>
          <button className="menu-btn" onClick={onRegisterClick}> {currentLang.register}</button>
        </div>
        <div className="menu-section">
          <h3>{currentLang.others}</h3>
          <button className="menu-btn" onClick={() => setOpenConfig(true)}> {currentLang.settings}</button>
          <button className="menu-btn" onClick={onUserClick}> {currentLang.user}</button>
        </div>
      </div>
      {openConfig && (
        <Configuracoes onClose={() => setOpenConfig(false)} />
      )}
    </>
  );
}

export default MenuInfo;
