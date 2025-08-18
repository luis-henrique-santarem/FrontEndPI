import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Exemplo from "./components/Exemplo";
import Information from "./components/information";
import Historia from "./components/Historia";
import Politica from "./components/Politica";
import Cultura from "./components/Cultura";
import './App.css'
import { MapContainer, TileLayer} from 'react-leaflet';


const App = () => {
  return (
    <Router>
      <Header />
      
      <Routes>      
        <Route path="/" element={<MapContainer center={[25, 0]} zoom={3} scrollWheelZoom={true} zoomControl ={false}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      </MapContainer>} />       
        <Route path="/historia" element={<Historia />} />
        <Route path="/politica" element={<Politica />} />
        <Route path="/cultura" element={<Cultura />} />
      </Routes>

      <Footer />
    </Router>
  );

};



export default App;
