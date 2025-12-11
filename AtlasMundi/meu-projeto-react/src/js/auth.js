export async function login(email, password) {
  try {
    const resposta = await fetch("http://localhost:3000/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    });

    if (!resposta.ok) {
      const erro = await resposta.json();
      console.log("Erro:", erro.message);
      alert("Não foi possivel fazer o login.");
      return;
    }

    const data = await resposta.json();
    console.log("Usuário:", data.user);
    console.log("Token:", data.token);

    // salvando o token
    localStorage.setItem("token", data.token);
    console.log("Token salvo:", data.token);

    alert("Bem vindo "+ data.user.name + "!");

    return data;
  } catch (e) {
    console.log("Falha geral:", e);
  }
}



export async function register(data,senhas) {
  if(senhas[0]!=senhas[1]){return null}
  try {
    const resposta = await fetch("http://localhost:3000/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    const json = await resposta.json();

    if (!resposta.ok) {
      console.log("Erro:", json.message);
      alert("Não foi possivel registrar o usuario.");
      return null;
    }
    
    // salvando o token
    localStorage.setItem("token", data.token);
    console.log("Token salvo:", data.token);

    console.log("Usuário criado:", json.user);
    console.log("Token:", json.token);

    alert("Usuario registrado com sucesso.");

    return json;
  } catch (e) {
    console.log("Falha geral:", e);
    return null;
  }
}




