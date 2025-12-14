import React, { useEffect, useState } from "react";
import { Modal, Box, Typography, TextField, Button } from "@mui/material";
import { atualizarUsuario as atualizarUsuarioAPI, deletarUsuario} from "../js/user";
import "./Usuario.css";

const Usuario = ({ onClose }) => {
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [cpf, setCPF] = useState("");
    const [novaSenha, setNovaSenha] = useState("");
    const [confirmaSenha, setConfirmaSenha] = useState("");

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

    async function handleAtualizar() {
        if (novaSenha !== confirmaSenha) {
            alert("A nova senha e a confirmação não coincidem!");
            return;
        }
        const token = localStorage.getItem("token");
        console.log("mandando atualizacao com token: "+token)
        try {
            await atualizarUsuarioAPI(
                nome,
                email,
                novaSenha,
                cpf,
                token,
            );
        } catch (err) {
            console.error(err);
            alert("Erro ao atualizar usuário.");
        }
    }

    async function handleDeletar() {
        if (confirm("Tem certeza que deseja deletar sua conta?")) {
            await deletarUsuario(localStorage.getItem("token"))
        }
    }

    return (
        <Modal open={true} onClose={onClose}>
            <Box sx={modalStyle}>
                <Typography variant="h6" gutterBottom>Meu Usuário</Typography>

                <form className="usuario-form">
                    <TextField label="Nome" value={nome} onChange={(e) => setNome(e.target.value)} fullWidth size="small" margin="dense" />
                    <TextField label="Email" value={email} onChange={(e) => setEmail(e.target.value)} fullWidth size="small" margin="dense" />
                    <TextField label="CPF" value={cpf} onChange={(e) => setCPF(e.target.value)} fullWidth size="small" margin="dense" />
                    <TextField label="Nova Senha" type="password" value={novaSenha} onChange={(e) => setNovaSenha(e.target.value)} fullWidth size="small" margin="dense" />
                    <TextField label="Confirmar Nova Senha" type="password" value={confirmaSenha} onChange={(e) => setConfirmaSenha(e.target.value)} fullWidth size="small" margin="dense" />

                    <div className="usuario-buttons">
                        <Button variant="contained" color="primary" fullWidth onClick={handleAtualizar}>Atualizar</Button>
                        <Button variant="contained" color="error" fullWidth onClick={handleDeletar}>Deletar Conta</Button>
                        <Button fullWidth onClick={onClose}>Fechar</Button>
                    </div>
                </form>
            </Box>
        </Modal>
    );
};

export default Usuario;
