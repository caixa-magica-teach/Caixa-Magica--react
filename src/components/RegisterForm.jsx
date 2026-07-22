import React, { useState } from "react";

export default function RegisterForm({ onToggle }) {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [enderecoPadrao, setEnderecoPadrao] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro("");

    const dadosCliente = {
      username: email,       // Usamos o e-mail como username para o Django
      email: email,
      password: senha,
      first_name: nome,      // Nome completo mapeado para o first_name do User
      telefone: telefone,
      endereco_padrao: enderecoPadrao,
    };

    try {
      const response = await fetch("http://127.0.0.1:8000/api/v1/clientes/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dadosCliente),
      });

      if (response.ok) {
        setSucesso(true);
        setTimeout(() => {
          onToggle(); // Retorna para a tela de login
        }, 2000);
      } else {
        const errorData = await response.json();
        console.log(errorData);
        setErro("Erro ao cadastrar. Verifique os campos e tente novamente.");
      }
    } catch (err) {
      setErro("Erro de conexão com o servidor.");
      console.error(err);
    }
  };

  return (
    <div className="auth-inner">
      <h2>Criar sua conta</h2>

      {sucesso && <p style={{ color: "green" }}>Cadastro realizado com sucesso! Redirecionando...</p>}
      {erro && <p style={{ color: "red" }}>{erro}</p>}

      <form onSubmit={handleSubmit}>
        <div className="field-wrap">
          <label>Nome Completo</label>
          <input
            type="text"
            placeholder="Seu nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </div>
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
          <label>Telefone (com DDD)</label>
          <input
            type="text"
            placeholder="(11) 98765-4321"
            value={telefone}
            onChange={(e) => setTelefone(e.target.value)}
            required
          />
        </div>
        <div className="field-wrap">
          <label>Endereço de Entrega</label>
          <input
            type="text"
            placeholder="Rua, número, bairro, cidade"
            value={enderecoPadrao}
            onChange={(e) => setEnderecoPadrao(e.target.value)}
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
        <button type="submit" className="btn-primary">CRIAR CONTA</button>
      </form>
      <button className="btn-link" onClick={onToggle}>Já tem conta? Entrar</button>
    </div>
  );
}