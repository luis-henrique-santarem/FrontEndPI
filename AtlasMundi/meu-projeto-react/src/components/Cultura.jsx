import { Link } from "react-router-dom";
import './Cultura.css'

export default function Cultura() {
  return (
    <div className="cultura-container">
      <div className="cultura-content">
        <div className="cultura-text">
          <h1>País Cultura</h1>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nulla
            doloribus repellat, nobis culpa distinctio quidem vitae nisi?
            Nesciunt molestias magni architecto natus aspernatur, cumque minus
            debitis impedit laborum saepe blanditiis.
          </p>
        </div>
      </div>
      <div className="cultura-buttons">
        <Link to="/" className="btn">Início</Link>
        <Link to="/politica" className="btn">Política</Link>
        <Link to="/historia" className="btn">História</Link>
        <Link to="/comentario" className="btn btn-special">Deixar Comentário</Link>
      </div>
    </div>
  );
}
