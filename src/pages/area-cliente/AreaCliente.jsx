import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { getPedidos } from "../../services/api"; // Importa a função da API
import "./AreaCliente.css";

const AreaCliente = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [abaAtiva, setAbaAtiva] = useState("ativos");

  // Estados reais para os pedidos da API
  const [pedidosAtivos, setPedidosAtivos] = useState([]);
  const [historicoPedidos, setHistoricoPedidos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);

  // Trata o nome do usuário de forma segura
  const primeiroNome =
    user?.nome?.split(" ")[0] || user?.email?.split("@")[0] || "Cliente";

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // Busca os pedidos reais do backend ao carregar a página
  useEffect(() => {
    async function carregarPedidos() {
      try {
        setLoading(true);
        const dados = await getPedidos(); // Usa o token configurado no api.js

        // Filtra ou separa os pedidos conforme o status vindo do Django
        // Exemplo: se o pedido estiver ativo ou pendente vs concluído/cancelado
        const ativos = dados.filter(p => p.status !== "Concluído" && p.status !== "Cancelado");
        const historico = dados.filter(p => p.status === "Concluído" || p.status === "Cancelado");

        setPedidosAtivos(ativos);
        setHistoricoPedidos(historico);
      } catch (err) {
        console.error("Erro ao carregar pedidos:", err);
        setErro("Não foi possível carregar seus aluguéis.");
      } finally {
        setLoading(false);
      }
    }

    carregarPedidos();
  }, []);

  const handleRenovar = (id) => {
    alert(`Solicitação de renovação enviada para o pedido #${id}`);
  };

  const handleDevolver = (id) => {
    alert(`Agendamento de devolução/coleta iniciado para o pedido #${id}`);
  };

  return (
    <div className="page-wrapper">
      <div className="dashboard-container">
        {/* Header */}
        <header
          className="welcome-header"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <h2>Olá, {primeiroNome}! 👋</h2>
            <p>Seja bem-vindo de volta ao seu painel Caixa Mágica.</p>
          </div>

          <button
            onClick={handleLogout}
            className="btn-logout"
            style={{
              padding: "8px 16px",
              backgroundColor: "#ff4d4d",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "bold",
              display: "flex",
              alignItems: "center",
              gap: "6px",
            }}
          >
            🚪 Sair
          </button>
        </header>

        {/* Abas e Catálogo */}
        <div className="dashboard-topo-wrapper">
          <div className="dashboard-tabs">
            <button
              className={`tab-btn ${abaAtiva === "ativos" ? "active" : ""}`}
              onClick={() => setAbaAtiva("ativos")}
            >
              Aluguéis Ativos ({pedidosAtivos.length})
            </button>
            <button
              className={`tab-btn ${abaAtiva === "historico" ? "active" : ""}`}
              onClick={() => setAbaAtiva("historico")}
            >
              Histórico de Aluguéis
            </button>
          </div>

          <button
            className="btn-catalogo-topo"
            onClick={() => navigate("/catalogo")}
          >
            🧸 Ver Catálogo
          </button>
        </div>

        {loading && <p style={{ textAlign: "center", padding: "20px" }}>Carregando seus pedidos...</p>}
        {erro && <p style={{ color: "red", textAlign: "center" }}>{erro}</p>}

        {/* Aba: Ativos */}
        {!loading && abaAtiva === "ativos" && (
          <section className="bloco-alugueis">
            <h3 className="secao-titulo">Brinquedos com você agora</h3>

            {pedidosAtivos.length === 0 ? (
              <p className="empty-text">
                Você não possui nenhum aluguel ativo no momento. Que tal dar uma
                olhada na vitrine?
              </p>
            ) : (
              <div className="alugueis-grid">
                {pedidosAtivos.map((pedido) => (
                  <div key={pedido.id} className="item-alugado-card">
                    <div className="item-image-placeholder">
                      <span role="img" aria-label="brinquedo" style={{ fontSize: "2rem" }}>
                        📦
                      </span>
                    </div>

                    <div className="item-info">
                      <span className="status-badge">{pedido.status || "Em Uso"}</span>
                      <h4>Pedido #{pedido.id}</h4>
                      <p className="prazo-texto">
                        Prazo: <strong>{pedido.prazo_aluguel}</strong> dias | Valor: R$ {pedido.valor_total}
                      </p>
                    </div>

                    <div className="acoes-container">
                      <button
                        className="btn-acao btn-renovar"
                        onClick={() => handleRenovar(pedido.id)}
                      >
                        Renovar
                      </button>
                      <button
                        className="btn-acao btn-devolucao"
                        onClick={() => handleDevolver(pedido.id)}
                      >
                        Devolver
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}

        {/* Aba: Histórico */}
        {!loading && abaAtiva === "historico" && (
          <section className="bloco-alugueis">
            <h3 className="secao-titulo">Aluguéis anteriores</h3>
            {historicoPedidos.length === 0 ? (
              <p className="empty-text">Nenhum pedido anterior encontrado.</p>
            ) : (
              <div className="alugueis-grid">
                {historicoPedidos.map((pedido) => (
                  <div key={pedido.id} className="item-alugado-card historico-card">
                    <div className="item-image-placeholder">
                      <span role="img" aria-label="brinquedo" style={{ fontSize: "2rem" }}>
                        📦
                      </span>
                    </div>
                    <div className="item-info">
                      <span className="status-badge concluido">Concluído</span>
                      <h4>Pedido #{pedido.id}</h4>
                      <p className="prazo-texto">Total: R$ {pedido.valor_total}</p>
                    </div>
                    <div className="acoes-container">
                      <button
                        className="btn-acao btn-renovar"
                        onClick={() => navigate("/catalogo")}
                      >
                        Alugar de Novo
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}

        <footer className="dashboard-footer">
          <p>
            Precisa de suporte com as suas entregas ou coletas? Entre em contato
            via WhatsApp: <strong>(79) 99811-2997</strong>
          </p>
        </footer>
      </div>
    </div>
  );
};

export default AreaCliente;