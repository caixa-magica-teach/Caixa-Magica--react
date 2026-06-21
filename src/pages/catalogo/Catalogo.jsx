// src/pages/catalogo/Catalogo.jsx
import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom"; // ← useSearchParams adicionado
import Navbar from "../../components/Navbar";
import Banner from "../../components/Banner";
import MostRented from "../../components/MostRented";
import Rodape from "../../components/Rodape";
import { getBrinquedos, getCategorias } from "../../services/api";
import "./Catalogo.css";

const FAIXAS_ETARIAS = [
  { label: "Até 1 ano", value: "ate_1" },
  { label: "1 a 3 anos", value: "1_3" },
  { label: "3 a 6 anos", value: "3_6" },
  { label: "6 a 10 anos", value: "6_10" },
  { label: "Acima de 10", value: "10+" },
];

const FASES = [
  { label: "Bebê", value: "bebe" },
  { label: "Engatinhando", value: "engatinhando" },
  { label: "Andando", value: "andando" },
  { label: "Escolar", value: "escolar" },
];

const TIPOS_USO = [
  { label: "Festa", value: "festa" },
  { label: "Educativo", value: "educativo" },
  { label: "Ao ar livre", value: "externo" },
  { label: "Interno", value: "interno" },
];

const PRAZOS = [
  { label: "Diária", value: "1" },
  { label: "7 dias", value: "7" },
  { label: "15 dias", value: "15" },
  { label: "1 mês", value: "30" },
];

const FAIXAS_VALOR = [
  { label: "Até R$20", min: 0, max: 20 },
  { label: "R$20 a R$50", min: 20, max: 50 },
  { label: "R$50 a R$100", min: 50, max: 100 },
  { label: "Acima de R$100", min: 100, max: 9999 },
];

const FILTROS_INICIAIS = {
  categoria: null,
  faixaEtaria: "",
  fase: "",
  tipoUso: "",
  status: "",
  prazo: "",
  valorMin: "",
  valorMax: "",
  ordenacao: "relevancia",
};

