import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // Importa o seu contexto
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";
import "./Login.css";

export default function Login() {
  const [page, setPage] = useState("login");
  const { logado } = useAuth(); // Pega a confirmação de login da "Caixa Mágica"
  const navigate = useNavigate();

  // Se o usuário já estiver logado, redireciona para a tela inicial
  useEffect(() => {
    if (logado) {
      navigate("/dashboard"); // Ajuste para a sua rota interna
    }
  }, [logado, navigate]);

  return (
    <div className="auth-page">
      <div className="auth-card">
        {page === "login" ? (
          <LoginForm onToggle={() => setPage("register")} />
        ) : (
          <RegisterForm onToggle={() => setPage("login")} />
        )}
      </div>
    </div>
  );
}
