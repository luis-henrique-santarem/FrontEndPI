import React, { useState } from "react";
import "./Splash.css";
import galaxy from "../assets/galaxy.jpg";
import earth from "../assets/earth.png";

const Splash = ({ onFinish }) => {
  const [closing, setClosing] = useState(false);

  const handleClose = () => {
    if (closing) return;
    setClosing(true);
    setTimeout(() => onFinish && onFinish(), 1000);
  };

  return (
    <div
      className={`splash ${closing ? "splash--closing" : ""}`}
      onClick={handleClose}
      role="button"
      tabIndex={0}
      aria-label="Entrar no site"
    >
      <div
        className="splash__bg"
        style={{ backgroundImage: `url(${galaxy})` }}
      />
      <img src={earth} alt="Terra" className="splash__earth" />
      <div className="splash__overlay" />
      <div className="splash__content">
        <div className="splash__frame">
          <h1 className="splash__title">ATLAS</h1>
          <div className="splash__subtitle">MUNDI</div>
        </div>
        <div className="splash__cta">Clique para explorar</div>
      </div>
    </div>
  );
};

export default Splash;
