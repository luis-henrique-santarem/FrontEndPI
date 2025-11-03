import React, { useEffect, useState } from "react";
import "./MenuInfo.css";

function MenuInfo({ onClose, onLoginClick, onRegisterClick }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setVisible(true), 50);
  }, []);

  return (
    <div className={`menu-info ${visible ? "show" : ""}`}>
      <button onClick={onClose} className="close-menu">X</button>

      <h2 className="menu-title">Menu</h2>

      <div className="menu-section">
        <h3>Acesso</h3>
        <button className="menu-btn" onClick={onLoginClick}>Logar</button>
        <button className="menu-btn" onClick={onRegisterClick}>Cadastrar</button>
      </div>

      <div className="menu-section">
        <h3>Outros</h3>
        <button className="menu-btn">Configurações</button>
        <button className="menu-btn">Ajuda</button>
      </div>
    </div>
  );
}

export default MenuInfo;
