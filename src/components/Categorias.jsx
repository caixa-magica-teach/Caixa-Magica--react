// src/components/Categorias.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getCategorias } from "../services/api";
import "./Categorias.css";

const VISIVEIS = 4; // quantos cards aparecem por vez

function Categorias() {
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading]       = useState(true);
  const [indice, setIndice]         = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    getCategorias()
      .then((data) => { setCategorias(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const podePrev = indice > 0;
  const podeNext = indice + VISIVEIS < categorias.length;

  const prev = () => setIndice((i) => Math.max(i - 1, 0));
  const next = () => setIndice((i) => Math.min(i + 1, categorias.length - VISIVEIS));

  if (loading) return (
    <section className="categories">
      <div className="categories-wrap">
        <div className="categories-inner">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="category-card skeleton">
              <p className="category-label skeleton-text">carregando</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );

  if (categorias.length === 0) return null;

  const visiveis = categorias.slice(indice, indice + VISIVEIS);

  return (
    <section className="categories">
      <div className="categories-wrap">

        {/* Seta esquerda */}
        <button
          className={`cat-arrow left ${!podePrev ? "hidden" : ""}`}
          onClick={prev}
        >❮</button>

        {/* Cards */}
        <div className="categories-inner">
          {visiveis.map((cat) => (
            <div
              key={cat.id}
              className="category-card"
              onClick={() => navigate(`/catalogo?categoria=${cat.id}`)}
            >
              <p className="category-label">{cat.nome}</p>
              {cat.descricao && (
                <p className="category-desc">{cat.descricao}</p>
              )}
            </div>
          ))}
        </div>

        {/* Seta direita */}
        <button
          className={`cat-arrow right ${!podeNext ? "hidden" : ""}`}
          onClick={next}
        >❯</button>

      </div>

      {/* Dots */}
      {categorias.length > VISIVEIS && (
        <div className="cat-dots">
          {Array.from({ length: categorias.length - VISIVEIS + 1 }).map((_, i) => (
            <span
              key={i}
              className={`cat-dot ${indice === i ? "active" : ""}`}
              onClick={() => setIndice(i)}
            />
          ))}
        </div>
      )}
    </section>
  );
}

export default Categorias;
