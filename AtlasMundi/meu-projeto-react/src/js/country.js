import { mensagemOk } from "./../components/MensagemOK";

export async function pegarPais(name, inEnglish) {
  console.log("nome: "+name+"ininglish: "+inEnglish)
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
      mensagemOk("erro")
      return;
    }

    
    const pais = await resposta.json();
    console.log("RECEBIDO:", pais);
    // assessar como um objeto normal ex: pais.name

    return pais;
  } catch (e) {
    console.log("Falha geral:", e);
  }
}

export async function RegistrarPais(name, quickInfo, politics, politics2, history, history2, culture, culture2, inEnglish, sources, token) {
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
        politics: politics,
        politics2: politics2,
        history: history,
        history2: history2,
        culture: culture,
        culture2: culture2,
        inEnglish: inEnglish,
        sources: sources
      })
    });

    if (!resposta.ok) {
      const erro = await resposta.json();
      console.log("Erro:", erro.message);
      mensagemOk("Erro ao registrar pais.");
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
      mensagemOk("Erro ao deletar pais.");
      return;
    }

    mensagemOk("País deletado com sucesso.")
  } catch (e) {
    console.log("Falha geral:", e);
  }
}

export async function AtualizarPais(name, quickInfo, politics, politics2, history, history2, culture, culture2, inEnglish, sources, token) {
  try {
    const body = {};

    if (name !== "") body.name = name;
    if (quickInfo !== "") body.quickInfo = quickInfo;
    if (politics !== "") body.politics = politics;
    if (politics2 !== "") body.politics2 = politics2;
    if (history !== "") body.history = history;
    if (history2 !== "") body.history2 = history2;
    if (culture !== "") body.culture = culture;
    if (culture2 !== "") body.culture2 = culture2;
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
      mensagemOk("Erro ao atualizar pais.");
      return;
    }

    mensagemOk("País atualizado com sucesso.")
  } catch (e) {
    console.log("Falha geral:", e);
  }
}