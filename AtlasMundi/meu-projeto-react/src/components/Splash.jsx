import React, { useState } from "react";
import "./Splash.css";
import galaxy from "../assets/galaxy.jpg"; 
import earth from "../assets/earth.png";   


// Recebe uma prop "onFinish" (função que será chamada quando o splash terminar)
const Splash = ({ onFinish }) => {
  // Estado que controla se a animação de fechamento está ativa
  const [closing, setClosing] = useState(false);

  // Função chamada ao clicar na tela
  const handleClose = () => {
    // Se já estiver fechando, não faz nada (evita múltiplos cliques)
    if (closing) return;
    // Marca o estado como "fechando" (ativa animação CSS)
    setClosing(true);
    // Aguarda 1 segundo (tempo da animação de fechamento) antes de chamar onFinish
    setTimeout(() => onFinish && onFinish(), 1000);
  };
  // Retorno JSX que define a estrutura visual da tela Splash
  return (
    <div
      className={`splash ${closing ? "splash--closing" : ""}`} // adiciona classe "splash--closing" quando o estado está true
      onClick={handleClose}      
      role="button"              
      tabIndex={0}               
      aria-label="Entrar no site">
      {/* Fundo com imagem da galáxia */}
      <div className="splash__bg" style={{ backgroundImage: `url(${galaxy})` }}/>
      {/* Imagem da Terra sobre o fundo */}
      <img src={earth} alt="Terra" className="splash__earth" />
      {/* Camada de sobreposição (usada para efeitos visuais ou escurecimento do fundo) */}
      <div className="splash__overlay" />
      {/* Conteúdo principal da tela Splash */}
      <div className="splash__content">
        <div className="splash__frame">
          {/* Título principal */}
          <h1 className="splash__title">ATLAS</h1>
          {/* Subtítulo */}
          <div className="splash__subtitle">MUNDI</div>
        </div>
        {/* Texto de instrução para o usuário */}
        <div className="splash__cta">Clique para explorar</div>
      </div>
    </div>
  );
};

export default Splash;
