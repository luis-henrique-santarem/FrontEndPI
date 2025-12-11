export async function atualizarUsuario(name, email, password, cpf, token) {
  try {
    const resposta = await fetch("http://localhost:3000/users/me", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        name : name,
        email: email,
        password: password,
        cpf: cpf
      })
    });

    if (!resposta.ok) {
      const erro = await resposta.json();
      console.log("Erro:", erro.message);
      alert("Não foi possivel atualizar o usuario");
      return;
    }

    alert("Usuario atualizado com sucesso");

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
      console.log("Erro:", erro.message);
      alert("Não foi possivel deletar o usuario");
      return;
    }

    alert("Usuario deletado com sucesso");

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
      return;
    }
    return data;
  } catch (e) {
    console.log("Falha geral:", e);
  }
}