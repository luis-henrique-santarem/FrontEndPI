import React, { useState, useEffect } from "react";
import "./Header.css";
import logo from "../assets/logo.png";
import icon from "../assets/search.png";
import menuIcon from "../assets/menu.png";
import { Modal, Box, Typography, TextField, Button, Tabs, Tab, Autocomplete } from "@mui/material";
import MenuInfo from "./MenuInfo";
import login from './../js/login'

// Recebe a prop `onSearch` para lidar com pesquisas
function Header({ onSearch }) {
  // Estados para controlar abertura de modais e menu lateral
  const [openLogin, setOpenLogin] = useState(false); // Modal de login
  const [openRegister, setOpenRegister] = useState(false); // Modal de cadastro
  const [registerTab, setRegisterTab] = useState(0); // Tab selecionada no cadastro (Aluno / Professor)
  const [options, setOptions] = useState([]); // Opções do autocomplete (lista de países)
  const [menuOpen, setMenuOpen] = useState(false); // Controle do menu lateral

  // Estilo do modal centralizado
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

  // useEffect para carregar a lista de países do arquivo geoJSON
  useEffect(() => {
    fetch("/custom.geo.json")
      .then(res => res.json())
      .then(data => {
        const list = data.features.map(f => {
          const name = f.properties.admin_pt || f.properties.name_pt || f.properties.name;
          const iso = f.properties.iso_a2;
          return { 
            label: name, 
            iso, 
            flag: iso ? `https://flagcdn.com/w20/${iso.toLowerCase()}.png` : null 
          };
        });
        setOptions(list);
      })
      .catch(err => console.error("Erro ao carregar países:", err));
  }, []);

  return (
    // Elemento semântico <header> do site
    <header className="header">
      <div className="header-container">
        {/* Logo do site */}
        <div className="logo-header">
          <img src={logo} alt="Logo" />
        </div>

        {/* Caixa de pesquisa */}
        <div className="search-container">
          <img src={icon} className="icony" alt="Search Icon" />
          <Autocomplete 
            options={options} // Lista de opções carregadas
            sx={{ width: 260, backgroundColor: "white", borderRadius: "20px", "& .MuiOutlinedInput-root": { padding: "2px 8px" } }}
            getOptionLabel={option => option.label} // Texto exibido na lista
            renderOption={(props, option) => (
              <li {...props}>
                {/* Mostra bandeira se disponível */}
                {option.flag && <img loading="lazy" width="20" src={option.flag} alt="" style={{ marginRight: 8, borderRadius: "3px" }} />}
                {option.label}
              </li>
            )}
            renderInput={params => (
              <TextField 
                {...params} 
                placeholder="Pesquisar..." 
                size="small" 
                variant="outlined" 
                sx={{ "& .MuiOutlinedInput-root": { borderRadius: "20px", fontSize: "0.9rem" } }} 
              />
            )}
            // Dispara função onSearch ao selecionar país
            onChange={(e, value) => value && onSearch && onSearch(value.label)}
          />
        </div>

        {/* Botão de abrir menu lateral */}
        <button className="menu-toggle" onClick={() => setMenuOpen(true)} aria-label="Abrir menu">
          <img src={menuIcon} alt="menu" />
        </button>
      </div>

      {/* Menu lateral (MenuInfo) */}
      {menuOpen && (
        <MenuInfo 
          onClose={() => setMenuOpen(false)}
          onLoginClick={() => { setMenuOpen(false); setOpenLogin(true); }}
          onRegisterClick={() => { setMenuOpen(false); setOpenRegister(true); }}
        />
      )}

      {/* Modal de Login */}
      <Modal open={openLogin} onClose={() => setOpenLogin(false)}>
        <Box sx={modalStyle}>
          <Typography variant="h6" gutterBottom>Logar</Typography>
          <form className="auth-form">
            <TextField label="Email" variant="outlined" fullWidth size="small" margin="dense" />
            <TextField label="Senha" type="password" variant="outlined" fullWidth size="small" margin="dense" />
            <Button variant="contained" color="primary" fullWidth>Enviar</Button>
            <Button onClick={() => setOpenLogin(false)} fullWidth>Fechar</Button>
          </form>
        </Box>
      </Modal>

      {/* Modal de Cadastro */}
      <Modal open={openRegister} onClose={() => setOpenRegister(false)}>
        <Box sx={modalStyle}>
          <Typography variant="h6" gutterBottom>Cadastrar</Typography>
          <Tabs value={registerTab} onChange={(e, val) => setRegisterTab(val)} centered>
            <Tab label="Aluno" />
            <Tab label="Professor" />
          </Tabs>

          {/* Formulário de cadastro Aluno */}
          {registerTab === 0 && (
            <form className="auth-form">
              <TextField label="Nome" variant="outlined" fullWidth size="small" margin="dense" />
              <TextField label="Email" variant="outlined" fullWidth size="small" margin="dense" />
              <TextField label="Senha" type="password" variant="outlined" fullWidth size="small" margin="dense" />
              <TextField label="Confirmar Senha" type="password" variant="outlined" fullWidth size="small" margin="dense" />
              <Button variant="contained" color="primary" fullWidth>Enviar</Button>
              <Button onClick={() => setOpenRegister(false)} fullWidth>Fechar</Button>
            </form>
          )}

          {/* Formulário de cadastro Professor */}
          {registerTab === 1 && (
            <form className="auth-form">
              <TextField label="Nome" variant="outlined" fullWidth size="small" margin="dense" />
              <TextField label="Email" variant="outlined" fullWidth size="small" margin="dense" />
              <TextField label="CPF" variant="outlined" fullWidth size="small" margin="dense" />
              <TextField label="Senha" type="password" variant="outlined" fullWidth size="small" margin="dense" />
              <TextField label="Confirmar Senha" type="password" variant="outlined" fullWidth size="small" margin="dense" />
              <Button variant="contained" color="primary" fullWidth>Enviar</Button>
              <Button onClick={() => setOpenRegister(false)} fullWidth>Fechar</Button>
            </form>
          )}
        </Box>
      </Modal>
    </header>
  );
}

export default Header;
