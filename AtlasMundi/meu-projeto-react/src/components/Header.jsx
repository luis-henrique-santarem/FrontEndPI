import React, { useState } from 'react';
import './Header.css';
import logo from '../assets/logo.png';
import { Modal, Box, Typography, TextField, Button, Tabs, Tab } from '@mui/material';

function Header() {
  const [language, setLanguage] = useState('pt');
  const [openLogin, setOpenLogin] = useState(false);
  const [openRegister, setOpenRegister] = useState(false);
  const [registerTab, setRegisterTab] = useState(0); // 0 = aluno, 1 = professor

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

  const toggleLanguage = () => {
    setLanguage(prevLang => (prevLang === 'pt' ? 'en' : 'pt'));
  };

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

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo-header">
          <img src={logo} alt="Logo" />
        </div>

        <nav className="nav">
          <input type="text" className="search-input" placeholder={t.search}/>
          <button className="btn-auth" onClick={() => setOpenLogin(true)}>{t.login}</button>
          <button className="btn-auth" onClick={() => setOpenRegister(true)}>{t.register}</button>
          <button className="lang-btn" onClick={toggleLanguage}>
            {t.switch}
          </button>
        </nav>
      </div>

      {/* Login Modal */}
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

      {/* Register Modal */}
      <Modal open={openRegister} onClose={() => setOpenRegister(false)}>
        <Box sx={modalStyle}>
          <Typography variant="h6" gutterBottom>{t.register}</Typography>

          {/* Tabs para aluno/professor */}
          <Tabs
            value={registerTab}
            onChange={(e, newValue) => setRegisterTab(newValue)}
            centered
          >
            <Tab label={t.student} />
            <Tab label={t.teacher} />
          </Tabs>

          {/* Formulário Aluno */}
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

          {/* Formulário Professor */}
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
