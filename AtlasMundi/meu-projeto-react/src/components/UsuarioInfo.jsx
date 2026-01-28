import React, { useState, useEffect } from "react";
import { Modal, Box, Typography, Button, Divider, Stack, Avatar, } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import CloseIcon from "@mui/icons-material/Close";
import PersonIcon from "@mui/icons-material/Person";
import { deslogar, getarUsuario } from "../js/user";

const CriarPais = ({ onClose, english }) => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [estado, setEstado] = useState("");
  const [logado, setLogado] = useState(false);

  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 380,
    bgcolor: "background.paper",
    borderRadius: 3,
    boxShadow: 24,
    p: 4,
  };

  async function atualizarInformacoes() {
    try {
      const token = localStorage.getItem("token");
      const userInformations = await getarUsuario(token);

      if (!userInformations) {
        setLogado(false);
        return;
      }

      setLogado(true);
      setNome(userInformations.name);
      setEmail(userInformations.email);
      setEstado(userInformations.teacher ? "Professor" : "Aluno");
    } catch (err) {
      console.log(err);
    }
  }

  function handleDeslogar() {
    deslogar();
    setLogado(false);
  }

  useEffect(() => {
    atualizarInformacoes();
  }, []);

  return (
    <Modal open onClose={onClose}>
      <Box sx={modalStyle}>
        <Stack spacing={2} alignItems="center">
          <Avatar sx={{ width: 64, height: 64 }}>
            <PersonIcon fontSize="large" />
          </Avatar>

          <Typography variant="h6" fontWeight="bold">
            {english ? "User Profile" : "Perfil do Usuário"}
          </Typography>

          <Divider sx={{ width: "100%" }} />

          {logado ? (
            <Stack spacing={1} width="100%">
              <Typography>
                <strong>{english ? "Name:" : "Nome:"}</strong> {nome}
              </Typography>
              <Typography>
                <strong>Email:</strong> {email}
              </Typography>
              <Typography>
                <strong>{english ? "Role:" : "Tipo:"}</strong> {estado}
              </Typography>
            </Stack>
          ) : (
            <Typography color="error">
              {english
                ? "You are not logged in"
                : "Você não está logado"}
            </Typography>
          )}

          <Divider sx={{ width: "100%", mt: 1 }} />

          <Stack spacing={1} width="100%">
            <Button
              variant="contained"
              color="error"
              startIcon={<LogoutIcon />}
              fullWidth
              onClick={handleDeslogar}
              disabled={!logado}
            >
              {english ? "Log out" : "Deslogar"}
            </Button>

            <Button
              variant="outlined"
              startIcon={<CloseIcon />}
              fullWidth
              onClick={onClose}
            >
              {english ? "Close" : "Fechar"}
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Modal>
  );
};

export default CriarPais;
