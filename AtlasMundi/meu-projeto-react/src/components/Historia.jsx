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
    <div className="historia-page">
      <div className="historia-background" style={{ backgroundImage: `url(${bgImage})` }}/>
      <Link to="/" className="btn-back">← Voltar</Link>
      <aside className="country-card">
        <h2 className="country-title">
          <img src={locationIcon} alt="Localização" className="location-icon" />
          {pais}
        </h2>
        <div className="carousel">
          <button onClick={prevImage} className="carousel-btn"> ‹</button>
          <img src={images[imgIndex]} alt="Lugar do país" />
          <button onClick={nextImage} className="carousel-btn">
            ›
          </button>
        </div>
        <div className="country-section">
          <h3>História</h3>
          <p>{historia}</p>
        </div>
        <div className="country-buttons">
          <Link to="/politica" className="btn-blue"> Política</Link>
          <Link to="/cultura" className="btn-blue"> Cultura</Link>
          <Link to="/comentarios" className="btn-link"> {" "} Ver comentários</Link>
          <button className="btn-blue" onClick={() => setOpenComment(true)}> Deixar comentário</button>
        </div>
      </aside>

      {flagUrl && (
        <img src={flagUrl} alt={`Bandeira de ${pais}`} className="fixed-flag" />
      )}
      <Modal open={openComment} onClose={() => setOpenComment(false)}>
        <Box sx={modalStyle}>
          <Typography variant="h6" gutterBottom> Deixar comentário</Typography>
          <TextField label="Comentário" multiline rows={4} fullWidth margin="dense" value={comment} onChange={(e) => setComment(e.target.value)} InputProps={{
              style: { backgroundColor: "white", borderRadius: 6 },
            }}
          />
          <Button onClick={comentar} variant="contained" fullWidth sx={{ mt: 2, backgroundColor: "#1452c5" }}> Enviar</Button>
          <Button onClick={() => setOpenComment(false)} fullWidth sx={{ mt: 1, color: "white" }}> Fechar</Button>
        </Box>
      </Modal>
    </div>
  );
}