export default function Catalogo() {
  const [produtos, setProdutos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [filtros, setFiltros] = useState(FILTROS_INICIAIS);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);
  const [sidebarAberta, setSidebarAberta] = useState(true);

  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams(); // ← lê a URL

  // Pega o termo de busca da URL (?search=...)
  const busca = searchParams.get("search") || "";

  const totalFiltrosAtivos =
    Object.entries(filtros).filter(
      ([k, v]) => k !== "ordenacao" && v !== "" && v !== null,
    ).length + (busca ? 1 : 0);

  // Carrega categorias
  useEffect(() => {
    getCategorias()
      .then(setCategorias)
      .catch(() => {});
  }, []);

  // Carrega produtos quando filtros ou busca mudam
  useEffect(() => {
    setLoading(true);
    setErro(null);

    const params = {};
    if (filtros.categoria) params.categoria = filtros.categoria;
    if (filtros.status) params.status_atual = filtros.status;
    if (filtros.faixaEtaria) params.faixa_etaria = filtros.faixaEtaria;
    if (filtros.fase) params.fase = filtros.fase;
    if (filtros.tipoUso) params.tipo_uso = filtros.tipoUso;
    if (filtros.valorMin) params.valor_min = filtros.valorMin;
    if (filtros.valorMax) params.valor_max = filtros.valorMax;
    if (busca) params.search = busca; // ← usa o termo da URL

    getBrinquedos(params)
      .then((data) => {
        let ordenados = [...data];
        if (filtros.ordenacao === "menor_preco")
          ordenados.sort(
            (a, b) => parseFloat(a.valor_base) - parseFloat(b.valor_base),
          );
        if (filtros.ordenacao === "maior_preco")
          ordenados.sort(
            (a, b) => parseFloat(b.valor_base) - parseFloat(a.valor_base),
          );
        if (filtros.ordenacao === "nome_az")
          ordenados.sort((a, b) => a.nome.localeCompare(b.nome));
        setProdutos(ordenados);
        setLoading(false);
      })
      .catch(() => {
        setErro(
          "Não foi possível carregar os produtos. Verifique se a API está rodando.",
        );
        setLoading(false);
      });
  }, [filtros, busca]);

  const setFiltro = (campo, valor) =>
    setFiltros((prev) => ({ ...prev, [campo]: valor }));

  const limparFiltros = () => {
    setFiltros(FILTROS_INICIAIS);
    setSearchParams({}); // ← limpa o ?search= da URL também
  };

  const toggleFaixaValor = (faixa) => {
    const jaMin = filtros.valorMin === String(faixa.min);
    const jaMax = filtros.valorMax === String(faixa.max);
    if (jaMin && jaMax) {
      setFiltros((p) => ({ ...p, valorMin: "", valorMax: "" }));
    } else {
      setFiltros((p) => ({
        ...p,
        valorMin: String(faixa.min),
        valorMax: String(faixa.max),
      }));
    }
  };

  return (
    <div className="catalogo-container">
      <Navbar />
      <Banner />

      <div className="catalogo-body">
        {/* ══ SIDEBAR ══════════════════════════════ */}
        <aside
          className={`catalogo-sidebar ${sidebarAberta ? "aberta" : "fechada"}`}
        >
          <div className="sidebar-header">
            <h3 className="sidebar-title">
              Filtros
              {totalFiltrosAtivos > 0 && (
                <span className="filtros-badge">{totalFiltrosAtivos}</span>
              )}
            </h3>
            <button
              className="sidebar-toggle"
              onClick={() => setSidebarAberta((v) => !v)}
            >
              {sidebarAberta ? "‹" : "›"}
            </button>
          </div>

          {sidebarAberta && (
            <>
              {totalFiltrosAtivos > 0 && (
                <button className="btn-limpar" onClick={limparFiltros}>
                  ✕ Limpar filtros
                </button>
              )}

              <div className="filtro-bloco">
                <label className="filtro-label">Categoria</label>
                <select
                  className="filtro-select"
                  value={filtros.categoria || ""}
                  onChange={(e) =>
                    setFiltro("categoria", e.target.value || null)
                  }
                >
                  <option value="">Todas</option>
                  {categorias.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.nome}
                    </option>
                  ))}
                </select>
              </div>

              <div className="filtro-bloco">
                <label className="filtro-label">Faixa etária</label>
                <div className="filtro-pills-small">
                  {FAIXAS_ETARIAS.map((f) => (
                    <button
                      key={f.value}
                      className={`pill-small ${filtros.faixaEtaria === f.value ? "pill-small-active" : ""}`}
                      onClick={() =>
                        setFiltro(
                          "faixaEtaria",
                          filtros.faixaEtaria === f.value ? "" : f.value,
                        )
                      }
                    >
                      {f.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="filtro-bloco">
                <label className="filtro-label">Fase do desenvolvimento</label>
                <div className="filtro-pills-small">
                  {FASES.map((f) => (
                    <button
                      key={f.value}
                      className={`pill-small ${filtros.fase === f.value ? "pill-small-active" : ""}`}
                      onClick={() =>
                        setFiltro(
                          "fase",
                          filtros.fase === f.value ? "" : f.value,
                        )
                      }
                    >
                      {f.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="filtro-bloco">
                <label className="filtro-label">Tipo de uso</label>
                <div className="filtro-pills-small">
                  {TIPOS_USO.map((t) => (
                    <button
                      key={t.value}
                      className={`pill-small ${filtros.tipoUso === t.value ? "pill-small-active" : ""}`}
                      onClick={() =>
                        setFiltro(
                          "tipoUso",
                          filtros.tipoUso === t.value ? "" : t.value,
                        )
                      }
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="filtro-bloco">
                <label className="filtro-label">Disponibilidade</label>
                <select
                  className="filtro-select"
                  value={filtros.status}
                  onChange={(e) => setFiltro("status", e.target.value)}
                >
                  <option value="">Todos</option>
                  <option value="disponivel">Disponível</option>
                  <option value="alugado">Alugado</option>
                  <option value="manutencao">Em manutenção</option>
                </select>
              </div>

              <div className="filtro-bloco">
                <label className="filtro-label">Prazo de aluguel</label>
                <div className="filtro-pills-small">
                  {PRAZOS.map((p) => (
                    <button
                      key={p.value}
                      className={`pill-small ${filtros.prazo === p.value ? "pill-small-active" : ""}`}
                      onClick={() =>
                        setFiltro(
                          "prazo",
                          filtros.prazo === p.value ? "" : p.value,
                        )
                      }
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="filtro-bloco">
                <label className="filtro-label">Valor (diária)</label>
                <div className="filtro-checkboxes">
                  {FAIXAS_VALOR.map((f) => {
                    const ativo =
                      filtros.valorMin === String(f.min) &&
                      filtros.valorMax === String(f.max);
                    return (
                      <label key={f.label} className="filtro-check-item">
                        <input
                          type="checkbox"
                          checked={ativo}
                          onChange={() => toggleFaixaValor(f)}
                          style={{ accentColor: "var(--accent)" }}
                        />
                        <span>{f.label}</span>
                      </label>
                    );
                  })}
                </div>
              </div>
            </>
          )}
        </aside>

        {/* ══ CONTEÚDO PRINCIPAL ═══════════════════ */}
        <main className="catalogo-main">
          {/* Mostra termo buscado se houver */}
          {busca && (
            <div className="busca-ativa">
              🔍 Resultados para: <strong>"{busca}"</strong>
              <button
                className="btn-limpar-inline"
                onClick={() => setSearchParams({})}
              >
                ✕ Limpar busca
              </button>
            </div>
          )}

          <div className="catalogo-topbar">
            <div className="categorias-pills">
              <button
                className={`pill ${!filtros.categoria ? "pill-active" : ""}`}
                onClick={() => setFiltro("categoria", null)}
              >
                Todos
              </button>
              {categorias.map((cat) => (
                <button
                  key={cat.id}
                  className={`pill ${filtros.categoria == cat.id ? "pill-active" : ""}`}
                  onClick={() =>
                    setFiltro(
                      "categoria",
                      filtros.categoria == cat.id ? null : cat.id,
                    )
                  }
                >
                  {cat.nome}
                </button>
              ))}
            </div>

            <div className="catalogo-ordenacao">
              <select
                className="filtro-select"
                value={filtros.ordenacao}
                onChange={(e) => setFiltro("ordenacao", e.target.value)}
              >
                <option value="relevancia">Relevância</option>
                <option value="menor_preco">Menor preço</option>
                <option value="maior_preco">Maior preço</option>
                <option value="nome_az">A → Z</option>
              </select>
            </div>
          </div>

          {!loading && !erro && (
            <p className="catalogo-contagem">
              {produtos.length}{" "}
              {produtos.length === 1
                ? "produto encontrado"
                : "produtos encontrados"}
              {totalFiltrosAtivos > 0 && (
                <button className="btn-limpar-inline" onClick={limparFiltros}>
                  Limpar tudo
                </button>
              )}
            </p>
          )}

          {loading ? (
            <div className="catalogo-estado">
              <div className="loading-spinner" />
              <p>Carregando produtos...</p>
            </div>
          ) : erro ? (
            <div className="catalogo-estado">
              <p>⚠️ {erro}</p>
              <button
                className="pill pill-active"
                onClick={() => window.location.reload()}
              >
                Tentar novamente
              </button>
            </div>
          ) : produtos.length === 0 ? (
            <div className="catalogo-estado">
              <p className="sem-produtos">Nenhum produto encontrado.</p>
              <button className="pill pill-active" onClick={limparFiltros}>
                Limpar filtros
              </button>
            </div>
          ) : (
            <div className="produtos-grid">
              {produtos.map((produto) => {
                const imgUrl =
                  produto.imagens?.length > 0
                    ? produto.imagens[0].imagem_url
                    : null;
                return (
                  <div
                    key={produto.id}
                    className="produto-card"
                    onClick={() => navigate(`/produto/${produto.id}`)}
                  >
                    <div className="produto-img-box">
                      {imgUrl ? (
                        <img
                          src={imgUrl}
                          alt={produto.nome}
                          className="produto-foto"
                          onError={(e) => {
                            e.target.style.display = "none";
                          }}
                        />
                      ) : (
                        <div className="produto-img-placeholder" />
                      )}
                      {produto.status_atual === "disponivel" && (
                        <span className="produto-status disponivel">
                          Disponível
                        </span>
                      )}
                      {produto.status_atual === "alugado" && (
                        <span className="produto-status alugado">Alugado</span>
                      )}
                    </div>
                    <p className="produto-nome">{produto.nome}</p>
                    {produto.valor_base && (
                      <p className="produto-preco">
                        R$ {parseFloat(produto.valor_base).toFixed(2)}
                        <span>/dia</span>
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          <MostRented />
        </main>
      </div>

      <Rodape />
    </div>
  );
}
