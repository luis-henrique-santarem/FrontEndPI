import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Politica.css";
import { Modal, Box, Typography, TextField, Button } from "@mui/material";
import { pegarPais } from "../js/country";
import { createComment } from "../js/comment";

import bgImage from "../assets/mundomuitofoda.png";
import locationIcon from "../assets/location.png";

export default function Politica({ pais, flagUrl, english }) {
  const [openComment, setOpenComment] = useState(false);
  const [comment, setComment] = useState("");
  const [politica, setPolitica] = useState("");
  const [imgIndex, setImgIndex] = useState(0);

  const token = localStorage.getItem("token");

  const images = [
    paisPego.url,
    flagUrl,
  ];

  async function carregarPais() {
    try {
      const paisPego = await pegarPais(pais, false);
      setPolitica(`${paisPego.politics} ${paisPego.politics2}`);
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
  }, [pais]);

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

  const nextImage = () =>
    setImgIndex((prev) => (prev + 1) % images.length);

  const prevImage = () =>
    setImgIndex((prev) => (prev - 1 + images.length) % images.length);

  return (
    <div className="politica-page">
      <div className="politica-background" style={{ backgroundImage: `url(${bgImage})` }}/>
      <Link to="/" className="btn-back"> {english ? "← Return" : "← Voltar"}</Link>
      <aside className="country-card">
        <h2 className="country-title"> <img src={locationIcon} alt="Localização" className="location-icon" /> {english ? "Politics" : "Política"}</h2>
        <div className="carousel">
          <button onClick={prevImage} className="carousel-btn">‹</button>
          <img src={images[imgIndex]} alt="Imagem do país" />
          <button onClick={nextImage} className="carousel-btn">›</button>
        </div>
        <div className="country-section">
          <h3>{english ? "Politics" : "Política"}</h3>
          <p>{politica}</p>
        </div>
        <div className="country-buttons">
          <Link to="/historia" className="btn-blue"> {english ? "History" : "História"} </Link>
          <Link to="/cultura" className="btn-blue"> {english ? "Culture" : "Cultura"} </Link>
          <Link to="/comentarios" className="btn-link"> {english ? "See Comments" : "Ver comentários"}</Link>
          <button className="btn-blue" onClick={() => setOpenComment(true)}> {english ? "Make Comment" : "Deixar comentário"}</button>
        </div>
      </aside>

      {flagUrl && (
        <img src={flagUrl} alt={`Bandeira de ${pais}`} className="fixed-flag"/>
      )}

      <Modal open={openComment} onClose={() => setOpenComment(false)}>
        <Box sx={modalStyle}>
          <Typography variant="h6" gutterBottom> {english ? "Make Comment" : "Deixar comentário"}</Typography>

          <TextField
            label={english ? "Comment" : "Comentário"}
            multiline
            rows={4}
            fullWidth
            margin="dense"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            InputProps={{
              style: { backgroundColor: "white", borderRadius: 6 },
            }}
          />
          <Button onClick={comentar} variant="contained" fullWidth sx={{ mt: 2, backgroundColor: "#1452c5" }}> {english ? "Send" : "Enviar"}</Button>
          <Button onClick={() => setOpenComment(false)} fullWidth sx={{ mt: 1, color: "white" }}> {english ? "Close" : "Fechar"}</Button>
        </Box>
      </Modal>
    </div>
  );
}
