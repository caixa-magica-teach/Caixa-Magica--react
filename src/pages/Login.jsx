import { useState } from "react";
import logo from "../assets/logo.jpg";

const C = {
  bg: "#0F0F11",
  card: "#18181C",
  border: "#2A2A30",
  accent: "#6C63FF",
  accentHover: "#7C74FF",
  text: "#F0EFF6",
  muted: "#8B8A96",
  input: "#1E1E24",
  inputBorder: "#35353E",
  error: "#FF5B5B",
  success: "#3DDC97",
};

const s = {
  page: {
    minHeight: "100vh",
    background: C.bg,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
    padding: "1rem",
  },
  card: {
    background: C.card,
    border: `1px solid ${C.border}`,
    borderRadius: "20px",
    padding: "2.5rem 2rem",
    width: "100%",
    maxWidth: "400px",
    boxSizing: "border-box",
  },
  logo: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "2rem",
  },
  logoImg: {
    width: "40px",
    height: "40px",
    borderRadius: "10px",
    objectFit: "cover",
    flexShrink: 0,
  },
  logoText: {
    fontSize: "17px",
    fontWeight: "700",
    color: C.text,
    letterSpacing: "-0.3px",
  },
  tabs: {
    display: "flex",
    background: C.input,
    borderRadius: "12px",
    padding: "4px",
    marginBottom: "1.75rem",
  },
  tab: {
    flex: 1,
    padding: "9px",
    border: "none",
    borderRadius: "9px",
    fontSize: "14px",
    fontWeight: "500",
    cursor: "pointer",
    transition: "all 0.2s",
  },
  heading: {
    fontSize: "22px",
    fontWeight: "700",
    color: C.text,
    margin: "0 0 5px",
    letterSpacing: "-0.5px",
  },
  sub: { fontSize: "13px", color: C.muted, margin: "0 0 1.5rem" },
  label: {
    display: "block",
    fontSize: "13px",
    fontWeight: "500",
    color: C.muted,
    marginBottom: "6px",
  },
  inputWrap: { position: "relative", marginBottom: "0.85rem" },
  input: {
    width: "100%",
    background: C.input,
    border: `1px solid ${C.inputBorder}`,
    borderRadius: "10px",
    padding: "11px 14px",
    fontSize: "14px",
    color: C.text,
    outline: "none",
    boxSizing: "border-box",
    transition: "border-color 0.2s",
  },
  eye: {
    position: "absolute",
    right: "12px",
    top: "50%",
    transform: "translateY(-50%)",
    color: C.muted,
    cursor: "pointer",
    fontSize: "15px",
    userSelect: "none",
  },
  forgotRow: {
    display: "flex",
    justifyContent: "flex-end",
    marginTop: "-2px",
    marginBottom: "1.25rem",
  },
  ghost: {
    fontSize: "13px",
    color: C.accent,
    background: "none",
    border: "none",
    padding: 0,
    cursor: "pointer",
  },
  btn: {
    width: "100%",
    background: C.accent,
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    padding: "12px",
    fontSize: "15px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "background 0.2s, transform 0.15s",
    letterSpacing: "0.2px",
    marginTop: "0.25rem",
  },
  divider: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    margin: "1.25rem 0",
    color: C.muted,
    fontSize: "12px",
  },
  divLine: { flex: 1, height: "1px", background: C.border },
  googleBtn: {
    width: "100%",
    background: "transparent",
    color: C.text,
    border: `1px solid ${C.border}`,
    borderRadius: "10px",
    padding: "11px",
    fontSize: "14px",
    fontWeight: "500",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
    transition: "border-color 0.2s, background 0.2s",
  },
  footer: {
    textAlign: "center",
    marginTop: "1.25rem",
    fontSize: "13px",
    color: C.muted,
  },
  link: {
    color: C.accent,
    fontWeight: "500",
    cursor: "pointer",
    background: "none",
    border: "none",
    padding: 0,
    fontSize: "13px",
  },
  err: {
    fontSize: "12px",
    color: C.error,
    marginBottom: "6px",
    marginTop: "-4px",
  },
  successBox: {
    background: "rgba(61,220,151,0.1)",
    border: "1px solid rgba(61,220,151,0.3)",
    borderRadius: "10px",
    padding: "10px 14px",
    fontSize: "13px",
    color: C.success,
    marginBottom: "1rem",
    textAlign: "center",
  },
  strengthBar: {
    display: "flex",
    gap: "4px",
    marginTop: "6px",
    marginBottom: "0.85rem",
  },
  strengthSeg: {
    flex: 1,
    height: "3px",
    borderRadius: "99px",
    transition: "background 0.3s",
  },
  strengthLabel: {
    fontSize: "11px",
    color: C.muted,
    marginTop: "2px",
    marginBottom: "0.5rem",
  },
  terms: {
    display: "flex",
    alignItems: "flex-start",
    gap: "9px",
    marginBottom: "1rem",
    cursor: "pointer",
  },
  checkbox: {
    width: "16px",
    height: "16px",
    borderRadius: "4px",
    border: `1.5px solid ${C.inputBorder}`,
    background: C.input,
    flexShrink: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "1px",
    transition: "all 0.15s",
  },
};

const GoogleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <path
      d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.875 2.684-6.615z"
      fill="#4285F4"
    />
    <path
      d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 009 18z"
      fill="#34A853"
    />
    <path
      d="M3.964 10.71A5.41 5.41 0 013.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 000 9c0 1.452.348 2.827.957 4.042l3.007-2.332z"
      fill="#FBBC05"
    />
    <path
      d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 00.957 4.958L3.964 6.29C4.672 4.163 6.656 3.58 9 3.58z"
      fill="#EA4335"
    />
  </svg>
);

function getStrength(pw) {
  if (!pw) return 0;
  let score = 0;
  if (pw.length >= 8) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  return score;
}

const strengthColors = ["#FF5B5B", "#FFB347", "#FFD700", "#3DDC97"];
const strengthLabels = ["Muito fraca", "Fraca", "Média", "Forte"];

function Field({ label, type, placeholder, value, onChange, error, suffix }) {
  return (
    <div>
      <label style={s.label}>{label}</label>
      <div style={s.inputWrap}>
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          style={{
            ...s.input,
            borderColor: error ? C.error : value ? C.accent : C.inputBorder,
            paddingRight: suffix ? "38px" : "14px",
          }}
        />
        {suffix && <span style={s.eye}>{suffix}</span>}
      </div>
      {error && <div style={s.err}>{error}</div>}
    </div>
  );
}

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [hov, setHov] = useState(null);

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
    if (Object.keys(e).length) {
      setErrors(e);
      return;
    }
    setErrors({});
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1400));
    setLoading(false);
    setSuccess(true);
  };

  return (
    <>
      <h1 style={s.heading}>Bem-vindo de volta</h1>
      <p style={s.sub}>Entre na sua conta para continuar</p>
      {success && (
        <div style={s.successBox}>✓ Login realizado com sucesso!</div>
      )}
      <Field
        label="E-mail"
        type="email"
        placeholder="seu@email.com"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          setErrors((p) => ({ ...p, email: "" }));
        }}
        error={errors.email}
      />
      <Field
        label="Senha"
        type={showPass ? "text" : "password"}
        placeholder="••••••••"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
          setErrors((p) => ({ ...p, password: "" }));
        }}
        error={errors.password}
        suffix={
          <span onClick={() => setShowPass((v) => !v)}>
            {showPass ? "🙈" : "👁"}
          </span>
        }
      />
      <div style={s.forgotRow}>
        <button style={s.ghost}>Esqueceu a senha?</button>
      </div>
      <button
        onClick={submit}
        disabled={loading || success}
        onMouseEnter={() => setHov("main")}
        onMouseLeave={() => setHov(null)}
        style={{
          ...s.btn,
          background: hov === "main" ? C.accentHover : C.accent,
          opacity: loading || success ? 0.8 : 1,
          transform: hov === "main" ? "translateY(-1px)" : "none",
        }}
      >
        {loading ? "Entrando..." : success ? "✓ Entrou" : "Entrar"}
      </button>
      <div style={s.divider}>
        <div style={s.divLine} />
        ou
        <div style={s.divLine} />
      </div>
      <button
        onMouseEnter={() => setHov("g")}
        onMouseLeave={() => setHov(null)}
        style={{
          ...s.googleBtn,
          borderColor: hov === "g" ? C.muted : C.border,
          background: hov === "g" ? "rgba(255,255,255,0.03)" : "transparent",
        }}
      >
        <GoogleIcon /> Continuar com Google
      </button>
    </>
  );
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
  const [hov, setHov] = useState(null);

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
    if (Object.keys(e).length) {
      setErrors(e);
      return;
    }
    setErrors({});
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1600));
    setLoading(false);
    setSuccess(true);
  };

  return (
    <>
      <h1 style={s.heading}>Criar conta</h1>
      <p style={s.sub}>Preencha os dados abaixo para começar</p>
      {success && <div style={s.successBox}>✓ Conta criada com sucesso!</div>}
      <Field
        label="Nome completo"
        type="text"
        placeholder="Seu nome"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
          setErrors((p) => ({ ...p, name: "" }));
        }}
        error={errors.name}
      />
      <Field
        label="E-mail"
        type="email"
        placeholder="seu@email.com"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          setErrors((p) => ({ ...p, email: "" }));
        }}
        error={errors.email}
      />
      <div>
        <label style={s.label}>Senha</label>
        <div style={s.inputWrap}>
          <input
            type={showPass ? "text" : "password"}
            placeholder="Mínimo 8 caracteres"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setErrors((p) => ({ ...p, password: "" }));
            }}
            style={{
              ...s.input,
              borderColor: errors.password
                ? C.error
                : password
                  ? C.accent
                  : C.inputBorder,
              paddingRight: "38px",
              marginBottom: 0,
            }}
          />
          <span style={s.eye} onClick={() => setShowPass((v) => !v)}>
            {showPass ? "🙈" : "👁"}
          </span>
        </div>
        {errors.password && <div style={s.err}>{errors.password}</div>}
        {password && (
          <>
            <div style={s.strengthBar}>
              {[0, 1, 2, 3].map((i) => (
                <div
                  key={i}
                  style={{
                    ...s.strengthSeg,
                    background:
                      i < strength ? strengthColors[strength - 1] : C.border,
                  }}
                />
              ))}
            </div>
            <div style={s.strengthLabel}>
              {strengthLabels[strength - 1] || ""}
            </div>
          </>
        )}
      </div>
      <Field
        label="Confirmar senha"
        type={showConf ? "text" : "password"}
        placeholder="Repita a senha"
        value={confirm}
        onChange={(e) => {
          setConfirm(e.target.value);
          setErrors((p) => ({ ...p, confirm: "" }));
        }}
        error={errors.confirm}
        suffix={
          <span onClick={() => setShowConf((v) => !v)}>
            {showConf ? "🙈" : "👁"}
          </span>
        }
      />
      <div
        style={s.terms}
        onClick={() => {
          setAgreed((v) => !v);
          setErrors((p) => ({ ...p, agreed: "" }));
        }}
      >
        <div
          style={{
            ...s.checkbox,
            background: agreed ? C.accent : C.input,
            borderColor: errors.agreed
              ? C.error
              : agreed
                ? C.accent
                : C.inputBorder,
          }}
        >
          {agreed && (
            <span style={{ color: "#fff", fontSize: "11px", lineHeight: 1 }}>
              ✓
            </span>
          )}
        </div>
        <span style={{ fontSize: "13px", color: C.muted, lineHeight: "1.5" }}>
          Concordo com os{" "}
          <span
            style={{ color: C.accent }}
            onClick={(e) => e.stopPropagation()}
          >
            Termos de Uso
          </span>{" "}
          e a{" "}
          <span
            style={{ color: C.accent }}
            onClick={(e) => e.stopPropagation()}
          >
            Política de Privacidade
          </span>
        </span>
      </div>
      {errors.agreed && (
        <div style={{ ...s.err, marginTop: "-6px" }}>{errors.agreed}</div>
      )}
      <button
        onClick={submit}
        disabled={loading || success}
        onMouseEnter={() => setHov("main")}
        onMouseLeave={() => setHov(null)}
        style={{
          ...s.btn,
          background: hov === "main" ? C.accentHover : C.accent,
          opacity: loading || success ? 0.8 : 1,
          transform: hov === "main" ? "translateY(-1px)" : "none",
        }}
      >
        {loading
          ? "Criando conta..."
          : success
            ? "✓ Conta criada"
            : "Criar conta"}
      </button>
      <div style={s.divider}>
        <div style={s.divLine} />
        ou
        <div style={s.divLine} />
      </div>
      <button
        onMouseEnter={() => setHov("g")}
        onMouseLeave={() => setHov(null)}
        style={{
          ...s.googleBtn,
          borderColor: hov === "g" ? C.muted : C.border,
          background: hov === "g" ? "rgba(255,255,255,0.03)" : "transparent",
        }}
      >
        <GoogleIcon /> Cadastrar com Google
      </button>
    </>
  );
}

export default function AuthPage() {
  const [page, setPage] = useState("login");

  return (
    <div style={s.page}>
      <div style={s.card}>
        <div style={s.logo}>
          <img src={logo} alt="Caixa Mágica" style={s.logoImg} />
          <span style={s.logoText}>Caixa Mágica</span>
        </div>

        <div style={s.tabs}>
          {["login", "register"].map((p) => (
            <button
              key={p}
              onClick={() => setPage(p)}
              style={{
                ...s.tab,
                background: page === p ? C.card : "transparent",
                color: page === p ? C.text : C.muted,
                boxShadow: page === p ? "0 1px 3px rgba(0,0,0,0.4)" : "none",
              }}
            >
              {p === "login" ? "Entrar" : "Criar conta"}
            </button>
          ))}
        </div>

        {page === "login" ? <LoginForm /> : <RegisterForm />}

        <div style={s.footer}>
          {page === "login" ? (
            <>
              <span>Não tem uma conta? </span>
              <button style={s.link} onClick={() => setPage("register")}>
                Criar conta
              </button>
            </>
          ) : (
            <>
              <span>Já tem uma conta? </span>
              <button style={s.link} onClick={() => setPage("login")}>
                Entrar
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
