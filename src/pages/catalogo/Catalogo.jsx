// src/pages/catalogo/Catalogo.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Banner from "../../components/Banner";
import MostRented from "../../components/MostRented";
import Rodape from "../../components/Rodape";
import "./Catalogo.css";

const CATEGORIAS = ["Para mamães", "Itens de slagem", "Brinquedos de papelão"];

const MARCAS = ["Todas", "Fisher-Price", "Lego", "Chicco", "Outras"];
const IDADES = ["Todas", "Até 3 anos", "4 a 8 anos", "Acima de 8 anos"];
const TEMPOS = ["Todas", "Diária", "7 Dias", "15 Dias", "1 Mês"];
const FAIXAS_PRECO = [
  { label: "De R$5,00 até R$20,00", min: 5, max: 20 },
  { label: "De R$20,00 até R$50,00", min: 20, max: 50 },
];

export default function Catalogo() {
  const [produtos, setProdutos] = useState([]);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState(null);
  const [marca, setMarca] = useState("Todas");
  const [idade, setIdade] = useState("Todas");
  const [tempo, setTempo] = useState("Todas");
  const [faixaPreco, setFaixaPreco] = useState([]);
  const [kg, setKg] = useState("Todas");
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8080/api/brinquedos")
      .then((res) => res.json())
      .then((data) => setProdutos(data))
      .catch(() => {
        // fallback com dados fictícios para visualização
        setProdutos(
          Array.from({ length: 16 }, (_, i) => ({
            id: i + 1,
            nome: "Produto",
            descricao: "Descrição do produto",
            precoAluguel: [15, 31, 12, 10, 17][i % 5],
            imagemUrl: "",
            categoria: CATEGORIAS[i % CATEGORIAS.length],
            idade: IDADES[(i % 3) + 1],
          }))
        );
      });
  }, []);

  const toggleFaixa = (faixa) => {
    setFaixaPreco((prev) =>
      prev.includes(faixa) ? prev.filter((f) => f !== faixa) : [...prev, faixa]
    );
  };

  const produtosFiltrados = produtos.filter((p) => {
    if (categoriaSelecionada && (p.categoria || "") !== categoriaSelecionada)
      return false;
    if (marca !== "Todas" && (p.marca || "") !== marca) return false;
    if (idade !== "Todas" && (p.idade || "") !== idade) return false;
    if (
      faixaPreco.length > 0 &&
      !faixaPreco.some(
        (f) => p.precoAluguel >= f.min && p.precoAluguel <= f.max
      )
    )
      return false;
    return true;
  });

  return (
    <div className="catalogo-container">
      <Navbar />
      <Banner />

      <div className="catalogo-body">
        {/* ── Sidebar de filtros ── */}
        <aside className="catalogo-sidebar">
          <h3 className="sidebar-title">Filtros</h3>

          <div className="filtro-bloco">
            <label className="filtro-label">Marca</label>
            <select value={marca} onChange={(e) => setMarca(e.target.value)} className="filtro-select">
              {MARCAS.map((m) => <option key={m}>{m}</option>)}
            </select>
          </div>

          <div className="filtro-bloco">
            <label className="filtro-label">Idade</label>
            <select value={idade} onChange={(e) => setIdade(e.target.value)} className="filtro-select">
              {IDADES.map((i) => <option key={i}>{i}</option>)}
            </select>
          </div>

          <div className="filtro-bloco">
            <label className="filtro-label">Tempo De Aluguel</label>
            <select value={tempo} onChange={(e) => setTempo(e.target.value)} className="filtro-select">
              {TEMPOS.map((t) => <option key={t}>{t}</option>)}
            </select>
          </div>

          <div className="filtro-bloco">
            <label className="filtro-label">Preço</label>
            <select className="filtro-select">
              <option>Ordenar</option>
              <option>Menor preço</option>
              <option>Maior preço</option>
            </select>
            <div className="filtro-checkboxes">
              {FAIXAS_PRECO.map((f) => (
                <label key={f.label} className="filtro-check-item">
                  <input
                    type="checkbox"
                    checked={faixaPreco.includes(f)}
                    onChange={() => toggleFaixa(f)}
                  />
                  <span>{f.label}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="filtro-bloco">
            <label className="filtro-label">Kg</label>
            <select value={kg} onChange={(e) => setKg(e.target.value)} className="filtro-select">
              <option>Todas</option>
              <option>Até 2kg</option>
              <option>2kg a 5kg</option>
              <option>Acima de 5kg</option>
            </select>
          </div>
        </aside>

        {/* ── Conteúdo principal ── */}
        <main className="catalogo-main">
          {/* Pills de categoria */}
          <div className="categorias-pills">
            {CATEGORIAS.map((cat) => (
              <button
                key={cat}
                className={`pill ${categoriaSelecionada === cat ? "pill-active" : ""}`}
                onClick={() =>
                  setCategoriaSelecionada(categoriaSelecionada === cat ? null : cat)
                }
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid de produtos */}
          <div className="produtos-grid">
            {produtosFiltrados.length > 0 ? (
              produtosFiltrados.map((produto) => (
                <div
                  key={produto.id}
                  className="produto-card"
                  onClick={() => navigate(`/produto/${produto.id}`)}
                >
                  <div className="produto-img-box">
                    {produto.imagemUrl ? (
                      <img
                        src={produto.imagemUrl}
                        alt={produto.nome}
                        className="produto-foto"
                        onError={(e) => { e.target.style.display = "none"; }}
                      />
                    ) : (
                      <div className="produto-img-placeholder" />
                    )}
                  </div>
                  <p className="produto-nome">{produto.nome}</p>
                  {produto.precoAluguel && (
                    <p className="produto-preco">
                      R${produto.precoAluguel.toFixed(0)}
                    </p>
                  )}
                </div>
              ))
            ) : (
              <p className="sem-produtos">Nenhum produto encontrado.</p>
            )}
          </div>

          {/* Seção Mais Alugados */}
          <MostRented />
        </main>
      </div>

      <Rodape />
    </div>
  );
}
