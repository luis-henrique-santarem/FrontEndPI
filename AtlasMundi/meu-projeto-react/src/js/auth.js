import { mensagemOk } from "./../components/MensagemOK";
export async function login(email, password) {
  try {
    const resposta = await fetch("http://localhost:3000/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });

    const json = await resposta.json();

    if (!resposta.ok) {
      console.log("Erro:", json.message);
      mensagemOk("Não foi possível fazer o login.");
      return null;
    }
    localStorage.setItem("token", json.token);
    console.log("Token salvo:", json.token);

    mensagemOk("Bem-vindo " + json.user.name + "!");

    return json;
  } catch (e) {
    console.log("Falha geral:", e);
    mensagemOk("Erro ao tentar fazer login.");
    return null;
  }
}

export async function deslogar() {
    localStorage.removeItem("token")
}

export async function register(data, senhas) {

  if (senhas[0] !== senhas[1]) {
    mensagemOk("As senhas não coincidem.");
    return null;
  }

  try {
    const resposta = await fetch("http://localhost:3000/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const json = await resposta.json();

    if (!resposta.ok) {
      console.log("Erro:", json.message);
      mensagemOk("Não foi possível registrar o usuário.");
      return null;
    }

    console.log("Usuário criado:", json.user);

    mensagemOk("Usuário registrado com sucesso!");

    return json;
  } catch (e) {
    console.log("Falha geral:", e);
    mensagemOk("Erro ao tentar registrar.");
    return null;
  }
}
