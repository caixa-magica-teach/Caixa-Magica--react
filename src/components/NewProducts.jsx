// src/components/NewProducts.jsx
import "./NewProducts.css";

const products = [
  { id: 1, name: "Produto Novo", description: "Descrição do produto", isNew: true },
  { id: 2, name: "Produto Novo", description: "Descrição do produto", isNew: false },
  { id: 3, name: "Produto Novo", description: "Descrição do produto", isNew: true },
];

function NewProducts() {
  return (
    <section className="new-products">
      <div className="new-products-inner">
        <h2 className="new-products-title">Acabou de chegar!</h2>
        <p className="new-products-sub">Confira nossos produtos mais recentes</p>

        <div className="new-products-grid">
          {products.map((p) => (
            <div key={p.id} className="product-card">
              <div className="product-img-wrap">
                {p.isNew && <span className="product-badge">PRODUTO NOVO</span>}
                <div className="product-img" />
              </div>
              <div className="product-info">
                <h3 className="product-name">{p.name}</h3>
                <p className="product-desc">{p.description}</p>
                <button className="product-btn">Compre Agora</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default NewProducts;
