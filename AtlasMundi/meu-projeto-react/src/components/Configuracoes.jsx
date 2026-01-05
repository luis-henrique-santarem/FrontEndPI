import React, { useState } from "react";
import { Modal, Box, Typography, Button } from "@mui/material";

const Configuracoes = ({ onClose, english,toggleLanguage }) => {
  const modalStyle = { 
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 350,
    bgcolor: "background.paper",
    borderRadius: 2,
    boxShadow: 24,
    p: 4 
  };

function alterarFonte(fator) {
  const html = document.documentElement;

  const atual = parseFloat(
    getComputedStyle(html).fontSize
  );

  const novo = atual * fator;

  // limites
  if (novo > 30 || novo < 8.5) return;

  html.style.fontSize = `${novo}px`;
}



  return (
    <Modal open={true} onClose={onClose}>
      <Box sx={modalStyle}>
        <Typography variant="h6" gutterBottom>{english ? "Configurations" : "Configurações"}</Typography>
        <div className="config-buttons">
          <Button fullWidth sx={{ mt: 1 }} onClick={toggleLanguage} variant="contained">{english ? "Change to Portuguese" : "Mudar para Inglês"}</Button>
          <Button onClick={() => {alterarFonte(1.1)}} fullWidth sx={{ mt: 1 }} variant="contained">{english ? "Increase font size" : "Aumentar fonte"}</Button>
          <Button onClick={() => {alterarFonte(0.9)}} fullWidth sx={{ mt: 1 }} variant="contained">{english ? "Decrease font size" : "Diminuir fonte"}</Button>
          <Button fullWidth sx={{ mt: 2 }} onClick={onClose}>{english ? "Close" : "Fechar"}</Button>
        </div>
      </Box>
    </Modal>
  );
};

export default Configuracoes;
