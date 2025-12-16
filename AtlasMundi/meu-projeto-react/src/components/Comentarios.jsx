import { Link } from "react-router-dom";
import { getComment } from "../js/comment";
import { pegarPais } from "../js/country";
import { useEffect, useState } from "react";
import "./Comentarios.css";

export default function Comentarios({ pais }) {
  const [comentarios, setCommentarios] = useState([]);

  useEffect(() => {
    async function carregarComentarios() {
      const paisPego = await pegarPais(pais, false);
      const paisId = paisPego.id;

      const comentariosAPI = await getComment(paisId);

      setCommentarios(
        comentariosAPI.map(c => ({
          texto: c.message,
          data: new Date(c.createdAt).toLocaleDateString("pt-BR")
        }))
      );
    }

    carregarComentarios();
  }, [pais]);

  return (
    <div className="comments-page">
      <Link to="/cultura" className="back-button">← Voltar</Link>

      <h2 className="comments-title">Comentários</h2>

      <div className="comments-box">
        {comentarios.map((c, index) => (
          <div
            key={index}
            className={`comment-item ${index % 2 === 0 ? "left" : "right"}`}
          >
            <p className="comment-text">{c.texto}</p>
            <span className="comment-date">{c.data}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
