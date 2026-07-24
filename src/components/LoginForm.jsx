import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import do React Router
import { useAuth } from "../context/AuthContext"; // Import do seu Contexto

export default function LoginForm({ onToggle }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState(false);

  // Hooks para atualizar o estado global e navegar sem F5
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro("");

    const dadosLogin = {
      username: email, // O Django autentica usando o username
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

        // 1. Passa as informações recebidas para a função 'login' do seu AuthContext
        login({
          email: email,
          access: data.access,
          refresh: data.refresh,
        });

        // 2. Redireciona de forma suave (SPA) após 1.5s
        setTimeout(() => {
          navigate("/area-cliente");
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

      {sucesso && (
        <p style={{ color: "green" }}>
          Login realizado com sucesso! Redirecionando...
        </p>
      )}
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
        <button type="submit" className="btn-primary">
          ENTRAR
        </button>
      </form>
      <button className="btn-link" onClick={onToggle}>
        Não tem conta? Cadastre-se
      </button>
    </div>
  );
}
