import { Link } from "react-router-dom";
import { useState } from "react";
import "./Historia.css";
import { Modal, Box, Typography, TextField, Button } from "@mui/material";
import { createComment } from "../js/comment";

// Declara o componente funcional principal "Historia"
export default function Historia() {
  // Estado responsável por controlar se o modal está aberto ou fechado
  const [openComment, setOpenComment] = useState(false);


  // Estilo aplicado ao container do modal (definido inline)
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

  // JSX de renderização do componente
  return (
    <div className="historia-container">
      {/* Seção principal do conteúdo da página */}
      <div className="historia-content">
        <div className="historia-text">
          <h1>País História</h1>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nulla
            doloribus repellat, nobis culpa distinctio quidem vitae nisi?
            Nesciunt molestias magni architecto natus aspernatur, cumque minus
            debitis impedit laborum saepe blanditiis.
          </p>
        </div>
      </div>

      {/* Seção com botões de navegação */}
      <div className="historia-buttons">
        {/* Link para a página inicial */}
        <Link to="/" className="btn">Início</Link>
        {/* Link para a página de política */}
        <Link to="/politica" className="btn">Política</Link>
        {/* Link para a página de cultura */}
        <Link to="/cultura" className="btn">Cultura</Link>
        {/* Botão que abre o modal para deixar um comentário */}
        <button
          onClick={() => setOpenComment(true)} // Atualiza o estado para abrir o modal
          className="btn btn-special">Deixar Comentário</button>
      </div>
      {/* Modal do Material UI - aparece quando openComment é true */}
      <Modal
        open={openComment} // Controla se o modal está aberto
        onClose={() => setOpenComment(false)} // Fecha o modal ao clicar fora dele
      >
        <Box sx={modalStyle}>
          {/* Título do modal */}
          <Typography variant="h6" gutterBottom> Deixar Comentário</Typography>
          {/* Formulário de comentário */}
          <form className="auth-form">
            {/* Campo de texto multilinha para escrever o comentário */}
            <TextField label="Comentário" multiline rows={4} variant="outlined" fullWidth size="small" margin="dense"/>
            {/* Botão para enviar o comentário */}
            <Button variant="contained" color="primary" fullWidth>Enviar </Button>
            {/* Botão para fechar o modal manualmente */}
            <Button onClick={() => setOpenComment(false)} fullWidth> Sair</Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
