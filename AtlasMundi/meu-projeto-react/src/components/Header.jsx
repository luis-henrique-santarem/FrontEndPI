import React, { useState, useEffect } from 'react';
import './Header.css';
import logo from '../assets/logo.png';
import icon from '../assets/search.png';
import menuIcon from '../assets/menu.png';
import closeIcon from '../assets/close.png';
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  Tabs,
  Tab,
  Autocomplete
} from '@mui/material';

function Header({ onSearch }) {
  const [language, setLanguage] = useState('pt');
  const [openLogin, setOpenLogin] = useState(false);
  const [openRegister, setOpenRegister] = useState(false);
  const [registerTab, setRegisterTab] = useState(0);
  const [options, setOptions] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const translations = {
    pt: {
      login: 'Logar',
      register: 'Cadastrar',
      student: 'Aluno',
      teacher: 'Professor',
      search: 'Pesquisar...',
      switch: 'EN',
      close: 'Fechar',
      email: 'Email',
      password: 'Senha',
      name: 'Nome',
      confirm: 'Confirmar Senha',
      cpf: 'CPF',
      submit: 'Enviar',
    },
    en: {
      login: 'Login',
      register: 'Register',
      student: 'Student',
      teacher: 'Teacher',
      search: 'Search...',
      switch: 'PT',
      close: 'Close',
      email: 'Email',
      password: 'Password',
      name: 'Name',
      confirm: 'Confirm Password',
      cpf: 'CPF',
      submit: 'Submit',
    },
  };

  const t = translations[language];

  const toggleLanguage = () => setLanguage(prev => (prev === 'pt' ? 'en' : 'pt'));

  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 350,
    bgcolor: 'background.paper',
    borderRadius: 2,
    boxShadow: 24,
    p: 4,
  };

  useEffect(() => {
    fetch('/custom.geo.json')
      .then(res => res.json())
      .then(data => {
        const list = data.features.map(f => {
          const name = f.properties.admin_pt || f.properties.name_pt || f.properties.name;
          const iso = f.properties.iso_a2;
          return {
            label: name,
            iso: iso,
            flag: iso ? `https://flagcdn.com/w20/${iso.toLowerCase()}.png` : null,
          };
        });
        setOptions(list);
      })
      .catch(err => console.error('Erro ao carregar países:', err));
  }, []);

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo-header">
          <img src={logo} alt="Logo" />
        </div>


        <button
          className="menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Abrir menu"
        >
          <img src={menuOpen ? closeIcon : menuIcon} alt="menu" />
        </button>


        <nav className={`nav ${menuOpen ? 'active' : ''}`}>
          <img src={icon} className="icony" alt="Search Icon" />

          <Autocomplete
            options={options}
            sx={{
              width: 260,
              backgroundColor: "white",
              borderRadius: "20px",
              "& .MuiOutlinedInput-root": {
                padding: "2px 8px",
              },
            }}
            getOptionLabel={(option) => option.label}
            renderOption={(props, option) => (
              <li {...props}>
                {option.flag && (
                  <img
                    loading="lazy"
                    width="20"
                    src={option.flag}
                    alt=""
                    style={{ marginRight: 8, borderRadius: "3px" }}
                  />
                )}
                {option.label}
              </li>
            )}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder={t.search}
                size="small"
                variant="outlined"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "20px",
                    fontSize: "0.9rem",
                  },
                }}
              />
            )}
            onChange={(e, value) => {
              if (value && onSearch) onSearch(value.label);
            }}
          />

          <button className="btn-auth" onClick={() => setOpenLogin(true)}>
            {t.login}
          </button>
          <button className="btn-auth" onClick={() => setOpenRegister(true)}>
            {t.register}
          </button>
          <button className="lang-btn" onClick={toggleLanguage}>
            {t.switch}
          </button>
        </nav>
      </div>


      <Modal open={openLogin} onClose={() => setOpenLogin(false)}>
        <Box sx={modalStyle}>
          <Typography variant="h6" gutterBottom>{t.login}</Typography>
          <form className="auth-form">
            <TextField label={t.email} variant="outlined" fullWidth size="small" margin="dense" />
            <TextField label={t.password} type="password" variant="outlined" fullWidth size="small" margin="dense" />
            <Button variant="contained" color="primary" fullWidth>{t.submit}</Button>
            <Button onClick={() => setOpenLogin(false)} fullWidth>{t.close}</Button>
          </form>
        </Box>
      </Modal>


      <Modal open={openRegister} onClose={() => setOpenRegister(false)}>
        <Box sx={modalStyle}>
          <Typography variant="h6" gutterBottom>{t.register}</Typography>

          <Tabs value={registerTab} onChange={(e, val) => setRegisterTab(val)} centered>
            <Tab label={t.student} />
            <Tab label={t.teacher} />
          </Tabs>

          {registerTab === 0 && (
            <form className="auth-form">
              <TextField label={t.name} variant="outlined" fullWidth size="small" margin="dense" />
              <TextField label={t.email} variant="outlined" fullWidth size="small" margin="dense" />
              <TextField label={t.password} type="password" variant="outlined" fullWidth size="small" margin="dense" />
              <TextField label={t.confirm} type="password" variant="outlined" fullWidth size="small" margin="dense" />
              <Button variant="contained" color="primary" fullWidth>{t.submit}</Button>
              <Button onClick={() => setOpenRegister(false)} fullWidth>{t.close}</Button>
            </form>
          )}

          {registerTab === 1 && (
            <form className="auth-form">
              <TextField label={t.name} variant="outlined" fullWidth size="small" margin="dense" />
              <TextField label={t.email} variant="outlined" fullWidth size="small" margin="dense" />
              <TextField label={t.cpf} variant="outlined" fullWidth size="small" margin="dense" />
              <TextField label={t.password} type="password" variant="outlined" fullWidth size="small" margin="dense" />
              <TextField label={t.confirm} type="password" variant="outlined" fullWidth size="small" margin="dense" />
              <Button variant="contained" color="primary" fullWidth>{t.submit}</Button>
              <Button onClick={() => setOpenRegister(false)} fullWidth>{t.close}</Button>
            </form>
          )}
        </Box>
      </Modal>
    </header>
  );
}

export default Header;
