import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Politica.css";
import { Modal, Box, Typography, TextField, Button } from "@mui/material";
import { pegarPais } from "../js/country";

// Declaração do componente funcional principal "Politica"
export default function Politica(pais) {
  // Estado que controla se o modal de comentários está aberto (true) ou fechado (false)
  const [openComment, setOpenComment] = useState(false);

  const [comment, setComment] = useState("");
  const [politica, setPolitica] = useState("");


  useEffect(() => {
    async function funcao() {
      const paisPego = await pegarPais(pais, false)
      setPolitica(paisPego.politics) 
    }
    funcao()
  },[])

  // Estilos aplicados diretamente ao container do modal (caixa centralizada)
  const modalStyle = {
    position: "absolute",
    top: "50%",                
    left: "50%",               
    transform: "translate(-50%, -50%)", 
    width: 400,                
    bgcolor: "background.paper", 
    borderRadius: 2,          
    boxShadow: 24,             
    p: 4,                      
  };

  // Retorno JSX do componente
  return (
    <div className="politica-container">
      {/* Conteúdo principal da página */}
      <div className="politica-content">
        <div className="politica-text">
          <h1>País Política</h1>
          <p>
            {politica}
          </p>
        </div>
      </div>
      {/* Seção com botões de navegação */}
      <div className="politica-buttons">
        {/* Link para a página inicial */}
        <Link to="/" className="btn">Início</Link>
        {/* Link para a página de Cultura */}
        <Link to="/cultura" className="btn">Cultura</Link>
        {/* Link para a página de História */}
        <Link to="/historia" className="btn">História</Link>
        {/* Botão que abre o modal de comentários */}
        <button
          onClick={() => setOpenComment(true)} // Define o estado como true (abre o modal)
          className="btn btn-special"> Deixar Comentário</button>
      </div>
      {/* Modal (janela flutuante) do Material UI */}
      <Modal
        open={openComment} // Controla a visibilidade do modal
        onClose={() => setOpenComment(false)} // Fecha o modal ao clicar fora
      >
        <Box sx={modalStyle}>
          {/* Título do modal */}
          <Typography variant="h6" gutterBottom> Deixar Comentário</Typography>
          {/* Formulário para o usuário digitar o comentário */}
          <form className="auth-form">
            {/* Campo de texto multiline (várias linhas) */}
            <TextField onChange={(message) => {setComment(message.target.value)}} label="Comentário" multiline rows={4} variant="outlined" fullWidth size="small" margin="dense"/>
            {/* Botão de envio (ainda sem funcionalidade implementada) */}
            <Button variant="contained" color="primary" fullWidth> Enviar</Button>
            {/* Botão para fechar o modal manualmente */}
            <Button onClick={() => setOpenComment(false)} fullWidth> Sair</Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
