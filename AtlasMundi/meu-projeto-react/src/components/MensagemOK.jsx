import React from "react";
import { createRoot } from "react-dom/client";

export function mensagemOk(mensagem) {
  const container = document.createElement("div");
  document.body.appendChild(container);

  const root = createRoot(container);

  function fechar() {
    container.classList.add("sumir");
    setTimeout(() => {
      root.unmount();
      container.remove();
    }, 300);
  }

  root.render(
    <div className="msg-top">
      <span className="msg-texto">{mensagem}</span>
      <button className="msg-botao" onClick={fechar}>
        OK
      </button>
    </div>
  );

  // estilos injetados direto pelo JS
  const style = document.createElement("style");
  style.innerHTML = `
    .msg-top {
      position: fixed;
      top: 20px;
      left: 50%;
      transform: translateX(-50%);
      background: linear-gradient(135deg, #1976d2, #42a5f5);
      color: #fff;
      padding: 14px 20px;
      border-radius: 12px;
      display: flex;
      align-items: center;
      gap: 16px;
      box-shadow: 0 8px 20px rgba(0,0,0,0.25);
      font-family: system-ui, Arial, sans-serif;
      font-size: 15px;
      animation: descer 0.4s ease;
      z-index: 9999;
    }

    .msg-texto {
      flex: 1;
      white-space: nowrap;
    }

    .msg-botao {
      background: rgba(255,255,255,0.2);
      border: none;
      color: #fff;
      padding: 6px 14px;
      border-radius: 8px;
      cursor: pointer;
      font-weight: 600;
      transition: background 0.2s;
    }

    .msg-botao:hover {
      background: rgba(255,255,255,0.35);
    }

    .sumir {
      animation: subir 0.3s ease forwards;
    }

    @keyframes descer {
      from {
        opacity: 0;
        transform: translate(-50%, -20px);
      }
      to {
        opacity: 1;
        transform: translate(-50%, 0);
      }
    }

    @keyframes subir {
      to {
        opacity: 0;
        transform: translate(-50%, -20px);
      }
    }
  `;

  document.head.appendChild(style);
}
