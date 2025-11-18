export async function pegarPais(name, inEnglish) {
  try {
    const resposta = await fetch("http://localhost:3000/country/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: name,
        inEnglish: inEnglish
      })
    });

    if (!resposta.ok) {
      const erro = await resposta.json();
      console.log("Erro:", erro.message);
      return;
    }

    const pais = await resposta.json();
    // assessar como um objeto normal ex: pais.name


    return pais;
  } catch (e) {
    console.log("Falha geral:", e);
  }
}