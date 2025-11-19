export async function pegarPais(name, inEnglish) {
  console.log("nome: "+name.pais+"ininglish: "+inEnglish)
  try {
    const resposta = await fetch("http://localhost:3000/country/", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: name.pais,
        inEnglish: inEnglish
      })
    });

    if (!resposta.ok) {
      const erro = await resposta.json();
      console.log("Erro:", erro.message);
      return;
    }

    const text = await resposta.text();
    console.log("RECEBIDO:", text);
    const pais = await resposta.json();
    // assessar como um objeto normal ex: pais.name

    return pais;
  } catch (e) {
    console.log("Falha geral:", e);
  }
}
