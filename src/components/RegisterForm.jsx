// src/components/RegisterForm.jsx
import { useState } from "react";
import Field from "./Field";
import GoogleIcon from "./GoogleIcon";

const strengthColors = ["#FF5B5B", "#FFB347", "#FFD700", "#3DDC97"];
const strengthLabels = ["Muito fraca", "Fraca", "Média", "Forte"];

function getStrength(pw) {
  if (!pw) return 0;
  let score = 0;
  if (pw.length >= 8) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  return score;
}

function RegisterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [showConf, setShowConf] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const strength = getStrength(password);

  const validate = () => {
    const e = {};
    if (!name.trim()) e.name = "Nome obrigatório";
    if (!email) e.email = "E-mail obrigatório";
    else if (!/\S+@\S+\.\S+/.test(email)) e.email = "E-mail inválido";
    if (!password) e.password = "Senha obrigatória";
    else if (password.length < 8) e.password = "Mínimo 8 caracteres";
    if (!confirm) e.confirm = "Confirme sua senha";
    else if (confirm !== password) e.confirm = "As senhas não coincidem";
    if (!agreed) e.agreed = "Aceite os termos para continuar";
    return e;
  };

  const submit = async () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setErrors({});
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1600));
    setLoading(false);
    setSuccess(true);
  };

  return (
    <>
      <h1 className="auth-heading">Criar conta</h1>
      <p className="auth-sub">Preencha os dados abaixo para começar</p>

      {success && <div className="success-box">✓ Conta criada com sucesso!</div>}

      <Field
        label="Nome completo"
        type="text"
        placeholder="Seu nome"
        value={name}
        onChange={(e) => { setName(e.target.value); setErrors((p) => ({ ...p, name: "" })); }}
        error={errors.name}
      />

      <Field
        label="E-mail"
        type="email"
        placeholder="seu@email.com"
        value={email}
        onChange={(e) => { setEmail(e.target.value); setErrors((p) => ({ ...p, email: "" })); }}
        error={errors.email}
      />

      {/* Campo de senha com barra de força */}
      <div>
        <label className="field-label">Senha</label>
        <div className="field-wrap">
          <input
            type={showPass ? "text" : "password"}
            placeholder="Mínimo 8 caracteres"
            value={password}
            onChange={(e) => { setPassword(e.target.value); setErrors((p) => ({ ...p, password: "" })); }}
            className={`field-input ${errors.password ? "has-error" : password ? "has-value" : ""}`}
            style={{ paddingRight: "38px" }}
          />
          <span className="field-eye" onClick={() => setShowPass((v) => !v)}>
            {showPass ? "🙈" : "👁"}
          </span>
        </div>
        {errors.password && <div className="field-error">{errors.password}</div>}

        {password && (
          <>
            <div className="strength-bar">
              {[0, 1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="strength-seg"
                  style={{ background: i < strength ? strengthColors[strength - 1] : undefined }}
                />
              ))}
            </div>
            <div className="strength-label">{strengthLabels[strength - 1] || ""}</div>
          </>
        )}
      </div>

      <Field
        label="Confirmar senha"
        type={showConf ? "text" : "password"}
        placeholder="Repita a senha"
        value={confirm}
        onChange={(e) => { setConfirm(e.target.value); setErrors((p) => ({ ...p, confirm: "" })); }}
        error={errors.confirm}
        suffix={
          <span onClick={() => setShowConf((v) => !v)}>
            {showConf ? "🙈" : "👁"}
          </span>
        }
      />

      {/* Termos */}
      <div
        className="terms-row"
        onClick={() => { setAgreed((v) => !v); setErrors((p) => ({ ...p, agreed: "" })); }}
      >
        <div className={`terms-checkbox ${agreed ? "checked" : ""} ${errors.agreed ? "error" : ""}`}>
          {agreed && <span style={{ color: "#fff", fontSize: "11px", lineHeight: 1 }}>✓</span>}
        </div>
        <span className="terms-text">
          Concordo com os{" "}
          <span className="terms-link" onClick={(e) => e.stopPropagation()}>Termos de Uso</span>
          {" "}e a{" "}
          <span className="terms-link" onClick={(e) => e.stopPropagation()}>Política de Privacidade</span>
        </span>
      </div>
      {errors.agreed && (
        <div className="field-error" style={{ marginTop: "-6px" }}>{errors.agreed}</div>
      )}

      <button
        className="btn-primary"
        onClick={submit}
        disabled={loading || success}
      >
        {loading ? "Criando conta..." : success ? "✓ Conta criada" : "Criar conta"}
      </button>

      <div className="auth-divider">
        <div className="auth-divider-line" />
        ou
        <div className="auth-divider-line" />
      </div>

      <button className="btn-google">
        <GoogleIcon /> Cadastrar com Google
      </button>
    </>
  );
}

export default RegisterForm;
