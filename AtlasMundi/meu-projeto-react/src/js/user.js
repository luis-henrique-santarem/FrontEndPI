import { mensagemOk } from "./../components/MensagemOK";
export async function atualizarUsuario(name, email, password, cpf, token) {
  try {
    // monta o objeto base
    const body = {};

    if (name !== "") body.name = name;
    if (email !== "") body.email = email;
    if (password !== "") body.password = password;
    if (cpf !== "") body.cpf = cpf;

    // se não tiver nada pra atualizar, nem manda request
    if (Object.keys(body).length === 0) {
      mensagemOk("Nenhum campo para atualizar");
      return;
    }

    const resposta = await fetch("http://localhost:3000/users/me", {
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

    const data = await resposta.json();
    mensagemOk("Usuario atualizado com sucesso");
    return data;

  } catch (e) {
    console.log("Falha geral:", e);
  }
}


export async function deletarUsuario(token) {
  try {
    const resposta = await fetch("http://localhost:3000/users/me", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    });

    if (!resposta.ok) {
      const erro = await resposta.json();
      mensagemOk(`Erro: ${erro.message}`)
      return;
    }

    mensagemOk("Usuario deletado com sucesso");

    return data;
  } catch (e) {
    console.log("Falha geral:", e);
  }
}

export async function getarUsuario(token) {
  try {
    const resposta = await fetch("http://localhost:3000/users/me", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    });

    if (!resposta.ok) {
      const erro = await resposta.json();
      console.log("Erro:", erro.message);
      mensagemOk(`Erro: ${erro.message}`)
      return;
    }
    return data;
  } catch (e) {
    console.log("Falha geral:", e);
  }
}

export async function Deslogar() {
  localStorage.setItem("token", "");
}