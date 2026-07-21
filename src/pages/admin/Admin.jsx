// src/pages/admin/Admin.jsx
import { useState, useEffect } from "react";
import {
  getBrinquedos, getCategorias, getPedidos,
  criarBrinquedo, editarBrinquedo, deletarBrinquedo,
  criarCategoria, editarCategoria, deletarCategoria,
  editarPedido,
} from "../../services/api";
import "./Admin.css";

// ── Ícones simples ────────────────────────
const Icon = ({ name }) => {
  const icons = {
    produto:   "🧸",
    pedido:    "📦",
    categoria: "🏷️",
    dashboard: "📊",
    sair:      "🚪",
    editar:    "✏️",
    deletar:   "🗑️",
    novo:      "＋",
    salvar:    "✓",
    fechar:    "✕",
  };
  return <span>{icons[name] || "•"}</span>;
};

// ── Status badge ──────────────────────────
const StatusBadge = ({ status }) => {
  const map = {
    disponivel:    { label: "Disponível",   cls: "badge-green"  },
    alugado:       { label: "Alugado",      cls: "badge-orange" },
    manutencao:    { label: "Manutenção",   cls: "badge-red"    },
    pendente:      { label: "Pendente",     cls: "badge-orange" },
    aprovado:      { label: "Aprovado",     cls: "badge-green"  },
    em_andamento:  { label: "Em andamento", cls: "badge-blue"   },
    concluido:     { label: "Concluído",    cls: "badge-gray"   },
    cancelado:     { label: "Cancelado",    cls: "badge-red"    },
  };
  const s = map[status] || { label: status, cls: "badge-gray" };
  return <span className={`badge ${s.cls}`}>{s.label}</span>;
};

