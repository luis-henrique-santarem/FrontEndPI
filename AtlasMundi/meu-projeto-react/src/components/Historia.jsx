import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Historia.css";
import { Modal, Box, Typography, TextField, Button } from "@mui/material";
import { pegarPais } from "../js/country";
import { createComment } from "../js/comment";
import bgImage from "../assets/mundomuitofoda.png";
import locationIcon from "../assets/location.png";

export default function Historia({ pais, flagUrl, english }) {
  const [openComment, setOpenComment] = useState(false);
  const [comment, setComment] = useState("");
  const [historia, setHistoria] = useState("");
  const [imgIndex, setImgIndex] = useState(0);

  const token = localStorage.getItem("token");

  const images = [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3v6aendSPBv-r0wGn5P3MpeAmkc3D7agDLg&s",
    "https://www.consolataamerica.org/es/wp-content/uploads/2021/02/Bas%C3%ADlia-N.Sra_.-Africa-Arg%C3%A9lia.jpg",
    "https://www.almadeviajante.com/wp-content/uploads/timgad-argelia-1140x760.jpg",
  ];

  async function carregarPais() {
    try {
      const paisPego = await pegarPais(pais, false);
      setHistoria(paisPego.history + " " + paisPego.history2);
      return paisPego.id;
    } catch (e) {
      console.log("Erro:", e);
    }
  }

  async function comentar() {
    const paisId = await carregarPais();
    try {
      await createComment(paisId, comment, false, token);
      setComment("");
      setOpenComment(false);
    } catch (e) {
      console.log("Erro:", e);
    }
  }

  useEffect(() => {
    carregarPais();
  }, []);

  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 420,
    bgcolor: "#0d2b61",
    color: "white",
    borderRadius: 12,
    boxShadow: 24,
    p: 4,
  };

  const nextImage = () => {
    setImgIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setImgIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="historia-container">
      {/* Seção principal do conteúdo da página */}
      <div className="historia-content">
        <div className="historia-text">
          <h1>País História</h1>
          <p>
            {historia}
          </p>
        </div>
      </div>

      {/* Seção com botões de navegação */}
      <div className="historia-buttons">
        {/* Link para a página inicial */}
        <Link to="/" className="btn">← Voltar</Link>
        {/* Link para a página de política */}
        <Link to="/politica" className="btn">Política</Link>
        {/* Link para a página de cultura */}
        <Link to="/cultura" className="btn">Cultura</Link>
      <Link to="/comentarios" className="btn">Ver Comentários</Link>

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
            <TextField onChange={(message) => {setComment(message.target.value)}} label="Comentário" multiline rows={4} variant="outlined" fullWidth size="small" margin="dense"/>
            {/* Botão para enviar o comentário */}
            <Button onClick={() => comentar()} variant="contained" color="primary" fullWidth>Enviar </Button>
            {/* Botão para fechar o modal manualmente */}
            <Button onClick={() => setOpenComment(false)} fullWidth> Sair</Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
