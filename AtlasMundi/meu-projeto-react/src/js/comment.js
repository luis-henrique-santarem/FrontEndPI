export async function createComment(countryId, message, isQuestion) {
  try {
    const resposta = await fetch("http://localhost:3000/comment/me", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        countryId: countryId,
        message: message,
        isQuestion: isQuestion
      })
    });

    if (!resposta.ok) {
      const erro = await resposta.json();
      console.log("Erro:", erro.message);
      return;
    }

    // provavelmente nao vai ser usado, nem sei o que retorna.
    const data = await resposta.json();

    return data;
  } catch (e) {
    console.log("Falha geral:", e);
  }
}