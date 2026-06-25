import React, { useState } from "react";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";
import "./Login.css";

export default function Login() {
  const [page, setPage] = useState("login");

  return (
    <div className="auth-page">
      {/* O auth-card fica AQUI, apenas uma vez */}
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