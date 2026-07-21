// src/components/NewProducts.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getBrinquedos } from "../services/api";
import "./NewProducts.css";

function NewProducts() {
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getBrinquedos({ ordering: "-id" })
      .then((data) => {
        setProdutos(data.slice(0, 3)); // garante só 3 últimos
        setLoading(false);
      })
      .catch(() => {
        setErro("Não foi possível carregar.");
        setLoading(false);
      });
  }, []);

  return (
    <section className="new-products">
      <div className="new-products-inner">
        <h2 className="new-products-title">Acabou de chegar!</h2>
        <p className="new-products-sub">
          Confira nossos produtos mais recentes
        </p>

        {loading ? (
          <p className="new-products-loading">Carregando...</p>
        ) : erro ? (
          <p className="new-products-loading">{erro}</p>
        ) : (
          <div className="new-products-grid">
            {produtos.map((produto) => {
              const img = produto.imagens?.[0]?.imagem_url || null;
              return (
                <div key={produto.id} className="product-card">
                  <div className="product-img-wrap">
                    <span className="product-badge">NOVO</span>
                    {img ? (
                      <img
                        src={img}
                        alt={produto.nome}
                        className="product-img-real"
                      />
                    ) : (
                      <div className="product-img" />
                    )}
                  </div>
                  <div className="product-info">
                    <h3 className="product-name">{produto.nome}</h3>
                    <p className="product-desc">{produto.descricao_curta}</p>
                    <button
                      className="product-btn"
                      onClick={() => navigate(`/produto/${produto.id}`)}
                    >
                      Ver produto
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}

export default NewProducts;
