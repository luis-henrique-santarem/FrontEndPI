import { Link } from "react-router-dom";
import { useState } from "react";
import "./Politica.css";
import { Modal, Box, Typography, TextField, Button } from "@mui/material";

export default function Politica() {
  const [openComment, setOpenComment] = useState(false);

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

  return (
    <div className="politica-container">
      <div className="politica-content">
        <div className="politica-text">
          <h1>País Política</h1>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nulla
            doloribus repellat, nobis culpa distinctio quidem vitae nisi?
            Nesciunt molestias magni architecto natus aspernatur, cumque minus
            debitis impedit laborum saepe blanditiis.
          </p>
        </div>
      </div>
      <div className="politica-buttons">
        <Link to="/" className="btn"> Início</Link>
        <Link to="/cultura" className="btn">Cultura</Link>
        <Link to="/historia" className="btn">História</Link>
        <button onClick={() => setOpenComment(true)} className="btn btn-special" > Deixar Comentário </button>
      </div>

      <Modal open={openComment} onClose={() => setOpenComment(false)}>
        <Box sx={modalStyle}>
          <Typography variant="h6" gutterBottom> Deixar Comentário </Typography>
          <form className="auth-form">
            <TextField label="Comentário" multiline rows={4} variant="outlined" fullWidth size="small" margin="dense" />
            <Button variant="contained" color="primary" fullWidth> Enviar </Button>
            <Button onClick={() => setOpenComment(false)} fullWidth> Sair </Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
