import React from 'react'
import { Link } from 'react-router-dom'
import './Information.css'

function Information() {
  return (
    <div className='info'>
        <h2 className='titlecountry'>Nome do país</h2>
        <img className='imgcountry' src="https://bandeira.net/wp-content/uploads/2018/08/bandeira-do-brasil-0.png" alt="Bandeira do país" />
        <p className='quickinformation'>Informações rápidas</p>

        <Link to="/historia" className='btninfo'>História</Link>
        <Link to="/politica" className='btninfo'>Política</Link>
        <Link to="/cultura" className='btninfo'>Cultura</Link>
    </div>
  )
}

export default Information
