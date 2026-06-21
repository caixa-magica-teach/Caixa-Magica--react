// src/pages/carrinho/Carrinho.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Rodape from "../components/Rodape";
import { useCart } from "../context/CartContext";
import { criarPedido } from "../services/api";
import "./Carrinho.css";

const PERIODOS = [
  { dias: 1, label: "Diária" },
  { dias: 7, label: "7 Dias" },
  { dias: 15, label: "15 Dias" },
  { dias: 30, label: "1 Mês" },
];

export default function Carrinho() {
  const { itens, removerItem, limparCarrinho, total, quantidade } = useCart();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [sucesso, setSucesso] = useState(false);
  const [erro, setErro] = useState(null);

  // Logística
  const [logistica, setLogistica] = useState("retirada");
  const [endereco, setEndereco] = useState("");

  const confirmarPedido = async () => {
    if (itens.length === 0) return;
    if (logistica === "entrega" && !endereco.trim()) {
      setErro("Preencha o endereço de entrega.");
      return;
    }

    setLoading(true);
    setErro(null);

    try {
      // Monta o payload para a API
      const payload = {
        prazo_aluguel: itens[0].dias, // usa o prazo do primeiro item
        tipo_logistica: logistica,
        endereco_entrega: logistica === "entrega" ? endereco : "",
        valor_total: total,
        itens: itens.map((i) => ({
          brinquedo: i.id,
          preco_no_momento: i.precoTotal,
        })),
      };

      await criarPedido(payload);
      setSucesso(true);
      limparCarrinho();
    } catch {
      setErro("Não foi possível confirmar o pedido. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  // ── Tela de sucesso ──────────────────────────
  if (sucesso)
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

        {/* ── Carrinho vazio ── */}
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
            {/* ── Lista de itens ── */}
            <div className="carrinho-itens">
              {itens.map((item) => (
                <div key={item.id} className="carrinho-item">
                  <div className="item-img-box">
                    {item.imagem ? (
                      <img
                        src={item.imagem}
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
                      {PERIODOS.find((p) => p.dias === item.dias)?.label ||
                        `${item.dias} dias`}
                    </p>
                    <p className="item-base">
                      R$ {item.valorBase.toFixed(2).replace(".", ",")}/dia
                    </p>
                  </div>

                  <div className="item-direita">
                    <p className="item-preco">
                      R$ {item.precoTotal.toFixed(2).replace(".", ",")}
                    </p>
                    <button
                      className="btn-remover"
                      onClick={() => removerItem(item.id)}
                    >
                      Remover
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* ── Resumo + confirmação ── */}
            <div className="carrinho-resumo">
              <h3 className="resumo-titulo">Resumo do pedido</h3>

              <div className="resumo-linha">
                <span>
                  Subtotal ({quantidade} {quantidade === 1 ? "item" : "itens"})
                </span>
                <span>R$ {total.toFixed(2).replace(".", ",")}</span>
              </div>

              <div className="resumo-linha resumo-total">
                <span>Total</span>
                <span>R$ {total.toFixed(2).replace(".", ",")}</span>
              </div>

              {/* Logística */}
              <div className="resumo-secao">
                <label className="resumo-label">Como deseja receber?</label>
                <div className="logistica-opcoes">
                  <button
                    className={`btn-logistica ${logistica === "retirada" ? "ativo" : ""}`}
                    onClick={() => setLogistica("retirada")}
                  >
                    🏪 Retirada
                  </button>
                  <button
                    className={`btn-logistica ${logistica === "entrega" ? "ativo" : ""}`}
                    onClick={() => setLogistica("entrega")}
                  >
                    🚚 Entrega
                  </button>
                </div>
              </div>

              {/* Endereço — só aparece se for entrega */}
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
