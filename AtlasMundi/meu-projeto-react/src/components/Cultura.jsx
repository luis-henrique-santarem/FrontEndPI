import { Link } from "react-router-dom";
import { useState } from "react";
import "./Cultura.css";
import { Modal, Box, Typography, TextField, Button } from "@mui/material";

// Declara o componente funcional principal "Cultura"
export default function Cultura() {
  // Estado que controla se o modal de comentários está aberto (true) ou fechado (false)
  const [openComment, setOpenComment] = useState(false);

  const [comment, setComment] = useState("");

  // Define o estilo do modal (caixa centralizada)
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

  // Renderização do JSX
  return (
    <div className="cultura-container">
      {/* Conteúdo principal da página */}
      <div className="cultura-content">
        <div className="cultura-text">
          <h1>País Cultura</h1>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nulla
            doloribus repellat, nobis culpa distinctio quidem vitae nisi?
            Nesciunt molestias magni architecto natus aspernatur, cumque minus
            debitis impedit laborum saepe blanditiis.
          </p>
        </div>
      </div>

      {/* Seção de botões de navegação */}
      <div className="cultura-buttons">
        {/* Link para a página inicial */}
        <Link to="/" className="btn">Início</Link>
        {/* Link para a página de política */}
        <Link to="/politica" className="btn">Política</Link>
        {/* Link para a página de história */}
        <Link to="/historia" className="btn">História</Link>
        {/* Botão que abre o modal de comentários */}
        <button
          onClick={() => setOpenComment(true)} // Altera o estado para abrir o modal
          className="btn btn-special" >Deixar Comentário </button>
      </div>
      {/* Modal do Material UI que aparece ao clicar em "Deixar Comentário" */}
      <Modal
        open={openComment} // Controla se o modal está aberto
        onClose={() => setOpenComment(false)} // Fecha o modal ao clicar fora dele
      >
        <Box sx={modalStyle}>
          {/* Título do modal */}
          <Typography variant="h6" gutterBottom> Deixar Comentário </Typography>
          {/* Formulário para inserir o comentário */}
          <form className="auth-form">
            {/* Campo de texto multiline para o comentário */}
            <TextField onChange={(message) => {setComment(message.target.value)}} label="Comentário" multiline rows={4} variant="outlined" fullWidth size="small" margin="dense"/>
            {/* Botão para enviar o comentário (ainda sem funcionalidade) */}
            <Button variant="contained" color="primary" fullWidth> Enviar</Button>
            {/* Botão para fechar o modal */}
            <Button onClick={() => setOpenComment(false)} fullWidth> Sair</Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
