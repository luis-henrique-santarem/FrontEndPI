import React, { useState, useEffect } from "react";
import { Modal, Box, Typography, Button } from "@mui/material";
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
    width: 350,
    bgcolor: "background.paper",
    borderRadius: 2,
    boxShadow: 24,
    p: 4,
  };

  // Função para atualizar as informações do usuário
  async function atualizarInformacoes() {
    try {
      const token = localStorage.getItem("token");
      const userInformations = await getarUsuario(token);

      if (!userInformations) {
        setLogado(false);
        return; // Sai da função se não encontrar informações
      }

      setLogado(true);
      setNome(userInformations.name);
      setEmail(userInformations.email);
      setEstado(userInformations.teacher ? "professor" : "Aluno"); // Atualiza estado de forma condicional
    } catch (err) {
      console.log(err);
    }
  }

  // Função para deslogar
  function handleDeslogar() {
    deslogar();
    setLogado(false);
  }

  // Atualiza as informações do usuário quando o componente for montado
  useEffect(() => {
    atualizarInformacoes();
  }, []);

  return (
    <Modal style={{ height: "85vh", position: "absolute", top: 60 }} open={true} onClose={onClose}>
      <Box sx={modalStyle}>
        {/* Renderiza as informações do usuário, caso esteja logado */}
        {logado ? (
          <>
            <div>
              <label>Nome de usuário: {nome}</label>
              <br />
            </div>
            <div>
              <label>Email: {email}</label>
              <br />
            </div>
            <div>
              <label>Você é um {estado}</label>
              <br />
            </div>
          </>
        ) : (
          <div>
            <label>Você não está logado</label>
            <br />
          </div>
        )}

        {/* Botões */}
        <Button fullWidth onClick={handleDeslogar}>
          {english ? "Log out" : "Deslogar"}
        </Button>
        <Button fullWidth onClick={onClose}>
          {english ? "Close" : "Fechar"}
        </Button>
      </Box>
    </Modal>
  );
};

export default CriarPais;
