import React from 'react';
import { Link } from 'react-router-dom';
import './Information.css';

function Information({ nome, flagUrl, onClose }) {
  return (
    <div className='info'>
        <button onClick={onClose} className="close-btn">X</button>
        <h2 className='titlecountry'>{nome}</h2>
        {flagUrl && ( <img className='imgcountry' src={flagUrl} alt={`Bandeira de ${nome}`} /> )}
        <p className='quickinformation'>Informações rápidas</p>
        <Link to="/historia" className='btninfo'>História</Link>
        <Link to="/politica" className='btninfo'>Política</Link>
        <Link to="/cultura" className='btninfo'>Cultura</Link>
    </div>
  );
}

export default Information;
