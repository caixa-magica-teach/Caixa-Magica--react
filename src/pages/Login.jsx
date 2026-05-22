// src/Login.jsx
import { useState } from "react";
import logo from "../assets/logo.png";
import fundo from "../assets/fundo.jpg";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";
import "./Login.css";

export default function AuthPage() {
  const [page, setPage] = useState("login");

  return (
    <div className="auth-page" style={{ backgroundImage: `url(${fundo})` }}>
      <div className="auth-card">
        {/* Logo */}
        <div className="auth-logo">
          <img src={logo} alt="Caixa Mágica" />
          <span>Caixa Mágica</span>
        </div>

        {/* Abas */}
        <div className="auth-tabs">
          {["login", "register"].map((p) => (
            <button
              key={p}
              className={`auth-tab ${page === p ? "active" : ""}`}
              onClick={() => setPage(p)}
            >
              {p === "login" ? "Entrar" : "Criar conta"}
            </button>
          ))}
        </div>

        {/* Formulário */}
        {page === "login" ? <LoginForm /> : <RegisterForm />}

        {/* Rodapé */}
        <div className="auth-footer">
          {page === "login" ? (
            <>
              <span>Não tem uma conta? </span>
              <button className="btn-link" onClick={() => setPage("register")}>
                Criar conta
              </button>
            </>
          ) : (
            <>
              <span>Já tem uma conta? </span>
              <button className="btn-link" onClick={() => setPage("login")}>
                Entrar
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
