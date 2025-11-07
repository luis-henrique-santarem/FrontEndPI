import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Information from "./components/Information";
import Historia from "./components/Historia";
import Politica from "./components/Politica";
import Cultura from "./components/Cultura";
import Splash from "./components/Splash"; 
import "./App.css";

// Importa componentes do Leaflet
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import { useState, useEffect, useRef } from "react";

const App = () => {
  // Estados principais do App
  const [geoData, setGeoData] = useState(null); // Dados do GeoJSON
  const [showInfo, setShowInfo] = useState(false); // Controla exibição da sidebar de informação
  const [nomePais, setNomePais] = useState(""); // Nome do país selecionado
  const [flagUrl, setFlagUrl] = useState(""); // URL da bandeira do país
  const [showSplash, setShowSplash] = useState(true); // Controla splash inicial
  const mapRef = useRef(); // Referência ao mapa Leaflet

  // Carrega GeoJSON ao iniciar
  useEffect(() => {
    fetch("/custom.geo.json")
      .then((res) => res.json())
      .then((data) => setGeoData(data))
      .catch((error) => console.error("Erro ao carregar o GeoJSON:", error));
  }, []);

  // Estilo padrão dos países
  const defaultStyle = {
    fillColor: "#3388ff",
    weight: 1,
    color: "white",
    fillOpacity: 0.5,
  };

  // Estilo ao passar o mouse
  const highlightStyle = {
    fillColor: "#3388ff",
    weight: 2,
    color: "white",
    fillOpacity: 0.7,
  };

  // Função chamada para cada país do GeoJSON
  function onEachCountry(feature, layer) {
    const countryName = feature.properties.admin_pt || feature.properties.name_pt;
    let isoCode = feature.properties.iso_a2;
    const idBotao = `btn-${isoCode}`;

    // Correções de nomes especiais
    const overrides = {
      França: "FR",
      France: "FR",
      "Reino Unido": "GB",
      "United Kingdom": "GB",
      Rússia: "RU",
      Russia: "RU",
      Grécia: "GR",
      Greece: "GR",
      "Coreia do Sul": "KR",
      "South Korea": "KR",
      "Coreia do Norte": "KP",
      "North Korea": "KP",
    };

    if (overrides[countryName]) {
      isoCode = overrides[countryName];
    }

    // Eventos do país
    layer.on({
      mouseover: (e) => e.target.setStyle(highlightStyle),
      mouseout: (e) => e.target.setStyle(defaultStyle),
      popupopen: () => {
        setTimeout(() => {
          const botao = document.getElementById(idBotao);
          if (botao) {
            botao.addEventListener(
              "click",
              () => {
                setNomePais(countryName);
                if (isoCode) {
                  setFlagUrl(
                    `https://flagcdn.com/w80/${isoCode.toLowerCase()}.png`
                  );
                } else {
                  setFlagUrl("");
                }
                setShowInfo(true);
              },
              { once: true }
            );
          }
        }, 0);
      },
    });

    // Bind do popup com bandeira e botão
    if (isoCode) {
      const flag = `https://flagcdn.com/w40/${isoCode.toLowerCase()}.png`;
      layer.bindPopup(`
        <div style="text-align: center;">
          <strong>${countryName}</strong><br/>
          <img src="${flag}" alt="Bandeira de ${countryName}" width="40"/><br/>
          <button id="${idBotao}">Click</button>
        </div>
      `);
    } else {
      layer.bindPopup(`<strong>${countryName}</strong>`);
    }
  }

  // Função para pesquisar país pelo Autocomplete do Header
  const handleSearch = (query) => {
    if (!geoData || !query) return;

    // Procura país no GeoJSON
    const found = geoData.features.find((f) => {
      const countryName = f.properties.admin_pt || f.properties.name_pt || "";
      return countryName.toLowerCase() === query.toLowerCase();
    });

    if (found) {
      const countryName = found.properties.admin_pt || found.properties.name_pt;
      let isoCode = found.properties.iso_a2;

      const overrides = {
        França: "FR",
        France: "FR",
        "Reino Unido": "GB",
        "United Kingdom": "GB",
        Rússia: "RU",
        Russia: "RU",
        Grécia: "GR",
        Greece: "GR",
        "Coreia do Sul": "KR",
        "South Korea": "KR",
        "Coreia do Norte": "KP",
        "North Korea": "KP",
      };

      if (overrides[countryName]) {
        isoCode = overrides[countryName];
      }

      setNomePais(countryName);
      if (isoCode) {
        setFlagUrl(`https://flagcdn.com/w80/${isoCode.toLowerCase()}.png`);
      } else {
        setFlagUrl("");
      }
      setShowInfo(true);

      // Centraliza o mapa no país
      if (mapRef.current) {
        // eslint-disable-next-line no-undef
        const layer = L.geoJSON(found);
        mapRef.current.fitBounds(layer.getBounds());
      }
    } else {
      alert("País não encontrado!");
    }
  };

  return (
    <Router>
      {/* Header com barra de pesquisa */}
      <Header onSearch={handleSearch} />
      <Routes>
        {/* Página principal com mapa */}
        <Route path="/" element={
            <div style={{ position: "relative" }}>
              {/* Splash inicial */}
              {showSplash && <Splash onFinish={() => setShowSplash(false)} />}
              {/* Mapa Leaflet */}
              <MapContainer 
                center={[25, 0]} 
                zoom={3} 
                minZoom={2} 
                maxBounds={[ [-100, -180], [100, 180] ]}
                scrollWheelZoom={true}
                zoomControl={false}
                style={{ height: "93.5vh", width: "100%" }}
                whenCreated={(mapInstance) => (mapRef.current = mapInstance)}
              >
                <TileLayer 
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  noWrap={true}
                />
                {/* GeoJSON com todos os países */}
                {geoData && (
                  <GeoJSON data={geoData} style={defaultStyle} onEachFeature={onEachCountry} />
                )}
              </MapContainer>
              {/* Sidebar de informações */}
              {showInfo && (
                <Information nome={nomePais} flagUrl={flagUrl} onClose={() => setShowInfo(false)} />
              )}
            </div>
          }
        />
        {/* Outras rotas */}
        <Route path="/historia" element={<Historia />} />
        <Route path="/politica" element={<Politica />} />
        <Route path="/cultura" element={<Cultura />} />
      </Routes>
      {/* Footer fixo */}
      <Footer />
    </Router>
  );
};

export default App;
