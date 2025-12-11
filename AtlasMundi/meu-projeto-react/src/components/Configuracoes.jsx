import React from "react";
import { Modal, Box, Typography, Button } from "@mui/material";

const Configuracoes = ({ onClose }) => {
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

  return (
    <Modal open={true} onClose={onClose}>
      <Box sx={modalStyle}>
        <Typography variant="h6" gutterBottom> Configurações</Typography>
        <div className="config-buttons">
          <Button fullWidth sx={{ mt: 1 }} variant="contained"> Mudar para Inglês</Button>
          <Button fullWidth sx={{ mt: 1 }} variant="contained"> Aumentar Fonte</Button>
          <Button fullWidth sx={{ mt: 1 }} variant="contained"> Diminuir Fonte</Button>
          <Button fullWidth sx={{ mt: 2 }} onClick={onClose}> Fechar</Button>
        </div>
      </Box>
    </Modal>
  );
};

export default Configuracoes;
