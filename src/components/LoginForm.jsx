import React, { useState } from "react";

export default function LoginForm({ onToggle }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro("");

    const dadosLogin = {
      username: email, // O Django autentica usando o username (que salvamos como e-mail)
      password: senha,
    };

    try {
      const response = await fetch("http://127.0.0.1:8000/api/v1/token/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dadosLogin),
      });

      if (response.ok) {
        const data = await response.json();
        setSucesso(true);

        // Salvando o token JWT no localStorage para autenticar as próximas requisições
        localStorage.setItem("access_token", data.access);
        localStorage.setItem("refresh_token", data.refresh);

        setTimeout(() => {
          window.location.href = "/";
        }, 1500);
      } else {
        const errorData = await response.json();
        setErro("E-mail ou senha inválidos. Tente novamente.");
        console.log(errorData);
      }
    } catch (err) {
      setErro("Erro de conexão com o servidor.");
      console.error(err);
    }
  };

  return (
    <div className="auth-inner">
      <h2>Bem-vindo de volta!</h2>

      {sucesso && <p style={{ color: "green" }}>Login realizado com sucesso! Redirecionando...</p>}
      {erro && <p style={{ color: "red" }}>{erro}</p>}

      <form onSubmit={handleSubmit}>
        <div className="field-wrap">
          <label>E-mail</label>
          <input
            type="email"
            placeholder="seu@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="field-wrap">
          <label>Senha</label>
          <input
            type="password"
            placeholder="••••••••"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn-primary">ENTRAR</button>
      </form>
      <button className="btn-link" onClick={onToggle}>Não tem conta? Cadastre-se</button>
    </div>
  );
}