import { Link } from "react-router-dom";
import "./Comentarios.css";

export default function Comentarios({pais}) {
  const comentarios = [
    { nome: "Usuário 1", texto: "Esse post ficou muito bom! Continue assim.", data: "10/12/2025" },
    { nome: "Maria", texto: "Adorei o conteúdo, super interessante.", data: "10/12/2025" },
    { nome: "Carlos", texto: "Explicação clara e objetiva. Parabéns!", data: "09/12/2025" },
    { nome: "João", texto: "Muito bom mesmo, bem explicado!", data: "08/12/2025" },
    { nome: "Ana", texto: "Esse site está ficando incrível!", data: "07/12/2025" },
    { nome: "Luis", texto: "Esse site está ficando muito mediano!", data: "07/12/2025" },
    { nome: "Heloisa", texto: " Pão!", data: "07/12/2025" },
  ];

  return (
    <div className="comments-page">
        
      <Link to="/cultura" className="back-button">← Voltar</Link>

      <h2 className="comments-title">Comentários</h2>

      <div className="comments-box">
        {comentarios.map((c, index) => (
          <div className="comment-item" key={index}>
            <div className="comment-left">
              <span className="comment-author">{c.nome}</span>
              <p className="comment-text">{c.texto}</p>
            </div>
            <span className="comment-date">{c.data}</span>
          </div>
        ))}
      </div>

    </div>
  );
}
