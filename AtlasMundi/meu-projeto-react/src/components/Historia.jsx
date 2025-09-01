import { Link } from "react-router-dom";
import "./Historia.css";

export default function Historia() {
  return (
    <div className="historia-container">
      <div className="historia-content">
        <div className="historia-text">
          <h1>País História</h1>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nulla
            doloribus repellat, nobis culpa distinctio quidem vitae nisi?
            Nesciunt molestias magni architecto natus aspernatur, cumque minus
            debitis impedit laborum saepe blanditiis.
          </p>
        </div>
      </div>
      <div className="historia-buttons">
        <Link to="/" className="btn">Início</Link>
        <Link to="/politica" className="btn">Política</Link>
        <Link to="/cultura" className="btn">Cultura</Link>
        <Link to="/comentario" className="btn btn-special">Deixar Comentário</Link>
      </div>
    </div>
  );
}
