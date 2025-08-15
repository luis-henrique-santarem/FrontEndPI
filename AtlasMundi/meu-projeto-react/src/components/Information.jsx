import React from 'react'
import './Information.css'

function Information() {
  return (
    <div className='info'>
        <h2 className='titlecountry'>Nome do país</h2>
        <img className='imgcountry' src="https://bandeira.net/wp-content/uploads/2018/08/bandeira-do-brasil-0.png" alt="Bandeira do país" />
        <p className='quickinformation'>Informacoes rapidas</p>
        <button className='btninfo'>Historia</button>
        <button  className='btninfo'>Politica</button>
        <button  className='btninfo'>Cultura</button>
    </div>
  )
}

export default Information