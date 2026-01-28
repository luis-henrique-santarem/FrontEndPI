import React, { useState, useEffect } from "react";
import "./Header.css";
import logo from "../assets/logo.png";
import icon from "../assets/search.png";
import menuIcon from "../assets/menu.png";
import PerfilIcon from "../assets/perfil.png";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  Tabs,
  Tab,
  Autocomplete
} from "@mui/material";

import MenuInfo from "./MenuInfo";
import UsuarioInfo from "./UsuarioInfo"
import Usuario from "./Usuario";
import { login, register } from "./../js/auth";

function Header({ onSearch, english, toggleLanguage }) {
  const [openLogin, setOpenLogin] = useState(false);
  const [openRegister, setOpenRegister] = useState(false);
  const [registerTab, setRegisterTab] = useState(0);
  const [options, setOptions] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openUsuario, setOpenUsuario] = useState(false);
  const [openUsuarioInfo, setOpenUsuarioInfo] = useState(false);

  // campos
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [CSenha, setCSenha] = useState("");
  const [cpf, setCPF] = useState("");

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

  /* =========================
     🔥 FUNÇÃO CHAVE
     Cadastro → Login
  ========================= */
  async function handleRegisterSubmit(data, senhas) {
    const result = await register(data, senhas);

    if (result) {
      setOpenRegister(false); // fecha cadastro
      setOpenLogin(true);    // abre login
    }
  }

  // carregar países
  useEffect(() => {
    fetch("/custom.geo.json")
      .then(res => res.json())
      .then(data => {
        const list = data.features.map(f => {
          const name =
            f.properties[`admin_${english ? "en" : "pt"}`] ||
            f.properties[`name_${english ? "en" : "pt"}`] ||
            f.properties.name;

          const iso = f.properties.iso_a2;

          return {
            label: name,
            iso,
            flag: iso
              ? `https://flagcdn.com/w20/${iso.toLowerCase()}.png`
              : null
          };
        });
        setOptions(list);
      })
      .catch(err => console.error("Erro ao carregar países:", err));
  }, [english]);

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
            sx={{
              width: 280,
              backgroundColor: "white",
              borderRadius: "20px"
            }}
            getOptionLabel={option => option.label}
            renderOption={(props, option) => (
              <li {...props}>
                {option.flag && (
                  <img
                    width="20"
                    src={option.flag}
                    alt=""
                    style={{ marginRight: 8, borderRadius: "3px" }}
                  />
                )}
                {option.label}
              </li>
            )}
            renderInput={params => (
              <TextField
                {...params}
                placeholder={english ? "Search" : "Pesquisar..."}
                size="small"
              />
            )}
            onChange={(e, value) =>
              value && onSearch && onSearch(value.label)
            }
          />
        </div>


        <div className="perfil-toggle">
          
          <button className="menu-toggle" onClick={() => setOpenUsuarioInfo(true)} >

            <img src={PerfilIcon} alt="perfil" />
          </button>

          <button className="menu-toggle" onClick={() => setMenuOpen(true)} >

            <img src={menuIcon} alt="menu" />
          </button>

        </div>
      </div>

      {menuOpen && (
        <MenuInfo
          onClose={() => setMenuOpen(false)}
          onLoginClick={() => {
            setMenuOpen(false);
            setOpenLogin(true);
          }}
          onRegisterClick={() => {
            setMenuOpen(false);
            setOpenRegister(true);
          }}
          onUserClick={() => {
            setMenuOpen(false);
            setOpenUsuario(true);
          }}
          english={english}
          toggleLanguage={toggleLanguage}
        />
      )}

      {/* LOGIN */}
      <Modal open={openLogin} onClose={() => setOpenLogin(false)}>
        <Box sx={modalStyle}>
          <Typography variant="h6">
            {english ? "Login" : "Logar"}
          </Typography>

          <TextField
            label="Email"
            fullWidth
            size="small"
            margin="dense"
            onChange={e => setEmail(e.target.value)}
          />

          <TextField
            label={english ? "Password" : "Senha"}
            type="password"
            fullWidth
            size="small"
            margin="dense"
            onChange={e => setSenha(e.target.value)}
          />

          <Button
            onClick={() => {
              login(email, senha);
              setOpenLogin(false);
            }}
            variant="contained"
            fullWidth
          >
            {english ? "Send" : "Enviar"}
          </Button>
        </Box>
      </Modal>

      {/* REGISTER */}
      <Modal open={openRegister} onClose={() => setOpenRegister(false)}>
        <Box sx={modalStyle}>
          <Typography variant="h6">
            {english ? "Register" : "Cadastrar"}
          </Typography>

          <Tabs
            value={registerTab}
            onChange={(e, v) => setRegisterTab(v)}
            centered
          >
            <Tab label={english ? "Student" : "Aluno"} />
            <Tab label={english ? "Teacher" : "Professor"} />
          </Tabs>

          {registerTab === 0 && (
            <>
              <TextField label="Nome" fullWidth size="small" margin="dense" onChange={e => setNome(e.target.value)} />
              <TextField label="Email" fullWidth size="small" margin="dense" onChange={e => setEmail(e.target.value)} />
              <TextField label="Senha" type="password" fullWidth size="small" margin="dense" onChange={e => setSenha(e.target.value)} />
              <TextField label="Confirmar Senha" type="password" fullWidth size="small" margin="dense" onChange={e => setCSenha(e.target.value)} />

              <Button
                variant="contained"
                fullWidth
                onClick={() =>
                  handleRegisterSubmit(
                    { name: nome, email, password: senha },
                    [senha, CSenha]
                  )
                }
              >
                {english ? "Send" : "Enviar"}
              </Button>
            </>
          )}

          {registerTab === 1 && (
            <>
              <TextField label="Nome" fullWidth size="small" margin="dense" onChange={e => setNome(e.target.value)} />
              <TextField label="Email" fullWidth size="small" margin="dense" onChange={e => setEmail(e.target.value)} />
              <TextField label="CPF" fullWidth size="small" margin="dense" onChange={e => setCPF(e.target.value)} />
              <TextField label="Senha" type="password" fullWidth size="small" margin="dense" onChange={e => setSenha(e.target.value)} />
              <TextField label="Confirmar Senha" type="password" fullWidth size="small" margin="dense" onChange={e => setCSenha(e.target.value)} />

              <Button
                variant="contained"
                fullWidth
                onClick={() =>
                  handleRegisterSubmit(
                    { name: nome, email, password: senha, cpf },
                    [senha, CSenha]
                  )
                }
              >
                {english ? "Send" : "Enviar"}
              </Button>
            </>
          )}
        </Box>
      </Modal>

      {openUsuario && (
        <Usuario onClose={() => setOpenUsuario(false)} english={english} />
      )}

      {openUsuarioInfo && (
        <UsuarioInfo onClose={() => setOpenUsuarioInfo(false)} english={english} />
      )}
    </header>
  );
}

export default Header;
