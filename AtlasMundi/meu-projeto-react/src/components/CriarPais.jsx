import React from "react";
import { useState } from "react";
import { Modal, Box, Typography, TextField, Button } from "@mui/material";
import { AtualizarPais, DeletarPais, RegistrarPais } from "../js/country";

const CriarPais = ({ pais, onClose }) => {
    const [informacaoRapida, setInformacaoRapida] = useState("");
    const [politica, setPolitica] = useState("");
    const [politica2, setPolitica2] = useState("");
    const [historia, setHistoria] = useState("");
    const [historia2, setHistoria2] = useState("");
    const [cultura, setCultura] = useState("");
    const [cultura2, setCultura2] = useState("");
    const [fonteConfia, setFonteConfia] = useState("");
    const inEnglish = false

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

    async function handleRegistrarPais(){
        const token = localStorage.getItem("token");  
        await RegistrarPais(pais, informacaoRapida, politica, politica2, historia, historia2, cultura, cultura2, inEnglish, fonteConfia, token)
    }

    async function handleDeletarPais(){
        const token = localStorage.getItem("token");  
        await DeletarPais(pais, token)
    }

    async function handleAtualizarPais(){
        const token = localStorage.getItem("token");  
        await AtualizarPais(pais, informacaoRapida, politica, politica2, historia, historia2, cultura, cultura2, inEnglish, fonteConfia, token)
    }

    return (
         <Modal open={true}  onClose={onClose}>
                    <Box sx={modalStyle}>
                        <Typography variant="h6" gutterBottom>Criar País</Typography>
        
                        <form className="usuario-form">
                            <TextField onChange={(e) => setInformacaoRapida(e.target.value)} label="Informação Rápida"  fullWidth size="small" margin="dense" />
                            <TextField onChange={(e) => setPolitica(e.target.value)} label="politica"  fullWidth size="small" margin="dense" />
                            <TextField onChange={(e) => setPolitica2(e.target.value)} label="politica2"  fullWidth size="small" margin="dense"/>
                            <TextField onChange={(e) => setHistoria(e.target.value)} label="historia"  fullWidth size="small" margin="dense" />
                            <TextField onChange={(e) => setHistoria2(e.target.value)} label="historia2"  fullWidth size="small" margin="dense"/>
                            <TextField onChange={(e) => setCultura(e.target.value)} label="cultura"  fullWidth size="small" margin="dense" />
                            <TextField onChange={(e) => setCultura2(e.target.value)} label="cultura2"  fullWidth size="small" margin="dense"/>
                            <TextField onChange={(e) => setFonteConfia(e.target.value)} label="Fonte confia"  fullWidth size="small" margin="dense"/>
                            
                            <div className="usuario-buttons">
                                <Button onClick={() => {handleRegistrarPais()}} variant="contained" color="primary" fullWidth >Registrar</Button>
                                <Button onClick={() => {handleAtualizarPais()}} variant="contained" color="primary" fullWidth >Atualizar</Button>
                                <Button onClick={() => {handleDeletarPais()}} variant="contained" color="error" fullWidth >Deletar</Button>
                                <Button fullWidth onClick={onClose}>Fechar</Button>
                            </div>
                        </form>
                    </Box>
                </Modal>
    )

}
 export default CriarPais;