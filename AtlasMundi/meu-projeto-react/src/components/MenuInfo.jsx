import React, { useEffect, useState } from "react";
import "./MenuInfo.css";

// Declaração do componente funcional "MenuInfo"
// Recebe três funções como props:
// - onClose: fecha o menu
// - onLoginClick: abre o modal ou página de login
// - onRegisterClick: abre o modal ou página de cadastro
function MenuInfo({ onClose, onLoginClick, onRegisterClick }) {
  // Estado que controla se o menu está visível (para animação de entrada)
  const [visible, setVisible] = useState(false);

  // Efeito que é executado uma vez quando o componente é montado
  useEffect(() => {
    // Adiciona um pequeno atraso antes de mostrar o menu (para a animação CSS)
    setTimeout(() => setVisible(true), 50);
  }, []);

  // Estrutura visual (JSX) do componente
  return (
    // A classe "show" é adicionada quando o estado visible é true
    // Isso permite fazer uma animação de fade-in no CSS
    <div className={`menu-info ${visible ? "show" : ""}`}>
      {/* Botão para fechar o menu (chama a função passada via prop onClose) */}
      <button onClick={onClose} className="close-menu">X</button>
      {/* Título principal do menu */}
      <h2 className="menu-title">Menu</h2>
      {/* Seção de acesso (login e cadastro) */}
      <div className="menu-section">
        <h3>Acesso</h3>
        {/* Botão que chama a função passada via prop para abrir o login */}
        <button className="menu-btn" onClick={onLoginClick}>Logar</button>
        {/* Botão que chama a função passada via prop para abrir o cadastro */}
        <button className="menu-btn" onClick={onRegisterClick}>Cadastrar</button>
      </div>
      {/* Outra seção do menu, com botões de utilidades */}
      <div className="menu-section">
        <h3>Outros</h3>
        {/* Botões estáticos */}
        <button className="menu-btn">Configurações</button>
        <button className="menu-btn">Ajuda</button>
      </div>
    </div>
  );
}

export default MenuInfo;
