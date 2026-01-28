import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Cultura.css";
import { Modal, Box, Typography, TextField, Button } from "@mui/material";
import { pegarPais } from "../js/country";
import { createComment } from "../js/comment";
import bgImage from "../assets/mundomuitofoda.png";
import locationIcon from "../assets/location.png";
import mapaAlemanha from "../assets/mapas/alemanha.png";
import mapaEua from "../assets/mapas/eua.png";
import mapaBrasil from "../assets/mapas/brasil.png";
import mapaEspanha from "../assets/mapas/espanha.png";
import mapaKosovo from "../assets/mapas/kosovo.png";
import mapaTurquia from "../assets/mapas/turquia.png";
import mapaChina from "../assets/mapas/china.png";
import mapaMongolia from "../assets/mapas/mongolia.png";
import mapaEgito from "../assets/mapas/egito.png";
import mapaAustralia from "../assets/mapas/australia.png";

function escolherMapa(pais) {
  const nome = pais
    ?.toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

  if (nome.includes("germany") || nome.includes("alemanha")) return mapaAlemanha;

  if (
    nome.includes("united states") ||
    nome.includes("estados unidos") ||
    nome.includes("america")
  )
    return mapaEua;

  if (nome.includes("brazil") || nome.includes("brasil"))
    return mapaBrasil;

  if (nome.includes("spain") || nome.includes("espanha"))
    return mapaEspanha;

  if (nome.includes("kosovo"))
    return mapaKosovo;

  if (nome.includes("turkey") || nome.includes("turquia"))
    return mapaTurquia;

  if (nome.includes("china"))
    return mapaChina;

  if (nome.includes("mongolia"))
    return mapaMongolia;

  if (nome.includes("egypt") || nome.includes("egito"))
    return mapaEgito;

  if (nome.includes("australia"))
    return mapaAustralia;

  return null;
}

export default function Cultura({ pais, flagUrl, english }) {
  const [openComment, setOpenComment] = useState(false);
  const [comment, setComment] = useState("");
  const [cultura, setCultura] = useState("");
  const [imgIndex, setImgIndex] = useState(0);
  const [images, setImgs] = useState([]);

  const token = localStorage.getItem("token");

  async function funcao() {
    try {
      const paisPego = await pegarPais(pais, english);

      setCultura(
        `${paisPego?.culture ?? ""} ${paisPego?.culture2 ?? ""}`
      );

      const imgs = [flagUrl, paisPego?.pictureUrl].filter(Boolean);
      setImgs(imgs);
      setImgIndex(0);

      return paisPego.id;
    } catch (e) {
      console.log("erro", e);
    }
  }

  async function comentar() {
    const paisId = await funcao();
    try {
      await createComment(paisId, comment, english, token);
      setComment("");
      setOpenComment(false);
    } catch (e) {
      console.log("Erro:", e);
    }
  }

  useEffect(() => {
    funcao();
  }, [pais, english]);

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
    if (images.length <= 1) return;
    setImgIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    if (images.length <= 1) return;
    setImgIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="cultura-page">
      <div
        className="cultura-background"
        style={{ backgroundImage: `url(${bgImage})` }}
      />

      {escolherMapa(pais) && (
        <img
          src={escolherMapa(pais)}
          alt={`Mapa de ${pais}`}
          className="mapa-brasil"
        />
      )}

      <Link to="/" className="btn-back">
        {english ? "← Return" : "← Voltar"}
      </Link>

      <aside className="country-card">
        <h2 className="country-title">
          <img src={locationIcon} alt="Localização" className="location-icon" />
          {pais}
        </h2>

        {images.length > 0 && (
          <div className="carousel">
            <button onClick={prevImage} className="carousel-btn">‹</button>
            <img src={images[imgIndex]} alt="Imagem do país" />
            <button onClick={nextImage} className="carousel-btn">›</button>
          </div>
        )}

        <div className="country-section">
          <h3>{english ? "Culture" : "Cultura"}</h3>
          <p>{cultura}</p>
        </div>

        <div className="country-buttons">
          <Link to="/politica" className="btn-blue">
            {english ? "Politics" : "Política"}
          </Link>
          <Link to="/historia" className="btn-blue">
            {english ? "History" : "História"}
          </Link>
          <Link to="/comentarios" className="btn-link">
            {english ? "See Comments" : "Ver comentários"}
          </Link>
          <button className="btn-blue" onClick={() => setOpenComment(true)}>
            {english ? "Make Comment" : "Deixar comentário"}
          </button>
        </div>
      </aside>

      {flagUrl && (
        <img
          src={flagUrl}
          alt={`Bandeira de ${pais}`}
          className="fixed-flag"
        />
      )}

      <Modal open={openComment} onClose={() => setOpenComment(false)}>
        <Box sx={modalStyle}>
          <Typography variant="h6" gutterBottom>
            {english ? "Make Comment" : "Deixar comentário"}
          </Typography>

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

          <Button
            onClick={comentar}
            variant="contained"
            fullWidth
            sx={{ mt: 2, backgroundColor: "#1452c5" }}
          >
            {english ? "Send" : "Enviar"}
          </Button>

          <Button
            onClick={() => setOpenComment(false)}
            fullWidth
            sx={{ mt: 1, color: "white" }}
          >
            {english ? "Close" : "Fechar"}
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
