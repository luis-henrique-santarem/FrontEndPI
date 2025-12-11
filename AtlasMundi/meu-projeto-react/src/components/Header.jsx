import React, { useState, useEffect } from "react";
import "./Header.css";
import logo from "../assets/logo.png";
import icon from "../assets/search.png";
import menuIcon from "../assets/menu.png";
import { Modal, Box, Typography, TextField, Button, Tabs, Tab, Autocomplete } from "@mui/material";
import MenuInfo from "./MenuInfo";
import Usuario from "./Usuario";
import { login, register } from './../js/auth';

function Header({ onSearch }) {
  const [openLogin, setOpenLogin] = useState(false);
  const [openRegister, setOpenRegister] = useState(false);
  const [registerTab, setRegisterTab] = useState(0);
  const [options, setOptions] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openUsuario, setOpenUsuario] = useState(false);
  const [nome, setNome] = useState(null)
  const [email, setEmail] = useState(null)
  const [senha, setSenha] = useState(null)
  const [CSenha, setCSenha] = useState(null)
  const [cpf, setCPF] = useState(null)

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

  // Carregar lista de países
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
    <header className="header">
      <div className="header-container">
        <div className="logo-header">
          <img src={logo} alt="Logo" />
        </div>
        <div className="search-container">
          <img src={icon} className="icony" alt="Search Icon" />
          <Autocomplete
            options={options}
            sx={{ width: 280, backgroundColor: "white", borderRadius: "20px", "& .MuiOutlinedInput-root": { padding: "2px 8px" } }}
            getOptionLabel={option => option.label}
            renderOption={(props, option) => (
              <li {...props}>
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
            onChange={(e, value) => value && onSearch && onSearch(value.label)}
          />
        </div>
        <button className="menu-toggle" onClick={() => setMenuOpen(true)} aria-label="Abrir menu">
          <img src={menuIcon} alt="menu" />
        </button>
      </div>
      {menuOpen && (
        <MenuInfo
          onClose={() => setMenuOpen(false)}
          onLoginClick={() => { setMenuOpen(false); setOpenLogin(true); }}
          onRegisterClick={() => { setMenuOpen(false); setOpenRegister(true); }}
          onUserClick={() => { setMenuOpen(false); setOpenUsuario(true); }}
        />
      )}
      <Modal open={openLogin} onClose={() => setOpenLogin(false)}>
        <Box sx={modalStyle}>
          <Typography variant="h6" gutterBottom>Logar</Typography>
          <form className="auth-form">
            <TextField onChange={(e) => setEmail(e.target.value)} label="Email" variant="outlined" fullWidth size="small" margin="dense" />
            <TextField onChange={(e) => setSenha(e.target.value)} label="Senha" type="password" variant="outlined" fullWidth size="small" margin="dense" />
            <Button onClick={() => { login(email, senha); setOpenLogin(false) }} variant="contained" color="primary" fullWidth>Enviar</Button>
            <Button onClick={() => setOpenLogin(false)} fullWidth>Fechar</Button>
          </form>
        </Box>
      </Modal>
      <Modal open={openRegister} onClose={() => setOpenRegister(false)}>
        <Box sx={modalStyle}>
          <Typography variant="h6" gutterBottom>Cadastrar</Typography>
          <Tabs value={registerTab} onChange={(e, val) => setRegisterTab(val)} centered>
            <Tab label="Aluno" />
            <Tab label="Professor" />
          </Tabs>
          {registerTab === 0 && (
            <form className="auth-form">
              <TextField onChange={(e) => setNome(e.target.value)} label="Nome" fullWidth size="small" margin="dense" />
              <TextField onChange={(e) => setEmail(e.target.value)} label="Email" fullWidth size="small" margin="dense" />
              <TextField onChange={(e) => setSenha(e.target.value)} label="Senha" type="password" fullWidth size="small" margin="dense" />
              <TextField onChange={(e) => setCSenha(e.target.value)} label="Confirmar Senha" type="password" fullWidth size="small" margin="dense" />
              <Button onClick={() => { register({ "name": nome, "email": email, "password": senha }, [senha, CSenha]); setOpenRegister(false) }} variant="contained" color="primary" fullWidth>Enviar</Button>
              <Button onClick={() => setOpenRegister(false)} fullWidth>Fechar</Button>
            </form>
          )}
          {registerTab === 1 && (
            <form className="auth-form">
              <TextField onChange={(e) => setNome(e.target.value)} label="Nome" fullWidth size="small" margin="dense" />
              <TextField onChange={(e) => setEmail(e.target.value)} label="Email" fullWidth size="small" margin="dense" />
              <TextField onChange={(e) => setCPF(e.target.value)} label="CPF" fullWidth size="small" margin="dense" />
              <TextField onChange={(e) => setSenha(e.target.value)} label="Senha" type="password" fullWidth size="small" margin="dense" />
              <TextField onChange={(e) => setCSenha(e.target.value)} label="Confirmar Senha" type="password" fullWidth size="small" margin="dense" />
              <Button onClick={() => { register({ "name": nome, "email": email, "password": senha, "cpf": cpf }, [senha, CSenha]); setOpenRegister(false) }} variant="contained" color="primary" fullWidth>Enviar</Button>
              <Button onClick={() => setOpenRegister(false)} fullWidth>Fechar</Button>
            </form>
          )}
        </Box>
      </Modal>
      {openUsuario && (
        <Usuario onClose={() => setOpenUsuario(false)} />
      )}

    </header>
  );
}
export default Header;
