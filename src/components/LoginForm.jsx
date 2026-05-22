// src/components/LoginForm.jsx
import { useState } from "react";
import Field from "./Field";
import GoogleIcon from "./GoogleIcon";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const validate = () => {
    const e = {};
    if (!email) e.email = "E-mail obrigatório";
    else if (!/\S+@\S+\.\S+/.test(email)) e.email = "E-mail inválido";
    if (!password) e.password = "Senha obrigatória";
    else if (password.length < 6) e.password = "Mínimo 6 caracteres";
    return e;
  };

  const submit = async () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setErrors({});
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1400));
    setLoading(false);
    setSuccess(true);
  };

  return (
    <>
      <h1 className="auth-heading">Bem-vindo de volta</h1>
      <p className="auth-sub">Entre na sua conta para continuar</p>

      {success && <div className="success-box">✓ Login realizado com sucesso!</div>}

      <Field
        label="E-mail"
        type="email"
        placeholder="seu@email.com"
        value={email}
        onChange={(e) => { setEmail(e.target.value); setErrors((p) => ({ ...p, email: "" })); }}
        error={errors.email}
      />

      <Field
        label="Senha"
        type={showPass ? "text" : "password"}
        placeholder="••••••••"
        value={password}
        onChange={(e) => { setPassword(e.target.value); setErrors((p) => ({ ...p, password: "" })); }}
        error={errors.password}
        suffix={
          <span onClick={() => setShowPass((v) => !v)}>
            {showPass ? "🙈" : "👁"}
          </span>
        }
      />

      <div className="forgot-row">
        <button className="btn-ghost">Esqueceu a senha?</button>
      </div>

      <button
        className="btn-primary"
        onClick={submit}
        disabled={loading || success}
      >
        {loading ? "Entrando..." : success ? "✓ Entrou" : "Entrar"}
      </button>

      <div className="auth-divider">
        <div className="auth-divider-line" />
        ou
        <div className="auth-divider-line" />
      </div>

      <button className="btn-google">
        <GoogleIcon /> Continuar com Google
      </button>
    </>
  );
}

export default LoginForm;
