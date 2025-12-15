import React from "react";
import { Modal, Box, Typography, TextField, Button } from "@mui/material";

const CriarPais = ({ onClose }) => {

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
         <Modal open={true}  onClose={onClose}>
                    <Box sx={modalStyle}>
                        <Typography variant="h6" gutterBottom>Criar País</Typography>
        
                        <form className="usuario-form">
                            <TextField label="Informação Rápida"  fullWidth size="small" margin="dense" />
                            <TextField label="politica"  fullWidth size="small" margin="dense" />
                            <TextField label="politica2"  fullWidth size="small" margin="dense"/>
                            <TextField label="historia"  fullWidth size="small" margin="dense" />
                            <TextField label="historia2"  fullWidth size="small" margin="dense"/>
                            <TextField label="cultura"  fullWidth size="small" margin="dense" />
                            <TextField label="cultura2"  fullWidth size="small" margin="dense"/>
                            <TextField label="Fonte confia"  fullWidth size="small" margin="dense"/>
                            
                            <div className="usuario-buttons">
                                <Button variant="contained" color="primary" fullWidth >Registrar</Button>
                                <Button variant="contained" color="primary" fullWidth >Atualizar</Button>
                                <Button variant="contained" color="error" fullWidth >Deletar</Button>
                                <Button fullWidth onClick={onClose}>Fechar</Button>
                            </div>
                        </form>
                    </Box>
                </Modal>
    )

}
 export default CriarPais;