import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import Exemplo from './components/Exemplo'




function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header/>
      <Exemplo/>
      <Footer/>
    </>
  )
}

export default App
