// src/pages/product-detail/ProductDetail.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Rodape from "../../components/Rodape";
import { getBrinquedoById } from "../../services/api";
import { useCart } from "../../context/CartContext";
import "./ProductDetail.css";

const PERIODOS = [
  { dias: 1,  label: "Diária",  desconto: 1.0  },
  { dias: 7,  label: "7 Dias",  desconto: 0.90 },
  { dias: 15, label: "15 Dias", desconto: 0.80 },
  { dias: 30, label: "1 Mês",   desconto: 0.70 },
];

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { adicionarItem } = useCart();

  const [brinquedo, setBrinquedo]               = useState(null);
  const [loading, setLoading]                   = useState(true);
  const [erro, setErro]                         = useState(null);
  const [imgAtiva, setImgAtiva]                 = useState(0);
  const [diasSelecionados, setDiasSelecionados] = useState(1);
  const [adicionado, setAdicionado]             = useState(false);

  useEffect(() => {
    setLoading(true);
    getBrinquedoById(id)
      .then((data) => { setBrinquedo(data); setLoading(false); })
      .catch(() => { setErro("Não foi possível carregar o produto."); setLoading(false); });
  }, [id]);

  const calcularTotal = () => {
    if (!brinquedo?.valor_base) return 0;
    const periodo = PERIODOS.find((p) => p.dias === diasSelecionados);
    return parseFloat(brinquedo.valor_base) * diasSelecionados * (periodo?.desconto || 1);
  };

  const handleReservar = () => {
    adicionarItem(brinquedo, diasSelecionados, calcularTotal());
    setAdicionado(true);
    setTimeout(() => navigate("/carrinho"), 800);
  };

  if (loading) return (
    <div className="detalhe-container">
      <Navbar />
      <div className="detalhe-estado">
        <div className="loading-spinner" />
        <p>Carregando produto...</p>
      </div>
      <Rodape />
    </div>
  );

  if (erro || !brinquedo) return (
    <div className="detalhe-container">
      <Navbar />
      <div className="detalhe-estado">
        <p>⚠️ {erro || "Produto não encontrado."}</p>
        <button className="btn-reservar" style={{ maxWidth: 220 }} onClick={() => navigate("/catalogo")}>
          Voltar ao catálogo
        </button>
      </div>
      <Rodape />
    </div>
  );

  const imagens      = brinquedo.imagens || [];
  const totalImagens = imagens.length;
  const irAnterior   = () => setImgAtiva((i) => (i === 0 ? totalImagens - 1 : i - 1));
  const irProximo    = () => setImgAtiva((i) => (i === totalImagens - 1 ? 0 : i + 1));
  const total        = calcularTotal();

  return (
    <div className="detalhe-container">
      <Navbar />

      <main className="detalhe-main">
        <button className="btn-voltar-link" onClick={() => navigate(-1)}>← Voltar</button>

        <div className="detalhe-grid">

          {/* ── Coluna esquerda: galeria + descrição ── */}
          <div className="detalhe-esquerda">

            {/* Carrossel */}
            <div className="detalhe-galeria">
              <div className="carrossel-wrap">
                {totalImagens > 0 ? (
                  <img key={imgAtiva} src={imagens[imgAtiva].imagem_url} alt={brinquedo.nome}
                    className="carrossel-img"
                    onError={(e) => { e.target.src = "https://via.placeholder.com/500x400?text=Sem+foto"; }} />
                ) : (
                  <div className="carrossel-placeholder" />
                )}
                {totalImagens > 1 && (
                  <>
                    <button className="carrossel-arrow prev" onClick={irAnterior}>❮</button>
                    <button className="carrossel-arrow next" onClick={irProximo}>❯</button>
                    <span className="carrossel-contador">{imgAtiva + 1} / {totalImagens}</span>
                  </>
                )}
              </div>
              {totalImagens > 1 && (
                <div className="detalhe-thumbs">
                  {imagens.map((img, i) => (
                    <img key={img.id} src={img.imagem_url} alt={`foto ${i + 1}`}
                      className={`detalhe-thumb ${imgAtiva === i ? "ativa" : ""}`}
                      onClick={() => setImgAtiva(i)}
                      onError={(e) => { e.target.style.display = "none"; }} />
                  ))}
                </div>
              )}
            </div>

            {/* Descrição abaixo da foto */}
            {(brinquedo.descricao_curta || brinquedo.descricao_completa) && (
              <div className="detalhe-descricao-box">
                <h3 className="descricao-titulo">Sobre o produto</h3>
                {brinquedo.descricao_curta && (
                  <p className="detalhe-descricao-curta">{brinquedo.descricao_curta}</p>
                )}
                {brinquedo.descricao_completa && (
                  <p className="detalhe-descricao">{brinquedo.descricao_completa}</p>
                )}
              </div>
            )}
          </div>

          {/* ── Coluna direita: info + reserva ── */}
          <div className="detalhe-info-box">
            {brinquedo.categoria && (
              <span className="detalhe-categoria">{brinquedo.categoria.nome}</span>
            )}
            <h1 className="detalhe-nome">{brinquedo.nome}</h1>

            {brinquedo.idade_recomendada && (
              <div className="detalhe-spec">
                <strong>Idade recomendada:</strong> {brinquedo.idade_recomendada}
              </div>
            )}
            {brinquedo.regras_aluguel && (
              <div className="detalhe-spec">
                <strong>Regras:</strong> {brinquedo.regras_aluguel}
              </div>
            )}

            {/* Período */}
            <div className="periodo-box">
              <label className="periodo-label">Período de aluguel:</label>
              <div className="periodos-opcoes">
                {PERIODOS.map(({ dias, label, desconto }) => (
                  <button key={dias}
                    className={`btn-periodo ${diasSelecionados === dias ? "ativo" : ""}`}
                    onClick={() => { setDiasSelecionados(dias); setAdicionado(false); }}>
                    {label}
                    {desconto < 1 && (
                      <span className="desconto-tag">-{Math.round((1 - desconto) * 100)}%</span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Preço */}
            {brinquedo.valor_base && (
              <div className="detalhe-preco-box">
                <span className="preco-label">
                  Total estimado ({diasSelecionados} {diasSelecionados === 1 ? "dia" : "dias"})
                </span>
                <span className="preco-valor">
                  R$ {total.toFixed(2).replace(".", ",")}
                </span>
                <small className="preco-base">
                  Base: R$ {parseFloat(brinquedo.valor_base).toFixed(2).replace(".", ",")}/dia
                </small>
              </div>
            )}

            <button
              className={`btn-reservar ${adicionado ? "adicionado" : ""}`}
              onClick={handleReservar}
              disabled={adicionado}
            >
              {adicionado ? "✓ Adicionado! Redirecionando..." : "Adicionar ao carrinho"}
            </button>
          </div>

        </div>
      </main>

      <Rodape />
    </div>
  );
}
