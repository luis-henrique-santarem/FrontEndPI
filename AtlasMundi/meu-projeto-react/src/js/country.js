import { mensagemOk } from "./../components/MensagemOK";

export async function pegarPais(name, inEnglish) {
  try {
    const resposta = await fetch("http://localhost:3000/country/", {
      method: "PUT",
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
      mensagemOk(`Erro: ${erro.message}`)
      return;
    }

    
    const pais = await resposta.json();
    // assessar como um objeto normal ex: pais.name

    return pais;
  } catch (e) {
    console.log("Falha geral:", e);
  }
}


export async function RegistrarPais(name, quickInfo, url, politics, history, culture, inEnglish, sources, token) {
  try {
    const resposta = await fetch("http://localhost:3000/country/me", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        name: name,
        quickInfo: quickInfo,
        pictureUrl:url,
        politics: politics,
        history: history,
        culture: culture,
        inEnglish: inEnglish,
        sources: sources
      })
    });

    if (!resposta.ok) {
      const erro = await resposta.json();
      console.log("Erro:", erro.message);
      mensagemOk(`Erro: ${erro.message}`)
      return;
    }

    mensagemOk("País registrado com sucesso.")
  } catch (e) {
    console.log("Falha geral:", e);
  }
}


export async function DeletarPais(name, token) {
  try {
    const resposta = await fetch("http://localhost:3000/country/me", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        name: name
      })
    });

    if (!resposta.ok) {
      const erro = await resposta.json();
      console.log("Erro:", erro.message);
      mensagemOk(`Erro: ${erro.message}`)
      return;
    }

    mensagemOk("País deletado com sucesso.")
  } catch (e) {
    console.log("Falha geral:", e);
  }
}

export async function AtualizarPais(name, url, politics, history, culture, inEnglish, sources, token) {
  try {
    const body = {};

    if (name !== "") body.name = name;
    if (url !== "") body.pictureUrl = url;
    if (politics !== "") body.politics = politics;
    if (history !== "") body.history = history;
    if (culture !== "") body.culture = culture;
    if (inEnglish !== "") body.inEnglish = inEnglish;
    if (sources !== "") body.sources = sources;

    const resposta = await fetch("http://localhost:3000/country/me", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(body)
    });

    if (!resposta.ok) {
      const erro = await resposta.json();
      console.log("Erro:", erro.message);
      mensagemOk(`Erro: ${erro.message}`)
      return;
    }

    mensagemOk("País atualizado com sucesso.")
  } catch (e) {
    console.log("Falha geral:", e);
  }
}