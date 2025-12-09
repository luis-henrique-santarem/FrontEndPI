import React, { useEffect, useState } from 'react';
import './MenuInfo.css';

// Declaração do componente funcional "MenuInfo"
function MenuInfo({ onClose, onLoginClick, onRegisterClick }) {
  const [visible, setVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  // Efeito que é executado uma vez quando o componente é montado
  useEffect(() => {
    setTimeout(() => setVisible(true), 50);
  }, []);

  // Função para abrir o modal de configurações
  const handleOpenModal = () => {
    setModalVisible(true);
  };

  // Função para fechar o modal de configurações
  const handleCloseModal = () => {
    setModalVisible(false);
  };

  // Definindo as traduções
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
    },
  };

  // Seleciona a tradução com base no idioma
  const currentLang = translations.pt; 

  return (
    <div className={`menu-info ${visible ? 'show' : ''}`}>
      {/* Botão para fechar o menu */}
      <button onClick={onClose} className="close-menu">
        X
      </button>
      <h2 className="menu-title">{currentLang.title}</h2>

      {/* Seção de Acesso */}
      <div className="menu-section">
        <h3>{currentLang.access}</h3>
        <button className="menu-btn" onClick={onLoginClick}>
          {currentLang.login}
        </button>
        <button className="menu-btn" onClick={onRegisterClick}>
          {currentLang.register}
        </button>
      </div>

      {/* Seção Outros */}
      <div className="menu-section">
        <h3>{currentLang.others}</h3>
        <button className="menu-btn" onClick={handleOpenModal}>
          {currentLang.settings}
        </button>
        <button className="menu-btn">{currentLang.help}</button>
      </div>

      {/* Modal de configurações */}
      {modalVisible && (
        <div className="modal-overlay">
          <div className="modal">
            <button className="modal-close" onClick={handleCloseModal}>
              X
            </button>
            <h3>{currentLang.settings}</h3>
            <p>Mudanças.</p>

            {/* Botões dentro do modal */}
            <button className="menu-btn">
              Mudar para Inglês
            </button>
            <button className="menu-btn">
              Aumentar Tamanho da Fonte
            </button>
            <button className="menu-btn">
              Diminuir Tamanho da Fonte
            </button>
            <button onClick={handleCloseModal} className="menu-btn">
              {currentLang.close}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default MenuInfo;
