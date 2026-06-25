import React from "react";

export default function LoginForm({ onToggle }) {
  return (
    <div className="auth-inner">
      <h2>Bem-vindo de volta!</h2>
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="field-wrap">
          <label>E-mail</label>
          <input type="email" placeholder="seu@email.com" />
        </div>
        <div className="field-wrap">
          <label>Senha</label>
          <input type="password" placeholder="••••••••" />
        </div>
        <button type="submit" className="btn-primary">ENTRAR</button>
      </form>
      <button className="btn-link" onClick={onToggle}>Não tem conta? Cadastre-se</button>
    </div>
  );
}