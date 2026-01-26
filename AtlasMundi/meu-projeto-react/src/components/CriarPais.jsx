import React from "react";
import { useState } from "react";
import { Modal, Box, Typography, TextField, Button, hexToRgb } from "@mui/material";
import { AtualizarPais, DeletarPais, RegistrarPais } from "../js/country";

const CriarPais = ({ pais, onClose, english }) => {
    const [politica, setPolitica] = useState("");
    const [historia, setHistoria] = useState("");
    const [cultura, setCultura] = useState("");
    const [fonteConfia, setFonteConfia] = useState("");
    const [url, setUrl] = useState("")

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
        await RegistrarPais(pais, "informacaoRapida", url, politica, historia, cultura, english, fonteConfia, token)
    }

    async function handleDeletarPais(){
        const token = localStorage.getItem("token");  
        await DeletarPais(pais, token)
    }

    async function handleAtualizarPais(){
        const token = localStorage.getItem("token");  
        await AtualizarPais(pais, url, politica, historia, cultura, english, fonteConfia, token)
    }

    return (
         <Modal style={{height:"85vh", position: "absolute", top:60}} open={true} onClose={onClose}>
                    <Box sx={modalStyle}>
                        <Typography variant="h6" gutterBottom>{english ? "Create Country":"Editar País"}</Typography>
        
                        <form className="usuario-form">
                            <TextField onChange={(e) => setPolitica(e.target.value)} label={english ? "Politics" : "Politica"}  fullWidth size="small" margin="dense" />
                            <TextField onChange={(e) => setHistoria(e.target.value)} label={english ? "History" : "Historia"}  fullWidth size="small" margin="dense" />
                            <TextField onChange={(e) => setCultura(e.target.value)} label={english ? "Culture" : "Cultura"}  fullWidth size="small" margin="dense" />
                            <TextField onChange={(e) => setFonteConfia(e.target.value)} label={english ? "Source" : "Fonte"}  fullWidth size="small" margin="dense"/>
                            <TextField onChange={(e) => setUrl(e.target.value)} label={english ? "ImageURl" : "ImagemURl"}  fullWidth size="small" margin="dense"/>
                            
                            <div className="usuario-buttons">
                                <Button onClick={() => {handleRegistrarPais()}} variant="contained" color="primary" fullWidth >{english ? "Register" : "Registrar"}</Button>
                                <Button onClick={() => {handleAtualizarPais()}} variant="contained" color="primary" fullWidth >{english ? "Update":"Atualizar"}</Button>
                                <Button onClick={() => {handleDeletarPais()}} variant="contained" color="error" fullWidth >{english ? "Delete" : "Deletar"}</Button>
                                <Button fullWidth onClick={onClose}>{english ? "Close":"Fechar"}</Button>
                            </div>
                        </form>
                    </Box>
                </Modal>
    )

}
 export default CriarPais;