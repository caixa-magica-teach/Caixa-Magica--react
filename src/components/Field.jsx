// src/components/Field.jsx

function Field({ label, type, placeholder, value, onChange, error, suffix }) {
  const inputClass = [
    "field-input",
    error ? "has-error" : value ? "has-value" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div>
      <label className="field-label">{label}</label>
      <div className="field-wrap">
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={inputClass}
          style={{ paddingRight: suffix ? "38px" : "14px" }}
        />
        {suffix && <span className="field-eye">{suffix}</span>}
      </div>
      {error && <div className="field-error">{error}</div>}
    </div>
  );
}

export default Field;
