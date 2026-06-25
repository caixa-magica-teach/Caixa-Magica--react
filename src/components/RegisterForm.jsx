import React from "react";

export default function RegisterForm({ onToggle }) {
  return (
    <div className="auth-inner">
      <h2>Criar sua conta</h2>
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="field-wrap">
          <label>Nome Completo</label>
          <input type="text" placeholder="Seu nome" />
        </div>
        <div className="field-wrap">
          <label>E-mail</label>
          <input type="email" placeholder="seu@email.com" />
        </div>
        <div className="field-wrap">
          <label>Senha</label>
          <input type="password" placeholder="••••••••" />
        </div>
        <button type="submit" className="btn-primary">CRIAR CONTA</button>
      </form>
      <button className="btn-link" onClick={onToggle}>Já tem conta? Entrar</button>
    </div>
  );
}