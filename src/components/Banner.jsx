import { useState } from "react";
import "./Banner.css";

const slides = [
  {
    id: 1,
    title: "Pelo preço de comprar",
    highlight: "UM BRINQUEDO,",
    subtitle: "VC PODE ALUGAR VÁRIOS!",
    bg: "#e8f5f0",
  },
  {
    id: 2,
    title: "Brinquedos educativos",
    highlight: "PARA TODAS AS IDADES,",
    subtitle: "COM QUALIDADE E SEGURANÇA!",
    bg: "#f0e8f5",
  },
  {
    id: 3,
    title: "Novidades chegando",
    highlight: "TODA SEMANA,",
    subtitle: "CONFIRA O CATÁLOGO COMPLETO!",
    bg: "#f5f0e8",
  },
];

function Banner() {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c === 0 ? slides.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === slides.length - 1 ? 0 : c + 1));

  const slide = slides[current];

  return (
    <div className="banner" style={{ background: slide.bg }}>
      <button className="banner-arrow left" onClick={prev}>
        ❮
      </button>

      <div className="banner-content">
        <div className="banner-text">
          <p className="banner-title">{slide.title}</p>
          <p className="banner-highlight">{slide.highlight}</p>
          <p className="banner-subtitle">{slide.subtitle}</p>
        </div>
        <div className="banner-img-placeholder" />
      </div>

      <button className="banner-arrow right" onClick={next}>
        ❯
      </button>

      <div className="banner-dots">
        {slides.map((_, i) => (
          <span
            key={i}
            className={`banner-dot ${i === current ? "active" : ""}`}
            onClick={() => setCurrent(i)}
          />
        ))}
      </div>
    </div>
  );
}

export default Banner;
