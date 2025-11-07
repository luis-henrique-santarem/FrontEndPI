import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Information.css';

// Declaração do componente funcional "Information"
// Props:
// - nome: nome do país exibido no topo
// - flagUrl: URL da imagem da bandeira do país
// - onClose: função chamada ao clicar no botão "X" (para fechar o painel)
function Information({ nome, flagUrl, onClose }) {

  // Estado que controla a visibilidade (para animação de entrada suave)
  const [visible, setVisible] = useState(false);
  // Quando o componente é montado, define visible como true após 50ms
  // Isso ativa a classe CSS "show", geralmente usada para animação de fade-in
  useEffect(() => {
    setTimeout(() => setVisible(true), 50);
  }, []);

  // Estrutura visual do componente
  return (
    // Aplica a classe "show" se visible for true (para animações CSS)
    <div className={`info ${visible ? 'show' : ''}`}>
      
      {/* Botão de fechar (chama a função passada via prop onClose) */}
      <button onClick={onClose} className="close-btn">X</button>

      {/* Título com o nome do país */}
      <h2 className='titlecountry'>{nome}</h2>

      {/* Se houver uma URL de bandeira, exibe a imagem correspondente */}
      {flagUrl && (
        <img
          className='imgcountry'
          src={flagUrl}
          alt={`Bandeira de ${nome}`} // Acessibilidade: descrição alternativa da imagem
        />
      )}
      {/* Título da seção de links */}
      <p className='quickinformation'>Informações rápidas</p>
      {/* Links de navegação para páginas específicas */}
      <Link to="/historia" className='btninfo'>História</Link>
      <Link to="/politica" className='btninfo'>Política</Link>
      <Link to="/cultura" className='btninfo'>Cultura</Link>
    </div>
  );
}
export default Information;
