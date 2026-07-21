// src/components/MostRented.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getBrinquedos } from "../services/api";
import "./MostRented.css";

function MostRented() {
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [indice, setIndice] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    getBrinquedos({ ordering: "-id" })
      .then((data) => {
        setProdutos(data.slice(0, 6));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // Navega entre os cards de 2 em 2
  const irProximo = () =>
    setIndice((i) => Math.min(i + 2, produtos.length - 2));
  const irAnterior = () => setIndice((i) => Math.max(i - 2, 0));
  const visiveis = produtos.slice(indice, indice + 2);

  if (loading)
    return (
      <section className="most-rented">
        <div className="most-rented-inner">
          <div className="most-rented-info">
            <h2 className="most-rented-title">Mais Alugados</h2>
          </div>
          <div className="most-rented-cards">
            {[1, 2].map((i) => (
              <div key={i} className="rented-card skeleton">
                <div className="rented-img" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );

  if (produtos.length === 0) return null;

  return (
    <section className="most-rented">
      <div className="most-rented-inner">
        {/* Texto esquerdo */}
        <div className="most-rented-info">
          <h2 className="most-rented-title">Mais Alugados</h2>
          <p className="most-rented-desc">
            Produtos escolhidos por clientes que buscam praticidade, qualidade e
            ótimo desempenho. Ideais para diferentes tipos de uso, oferecendo
            uma experiência confiável e eficiente.
          </p>
        </div>

        {/* Cards + setas */}
        <div className="most-rented-cards">
          {/* Seta anterior */}
          {indice > 0 && (
            <button className="rented-arrow left" onClick={irAnterior}>
              ❮
            </button>
          )}

          {/* 5️⃣ cards com dados reais */}
          {visiveis.map((produto) => {
            const img = produto.imagens?.[0]?.imagem_url || null;
            return (
              <div
                key={produto.id}
                className="rented-card"
                onClick={() => navigate(`/produto/${produto.id}`)}
                style={{ cursor: "pointer" }}
              >
                <div className="rented-img">
                  {img ? (
                    <img
                      src={img}
                      alt={produto.nome}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                      }}
                      onError={(e) => {
                        e.target.style.display = "none";
                      }}
                    />
                  ) : null}
                </div>
                <div className="rented-footer">
                  {produto.valor_base && (
                    <span className="rented-price">
                      R${" "}
                      {parseFloat(produto.valor_base)
                        .toFixed(2)
                        .replace(".", ",")}
                    </span>
                  )}
                  <p className="rented-name">{produto.nome}</p>
                  <p className="rented-sub">{produto.descricao_curta}</p>
                </div>
              </div>
            );
          })}

          {/* Seta próximo */}
          {indice + 2 < produtos.length && (
            <button className="rented-arrow" onClick={irProximo}>
              ❯
            </button>
          )}
        </div>
      </div>
    </section>
  );
}

export default MostRented;
