import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";
import "./Login.css";

export default function Login() {
  const [page, setPage] = useState("login");
  const { logado } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (logado) {
      navigate("/dashboard");
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