// ════════════════════════════════════════
// SEÇÃO: DASHBOARD
// ════════════════════════════════════════
function Dashboard({ stats }) {
  return (
    <div className="admin-section">
      <h2 className="section-title">Dashboard</h2>
      <div className="dashboard-cards">
        <div className="dash-card">
          <span className="dash-icon">🧸</span>
          <div>
            <p className="dash-num">{stats.produtos}</p>
            <p className="dash-label">Produtos</p>
          </div>
        </div>
        <div className="dash-card">
          <span className="dash-icon">✅</span>
          <div>
            <p className="dash-num">{stats.disponiveis}</p>
            <p className="dash-label">Disponíveis</p>
          </div>
        </div>
        <div className="dash-card">
          <span className="dash-icon">📦</span>
          <div>
            <p className="dash-num">{stats.pedidos}</p>
            <p className="dash-label">Pedidos</p>
          </div>
        </div>
        <div className="dash-card">
          <span className="dash-icon">🏷️</span>
          <div>
            <p className="dash-num">{stats.categorias}</p>
            <p className="dash-label">Categorias</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ════════════════════════════════════════
// SEÇÃO: PRODUTOS
// ════════════════════════════════════════
function Produtos({ categorias }) {
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [modal, setModal]       = useState(null); // null | "novo" | {produto}
  const [form, setForm]         = useState({});
  const [salvando, setSalvando] = useState(false);
  const [erro, setErro]         = useState(null);
  const [busca, setBusca]       = useState("");

  const carregar = () => {
    setLoading(true);
    getBrinquedos().then(setProdutos).finally(() => setLoading(false));
  };

  useEffect(() => { carregar(); }, []);

  const abrirNovo = () => {
    setForm({ nome: "", descricao_curta: "", descricao_completa: "", codigo: "", valor_base: "", status_atual: "disponivel", categoria: "", idade_recomendada: "", regras_aluguel: "" });
    setModal("novo");
    setErro(null);
  };

  const abrirEditar = (p) => {
    setForm({ ...p, categoria: p.categoria?.id || "" });
    setModal(p);
    setErro(null);
  };

  const fechar = () => { setModal(null); setErro(null); };

  const salvar = async () => {
    setSalvando(true);
    setErro(null);
    try {
      const payload = { ...form, categoria: form.categoria || null };
      if (modal === "novo") await criarBrinquedo(payload);
      else await editarBrinquedo(modal.id, payload);
      carregar();
      fechar();
    } catch { setErro("Erro ao salvar. Verifique os campos."); }
    finally { setSalvando(false); }
  };

  const deletar = async (id) => {
    if (!confirm("Deseja deletar este produto?")) return;
    await deletarBrinquedo(id);
    carregar();
  };

  const filtrados = produtos.filter(p =>
    p.nome.toLowerCase().includes(busca.toLowerCase()) ||
    p.codigo?.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <div className="admin-section">
      <div className="section-header">
        <h2 className="section-title">Produtos</h2>
        <div className="section-actions">
          <input className="admin-search" placeholder="Buscar produto..." value={busca} onChange={e => setBusca(e.target.value)} />
          <button className="btn-admin btn-primary" onClick={abrirNovo}>
            <Icon name="novo" /> Novo produto
          </button>
        </div>
      </div>

      {loading ? <p className="admin-loading">Carregando...</p> : (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Código</th>
                <th>Nome</th>
                <th>Categoria</th>
                <th>Valor base</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {filtrados.map(p => (
                <tr key={p.id}>
                  <td className="td-code">{p.codigo}</td>
                  <td className="td-bold">{p.nome}</td>
                  <td>{p.categoria?.nome || "—"}</td>
                  <td>R$ {parseFloat(p.valor_base || 0).toFixed(2)}</td>
                  <td><StatusBadge status={p.status_atual} /></td>
                  <td>
                    <div className="td-acoes">
                      <button className="btn-icon" onClick={() => abrirEditar(p)}><Icon name="editar" /></button>
                      <button className="btn-icon danger" onClick={() => deletar(p.id)}><Icon name="deletar" /></button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtrados.length === 0 && (
                <tr><td colSpan={6} className="td-empty">Nenhum produto encontrado.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal */}
      {modal !== null && (
        <div className="modal-overlay" onClick={fechar}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{modal === "novo" ? "Novo produto" : "Editar produto"}</h3>
              <button className="btn-icon" onClick={fechar}><Icon name="fechar" /></button>
            </div>

            <div className="modal-body">
              <div className="form-row">
                <div className="form-group">
                  <label>Nome *</label>
                  <input value={form.nome || ""} onChange={e => setForm(f => ({...f, nome: e.target.value}))} />
                </div>
                <div className="form-group">
                  <label>Código *</label>
                  <input value={form.codigo || ""} onChange={e => setForm(f => ({...f, codigo: e.target.value}))} />
                </div>
              </div>

              <div className="form-group">
                <label>Descrição curta</label>
                <input value={form.descricao_curta || ""} onChange={e => setForm(f => ({...f, descricao_curta: e.target.value}))} />
              </div>

              <div className="form-group">
                <label>Descrição completa</label>
                <textarea rows={3} value={form.descricao_completa || ""} onChange={e => setForm(f => ({...f, descricao_completa: e.target.value}))} />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Valor base (R$/dia) *</label>
                  <input type="number" step="0.01" value={form.valor_base || ""} onChange={e => setForm(f => ({...f, valor_base: e.target.value}))} />
                </div>
                <div className="form-group">
                  <label>Categoria</label>
                  <select value={form.categoria || ""} onChange={e => setForm(f => ({...f, categoria: e.target.value}))}>
                    <option value="">Sem categoria</option>
                    {categorias.map(c => <option key={c.id} value={c.id}>{c.nome}</option>)}
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Status</label>
                  <select value={form.status_atual || "disponivel"} onChange={e => setForm(f => ({...f, status_atual: e.target.value}))}>
                    <option value="disponivel">Disponível</option>
                    <option value="alugado">Alugado</option>
                    <option value="manutencao">Em manutenção</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Idade recomendada</label>
                  <input value={form.idade_recomendada || ""} onChange={e => setForm(f => ({...f, idade_recomendada: e.target.value}))} />
                </div>
              </div>

              <div className="form-group">
                <label>Regras de aluguel</label>
                <textarea rows={2} value={form.regras_aluguel || ""} onChange={e => setForm(f => ({...f, regras_aluguel: e.target.value}))} />
              </div>

              {erro && <p className="form-erro">{erro}</p>}
            </div>

            <div className="modal-footer">
              <button className="btn-admin btn-ghost" onClick={fechar}>Cancelar</button>
              <button className="btn-admin btn-primary" onClick={salvar} disabled={salvando}>
                {salvando ? "Salvando..." : "Salvar"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ════════════════════════════════════════
// SEÇÃO: PEDIDOS
// ════════════════════════════════════════
function Pedidos() {
  const [pedidos, setPedidos]   = useState([]);
  const [loading, setLoading]   = useState(true);
  const [filtro, setFiltro]     = useState("");
  const [modal, setModal]       = useState(null);

  const carregar = () => {
    setLoading(true);
    getPedidos().then(setPedidos).finally(() => setLoading(false));
  };

  useEffect(() => { carregar(); }, []);

  const atualizarStatus = async (id, status) => {
    await editarPedido(id, { status_aluguel: status });
    carregar();
  };

  const filtrados = pedidos.filter(p =>
    filtro === "" || p.status_aluguel === filtro
  );

  return (
    <div className="admin-section">
      <div className="section-header">
        <h2 className="section-title">Pedidos</h2>
        <div className="section-actions">
          <select className="admin-search" value={filtro} onChange={e => setFiltro(e.target.value)}>
            <option value="">Todos os status</option>
            <option value="pendente">Pendente</option>
            <option value="aprovado">Aprovado</option>
            <option value="em_andamento">Em andamento</option>
            <option value="concluido">Concluído</option>
            <option value="cancelado">Cancelado</option>
          </select>
        </div>
      </div>

      {loading ? <p className="admin-loading">Carregando...</p> : (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Cliente</th>
                <th>Prazo</th>
                <th>Logística</th>
                <th>Valor total</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {filtrados.map(p => (
                <tr key={p.id}>
                  <td className="td-code">#{p.id}</td>
                  <td className="td-bold">{p.cliente?.user?.username || p.cliente || "—"}</td>
                  <td>{p.prazo_aluguel} {p.prazo_aluguel === 1 ? "dia" : "dias"}</td>
                  <td>{p.tipo_logistica === "entrega" ? "🚚 Entrega" : "🏪 Retirada"}</td>
                  <td>R$ {parseFloat(p.valor_total || 0).toFixed(2)}</td>
                  <td><StatusBadge status={p.status_aluguel} /></td>
                  <td>
                    <select
                      className="select-status"
                      value={p.status_aluguel}
                      onChange={e => atualizarStatus(p.id, e.target.value)}
                    >
                      <option value="pendente">Pendente</option>
                      <option value="aprovado">Aprovado</option>
                      <option value="em_andamento">Em andamento</option>
                      <option value="concluido">Concluído</option>
                      <option value="cancelado">Cancelado</option>
                    </select>
                  </td>
                </tr>
              ))}
              {filtrados.length === 0 && (
                <tr><td colSpan={7} className="td-empty">Nenhum pedido encontrado.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

// ════════════════════════════════════════
// SEÇÃO: CATEGORIAS
// ════════════════════════════════════════
function Categorias() {
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading]       = useState(true);
  const [modal, setModal]           = useState(null);
  const [form, setForm]             = useState({});
  const [salvando, setSalvando]     = useState(false);
  const [erro, setErro]             = useState(null);

  const carregar = () => {
    setLoading(true);
    getCategorias().then(setCategorias).finally(() => setLoading(false));
  };

  useEffect(() => { carregar(); }, []);

  const abrirNovo = () => { setForm({ nome: "", descricao: "" }); setModal("novo"); setErro(null); };
  const abrirEditar = (c) => { setForm({ ...c }); setModal(c); setErro(null); };
  const fechar = () => { setModal(null); setErro(null); };

  const salvar = async () => {
    if (!form.nome?.trim()) { setErro("Nome obrigatório."); return; }
    setSalvando(true);
    try {
      if (modal === "novo") await criarCategoria(form);
      else await editarCategoria(modal.id, form);
      carregar();
      fechar();
    } catch { setErro("Erro ao salvar."); }
    finally { setSalvando(false); }
  };

  const deletar = async (id) => {
    if (!confirm("Deseja deletar esta categoria?")) return;
    await deletarCategoria(id);
    carregar();
  };

  return (
    <div className="admin-section">
      <div className="section-header">
        <h2 className="section-title">Categorias</h2>
        <button className="btn-admin btn-primary" onClick={abrirNovo}>
          <Icon name="novo" /> Nova categoria
        </button>
      </div>

      {loading ? <p className="admin-loading">Carregando...</p> : (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr><th>Nome</th><th>Descrição</th><th>Ações</th></tr>
            </thead>
            <tbody>
              {categorias.map(c => (
                <tr key={c.id}>
                  <td className="td-bold">{c.nome}</td>
                  <td>{c.descricao || "—"}</td>
                  <td>
                    <div className="td-acoes">
                      <button className="btn-icon" onClick={() => abrirEditar(c)}><Icon name="editar" /></button>
                      <button className="btn-icon danger" onClick={() => deletar(c.id)}><Icon name="deletar" /></button>
                    </div>
                  </td>
                </tr>
              ))}
              {categorias.length === 0 && (
                <tr><td colSpan={3} className="td-empty">Nenhuma categoria.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {modal !== null && (
        <div className="modal-overlay" onClick={fechar}>
          <div className="modal modal-sm" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{modal === "novo" ? "Nova categoria" : "Editar categoria"}</h3>
              <button className="btn-icon" onClick={fechar}><Icon name="fechar" /></button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>Nome *</label>
                <input value={form.nome || ""} onChange={e => setForm(f => ({...f, nome: e.target.value}))} />
              </div>
              <div className="form-group">
                <label>Descrição</label>
                <textarea rows={3} value={form.descricao || ""} onChange={e => setForm(f => ({...f, descricao: e.target.value}))} />
              </div>
              {erro && <p className="form-erro">{erro}</p>}
            </div>
            <div className="modal-footer">
              <button className="btn-admin btn-ghost" onClick={fechar}>Cancelar</button>
              <button className="btn-admin btn-primary" onClick={salvar} disabled={salvando}>
                {salvando ? "Salvando..." : "Salvar"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ════════════════════════════════════════
// ADMIN PRINCIPAL
// ════════════════════════════════════════
export default function Admin() {
  const [aba, setAba]     = useState("dashboard");
  const [stats, setStats] = useState({ produtos: 0, disponiveis: 0, pedidos: 0, categorias: 0 });
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    Promise.all([getBrinquedos(), getCategorias(), getPedidos()])
      .then(([produtos, cats, pedidos]) => {
        setCategorias(cats);
        setStats({
          produtos:    produtos.length,
          disponiveis: produtos.filter(p => p.status_atual === "disponivel").length,
          pedidos:     pedidos.length,
          categorias:  cats.length,
        });
      })
      .catch(() => {});
  }, []);

  const abas = [
    { id: "dashboard", label: "Dashboard", icon: "dashboard" },
    { id: "produtos",  label: "Produtos",  icon: "produto"   },
    { id: "pedidos",   label: "Pedidos",   icon: "pedido"    },
    { id: "categorias",label: "Categorias",icon: "categoria" },
  ];

  return (
    <div className="admin-layout">
      {/* ── Sidebar ── */}
      <aside className="admin-sidebar">
        <div className="admin-brand">
          <span className="brand-icon">🧸</span>
          <span className="brand-nome">Caixa Mágica</span>
        </div>
        <p className="admin-sub">Painel Admin</p>

        <nav className="admin-nav">
          {abas.map(a => (
            <button
              key={a.id}
              className={`nav-item ${aba === a.id ? "active" : ""}`}
              onClick={() => setAba(a.id)}
            >
              <Icon name={a.icon} />
              <span>{a.label}</span>
            </button>
          ))}
        </nav>

        <a href="/" className="nav-item nav-sair">
          <Icon name="sair" />
          <span>Voltar ao site</span>
        </a>
      </aside>

      {/* ── Conteúdo ── */}
      <main className="admin-content">
        {aba === "dashboard"  && <Dashboard stats={stats} />}
        {aba === "produtos"   && <Produtos categorias={categorias} />}
        {aba === "pedidos"    && <Pedidos />}
        {aba === "categorias" && <Categorias />}
      </main>
    </div>
  );
}
