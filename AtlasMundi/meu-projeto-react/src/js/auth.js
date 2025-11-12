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
      return;
    }

    const data = await resposta.json();
    console.log("Usuário:", data.user);
    console.log("Token:", data.token);

    // salvando o token
    localStorage.setItem("token", data.token);
    console.log("Token salvo:", data.token);

    return data;
  } catch (e) {
    console.log("Falha geral:", e);
  }
}



export async function register(data) {
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
      return null;
    }
    
    // salvando o token
    localStorage.setItem("token", data.token);
    console.log("Token salvo:", data.token);

    console.log("Usuário criado:", json.user);
    console.log("Token:", json.token);

    return json;
  } catch (e) {
    console.log("Falha geral:", e);
    return null;
  }
}




