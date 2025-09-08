import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Information from "./components/information";
import Historia from "./components/Historia";
import Politica from "./components/Politica";
import Cultura from "./components/Cultura";
import './App.css'
import { MapContainer, TileLayer} from 'react-leaflet';
import './App.css';
import {GeoJSON } from 'react-leaflet';
import { useState, useEffect } from 'react';



const App = () => {
  let [geoData, setGeoData] = useState(null);

  useEffect(() => {
    fetch('/custom.geo.json')
      .then((res) => res.json())
      .then((data) => setGeoData(data));
  }, []);

  const defaultStyle = {
    fillColor: '#3388ff',
    weight: 1,
    color: 'white',
    fillOpacity: 0.5,
  };

  const highlightStyle = {
    fillColor: '#3388ff',
    weight: 2,
    color: 'white',
    fillOpacity: 0.7,
  };

  function onEachCountry(feature, layer) {
    layer.on({
      mouseover: (e) => e.target.setStyle(highlightStyle),
      mouseout: (e) => e.target.setStyle(defaultStyle),
    });
  }
  return (
    <Router>
      <Header />
      <Routes>      
        <Route path="/" element={<MapContainer center={[25, 0]} zoom={3} minZoom={2} maxBounds={[[-100, -180], [100, 180]]} worldCopyJump={false} maxBoundsViscosity={10.0} scrollWheelZoom={true} zoomControl ={false}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        noWrap={true}
      />{geoData && <GeoJSON data={geoData} style={defaultStyle} onEachFeature={onEachCountry} />}<Information/></MapContainer>}/>
        <Route></Route>
        <Route path="/historia" element={<Historia />} />
        <Route path="/politica" element={<Politica />} />
        <Route path="/cultura" element={<Cultura />} />
        
        </Routes>
      


      <Footer />
    </Router>
  );

};



export default App;