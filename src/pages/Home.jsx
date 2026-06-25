import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

export default function Home() {
  return (
    <section className="home-hero">
      <div className="hero-content">

        <div className="marketing-container">
          <p className="marketing-text">
            Diversão sem fim para sua criança,<br />
            Economia para Você e um<br />
            Mundo Sustentável!
          </p>

          <Link to="/catalogo" className="btn-cta">
            ALUGUE AGORA E SORRIA!
          </Link>
        </div>

        <div className="features-grid">
          <div className="feature-card">Economia real: com o preço de um, você aluga vários.</div>
          <div className="feature-card">Experiências inesquecíveis para crianças felizes.</div>
          <div className="feature-card">Suporte total e segurança em todas as etapas.</div>
        </div>
      </div>
    </section>
  );
}