import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Exemplo from "./components/Exemplo";
import Information from "./components/information";
import Historia from "./components/Historia";
import Politica from "./components/Politica";
import Cultura from "./components/Cultura";


function App() {
  return (
    <Router>
      <Header />

      <Routes>
      
        <Route path="/" element={<Exemplo />} />

       
        <Route path="/historia" element={<Historia />} />
        <Route path="/politica" element={<Politica />} />
        <Route path="/cultura" element={<Cultura />} />
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;
