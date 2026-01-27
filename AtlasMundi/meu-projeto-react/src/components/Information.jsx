import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Information.css";
import CriarPais from "./CriarPais";

function Information({ nome, flagUrl, onClose, isEnglish }) {
  const [visible, setVisible] = useState(false);
  const [openConfig, setOpenConfig] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 50);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    document.body.style.overflow = openConfig ? "hidden" : "auto";
    return () => (document.body.style.overflow = "auto");
  }, [openConfig]);

  return (
    <>
      {!openConfig && (
        <div className={`info ${visible ? "show" : ""}`}>
          <button onClick={onClose} className="close-btn">X</button>

          <h2 className="titlecountry">
            {isEnglish ? nome : `País: ${nome}`}
          </h2>

          {flagUrl && (
            <img
              className="imgcountry"
              src={flagUrl}
              alt={`Bandeira de ${nome}`}
            />
          )}

          <p className="quickinformation">
            {isEnglish ? "Quick Information" : "Informações rápidas"}
          </p>

          <Link to="/historia" className="btninfo">
            {isEnglish ? "History" : "História"}
          </Link>

          <Link to="/politica" className="btninfo">
            {isEnglish ? "Politics" : "Política"}
          </Link>

          <Link to="/cultura" className="btninfo">
            {isEnglish ? "Culture" : "Cultura"}
          </Link>

          <div className="container2">
            <button
              className="btninfo"
              onClick={() => setOpenConfig(true)}
            >
              {isEnglish ? "Edit" : "Editar"}
            </button>
          </div>
        </div>
      )}
      {openConfig && (
        <CriarPais
          pais={nome}
          english={isEnglish}
          onClose={() => setOpenConfig(false)}
        />
      )}
    </>
  );
}

export default Information;
