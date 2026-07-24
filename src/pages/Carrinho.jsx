// src/pages/carrinho/Carrinho.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Rodape from "../components/Rodape";
import { useCart } from "../context/CartContext";
import { criarPedido } from "../services/api";
import "./Carrinho.css";

// Prazos alinhados exatamente com o PRAZO_CHOICES do seu models.py no Django
const PRAZOS_DISPONIVEIS = [
  { dias: 7, label: "7 Dias" },
  { dias: 15, label: "15 Dias" },
  { dias: 30, label: "30 Dias (1 Mês)" },
];

export default function Carrinho() {
  const { itens, removerItem, limparCarrinho, quantidade } = useCart();
  const navigate = useNavigate();

  // Estados de controle da tela
  const [loading, setLoading] = useState(false);
  const [sucesso, setSucesso] = useState(false);
  const [erro, setErro] = useState(null);

  // Estado do Prazo Global do pedido (exigido como valor único no seu Django: 7, 15 ou 30)
  const [prazoSelecionado, setPrazoSelecionado] = useState(7);

  // Estado da Logística ('retirada' ou 'entrega', conforme LOGISTICA_CHOICES)
  const [logistica, setLogistica] = useState("retirada");
  const [endereco, setEndereco] = useState("");

  // Cálculo Dinâmico: Diária do item * Dias selecionados no resumo
  const calcularPrecoItem = (valorBase) => {
    return Number(valorBase) * prazoSelecionado;
  };

  // Soma o Total Geral com base no Prazo Global escolhido
  const valorTotalCarrinho = itens.reduce((acc, item) => {
    const base = item.valorBase || item.valor_base || 0;
    return acc + calcularPrecoItem(base);
  }, 0);

  const confirmarPedido = async () => {
    if (itens.length === 0) return;

    if (logistica === "entrega" && !endereco.trim()) {
      setErro("Por favor, preencha o endereço para entrega.");
      return;
    }

    setLoading(true);
    setErro(null);

    try {
      // Montagem do payload estritamente compatível com os modelos Pedido e ItemPedido
      const payload = {
        prazo_aluguel: Number(prazoSelecionado),
        tipo_logistica: logistica,
        endereco_entrega: logistica === "entrega" ? endereco : null,
        valor_total: Number(valorTotalCarrinho.toFixed(2)),
        itens: itens.map((item) => ({
          brinquedo: item.id || item.brinquedo,
          preco_no_momento: Number(
            calcularPrecoItem(item.valorBase || item.valor_base).toFixed(2),
          ),
        })),
      };

      await criarPedido(payload);
      setSucesso(true);
      limparCarrinho();
    } catch (error) {
      console.error("Erro ao criar pedido:", error);
      setErro(
        "Não foi possível confirmar o pedido. Verifique se você está logado.",
      );
    } finally {
      setLoading(false);
    }
  };

  // ── Tela de Sucesso ──────────────────────────
  if (sucesso) {
    return (
      <div className="carrinho-container">
        <Navbar />
        <div className="carrinho-sucesso">
          <div className="sucesso-icon">✓</div>
          <h2>Pedido confirmado!</h2>
          <p>Entraremos em contato para combinar os detalhes.</p>
          <button
            className="btn-continuar"
            onClick={() => navigate("/catalogo")}
          >
            Continuar alugando
          </button>
        </div>
        <Rodape />
      </div>
    );
  }

  // ── Tela Principal do Carrinho ───────────────
  return (
    <div className="carrinho-container">
      <Navbar />

      <main className="carrinho-main">
        <button className="btn-voltar-link" onClick={() => navigate(-1)}>
          ← Voltar
        </button>

        <h1 className="carrinho-titulo">
          Meu Carrinho
          {quantidade > 0 && (
            <span className="carrinho-badge">{quantidade}</span>
          )}
        </h1>

        {/* ── Carrinho Vazio ── */}
        {itens.length === 0 ? (
          <div className="carrinho-vazio">
            <p className="vazio-icon">🛒</p>
            <p className="vazio-texto">Seu carrinho está vazio</p>
            <button
              className="btn-continuar"
              onClick={() => navigate("/catalogo")}
            >
              Ver brinquedos
            </button>
          </div>
        ) : (
          <div className="carrinho-grid">
            {/* ── Lista de Itens ── */}
            <div className="carrinho-itens">
              {itens.map((item) => {
                const idItem = item.id || item.brinquedo;
                const baseItem = item.valorBase || item.valor_base || 0;
                const imgItem = item.imagem || item.imagem_url;
                const precoCalculado = calcularPrecoItem(baseItem);

                return (
                  <div key={idItem} className="carrinho-item">
                    <div className="item-img-box">
                      {imgItem ? (
                        <img
                          src={imgItem}
                          alt={item.nome}
                          className="item-img"
                        />
                      ) : (
                        <div className="item-img-placeholder" />
                      )}
                    </div>

                    <div className="item-info">
                      <p className="item-nome">{item.nome}</p>
                      <p className="item-periodo">
                        Aluguel de {prazoSelecionado} Dias
                      </p>
                      <p className="item-base">
                        R$ {Number(baseItem).toFixed(2).replace(".", ",")}/dia
                      </p>
                    </div>

                    <div className="item-direita">
                      <p className="item-preco">
                        R$ {precoCalculado.toFixed(2).replace(".", ",")}
                      </p>
                      <button
                        className="btn-remover"
                        onClick={() => removerItem(idItem)}
                      >
                        Remover
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* ── Resumo + Confirmação ── */}
            <div className="carrinho-resumo">
              <h3 className="resumo-titulo">Resumo do pedido</h3>

              {/* Seletor de Prazo Global (7, 15 ou 30 dias) */}
              <div className="resumo-secao" style={{ marginBottom: "10px" }}>
                <label className="resumo-label">Prazo do Aluguel</label>
                <div className="logistica-opcoes">
                  {PRAZOS_DISPONIVEIS.map((p) => (
                    <button
                      key={p.dias}
                      type="button"
                      className={`btn-logistica ${prazoSelecionado === p.dias ? "ativo" : ""}`}
                      onClick={() => setPrazoSelecionado(p.dias)}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="resumo-linha">
                <span>
                  Subtotal ({quantidade} {quantidade === 1 ? "item" : "itens"})
                </span>
                <span>
                  R$ {valorTotalCarrinho.toFixed(2).replace(".", ",")}
                </span>
              </div>

              <div className="resumo-linha resumo-total">
                <span>Total</span>
                <span>
                  R$ {valorTotalCarrinho.toFixed(2).replace(".", ",")}
                </span>
              </div>

              {/* Seletor de Logística (Retirada ou Entrega) */}
              <div className="resumo-secao" style={{ marginTop: "10px" }}>
                <label className="resumo-label">Como deseja receber?</label>
                <div className="logistica-opcoes">
                  <button
                    type="button"
                    className={`btn-logistica ${logistica === "retirada" ? "ativo" : ""}`}
                    onClick={() => setLogistica("retirada")}
                  >
                    🏪 Retirada
                  </button>
                  <button
                    type="button"
                    className={`btn-logistica ${logistica === "entrega" ? "ativo" : ""}`}
                    onClick={() => setLogistica("entrega")}
                  >
                    🚚 Entrega
                  </button>
                </div>
              </div>

              {/* Campo de Endereço (Condicional para Entrega) */}
              {logistica === "entrega" && (
                <div className="resumo-secao">
                  <label className="resumo-label">Endereço de entrega</label>
                  <textarea
                    className="endereco-input"
                    placeholder="Rua, número, bairro, cidade..."
                    value={endereco}
                    onChange={(e) => setEndereco(e.target.value)}
                    rows={3}
                  />
                </div>
              )}

              {erro && <p className="resumo-erro">⚠️ {erro}</p>}

              <button
                className="btn-confirmar"
                onClick={confirmarPedido}
                disabled={loading}
              >
                {loading ? "Confirmando..." : "Confirmar pedido"}
              </button>

              <button
                className="btn-continuar-comprando"
                onClick={() => navigate("/catalogo")}
              >
                Continuar alugando
              </button>
            </div>
          </div>
        )}
      </main>

      <Rodape />
    </div>
  );
}
