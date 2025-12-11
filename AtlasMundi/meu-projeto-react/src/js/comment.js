export async function createComment(countryId, message, isQuestion, token) {
  try {
    const resposta = await fetch("http://localhost:3000/comment/me", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        countryId,
        message,
        isQuestion,
      })
    });

    if (!resposta.ok) {
      const erro = await resposta.json().catch(() => ({}));
      console.log("Erro:", erro.message || resposta.statusText);
      return;
    }

    alert("Comentario recebido.");

    return await resposta.json();
  } catch (e) {
    console.log("Falha geral:", e);
  }
}

// funcao que vai retornar o objeto com todos os comentarios
export async function getComment(countryId, message, isQuestion, token) {
  try {
    const resposta = await fetch("http://localhost:3000/comment/country", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        countryId,
        message,
        isQuestion,
      })
    });

    if (!resposta.ok) {
      const erro = await resposta.json().catch(() => ({}));
      console.log("Erro:", erro.message || resposta.statusText);
      return;
    }

    alert("Comentario recebido.");

    return await resposta.json();
  } catch (e) {
    console.log("Falha geral:", e);
  }
}

