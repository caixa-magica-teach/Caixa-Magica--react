// src/pages/product-detail/ProductDetail.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Rodape from "../../components/Rodape";
import "./ProductDetail.css";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [brinquedo, setBrinquedo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [diasSelecionados, setDiasSelecionados] = useState(1);

  useEffect(() => {
    fetch(`http://localhost:8080/api/brinquedos/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setBrinquedo(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erro ao buscar detalhes:", err);
        setLoading(false);
      });
  }, [id]);

  const calcularPrecoTotal = () => {
    if (!brinquedo?.precoAluguel) return 0;
    let preco = brinquedo.precoAluguel * diasSelecionados;
    if (diasSelecionados === 7)  preco *= 0.90;
    if (diasSelecionados === 15) preco *= 0.80;
    if (diasSelecionados === 30) preco *= 0.70;
    return preco;
  };

  if (loading) {
    return (
      <div className="detalhe-container">
        <Navbar />
        <p className="loading-text">Carregando detalhes do brinquedo...</p>
        <Rodape />
      </div>
    );
  }

  if (!brinquedo) {
    return (
      <div className="detalhe-container">
        <Navbar />
        <div className="detalhe-erro">
          <h2>Brinquedo não encontrado! 😢</h2>
          <button className="btn-confirmar-aluguel" onClick={() => navigate("/catalogo")}>
            Voltar para o Catálogo
          </button>
        </div>
        <Rodape />
      </div>
    );
  }

  return (
    <div className="detalhe-container">
      <Navbar />

      <main className="detalhe-main">
        <button className="btn-voltar-link" onClick={() => navigate(-1)}>
          ← Voltar para a tela anterior
        </button>

        <div className="detalhe-grid">
          <div className="detalhe-imagem-box">
            <img
              src={brinquedo.imagemUrl}
              alt={brinquedo.nome}
              className="detalhe-foto"
              onError={(e) => {
                e.target.src =
                  "https://via.placeholder.com/500x400?text=Caixa+Mágica";
              }}
            />
          </div>

          <div className="detalhe-info-box">
            <span className="detalhe-categoria">
              {brinquedo.categoria || "Diversão"}
            </span>
            <h1>{brinquedo.nome}</h1>

            <p className="detalhe-descricao">
              {brinquedo.descricao ||
                "Brinquedo higienizado, seguro e perfeito para garantir a animação da sua festa."}
            </p>

            <div className="detalhe-especificacoes">
              <div className="especificacao-item">
                <strong>Idade Recomendada:</strong>{" "}
                {brinquedo.idade || "Qualquer idade"}
              </div>
            </div>

            <div className="periodo-locacao-box">
              <label className="seletor-label">
                Selecione o período de aluguel:
              </label>
              <div className="periodos-opcoes">
                {[
                  { dias: 1,  label: "Diária (Festa)" },
                  { dias: 7,  label: "7 Dias" },
                  { dias: 15, label: "15 Dias" },
                  { dias: 30, label: "1 Mês" },
                ].map(({ dias, label }) => (
                  <button
                    key={dias}
                    className={`btn-opcao ${diasSelecionados === dias ? "ativo" : ""}`}
                    onClick={() => setDiasSelecionados(dias)}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {brinquedo.precoAluguel && (
              <div className="detalhe-preco-box">
                <span className="preco-label">
                  Valor Total Estimado ({diasSelecionados}{" "}
                  {diasSelecionados === 1 ? "dia" : "dias"}):
                </span>
                <span className="preco-valor">
                  R$ {calcularPrecoTotal().toFixed(2)}
                </span>
                <small className="preco-diaria-base">
                  Preço base: R$ {brinquedo.precoAluguel.toFixed(2)}/diária
                </small>
              </div>
            )}

            <button
              className="btn-confirmar-aluguel"
              onClick={() =>
                alert(`Reserva iniciada para ${diasSelecionados} dias!`)
              }
            >
              Reservar Agora
            </button>
          </div>
        </div>
      </main>

      <Rodape />
    </div>
  );
}
