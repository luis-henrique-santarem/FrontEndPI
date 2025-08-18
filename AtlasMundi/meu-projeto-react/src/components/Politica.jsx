import { Link } from "react-router-dom";
import './Politica.css'

export default function Politica() {
  return (
    <div className="politica-container">
      <div className="politica-content">
        <div className="politica-text">
          <h1>País Política</h1>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nulla
            doloribus repellat, nobis culpa distinctio quidem vitae nisi?
            Nesciunt molestias magni architecto natus aspernatur, cumque minus
            debitis impedit laborum saepe blanditiis.
          </p>
        </div>
      </div>
      <div className="politica-buttons">
        <Link to="/" className="btn">Início</Link>
        <Link to="/cultura" className="btn">Cultura</Link>
        <Link to="/historia" className="btn">História</Link>
        <Link to="/comentario" className="btn btn-special">Deixar Comentário</Link>
      </div>
    </div>
  );
}
