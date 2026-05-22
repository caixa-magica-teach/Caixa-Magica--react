// src/components/MostRented.jsx
import "./MostRented.css";

const items = [
  { id: 1, name: "Produto", description: "descrição", price: "R$" },
  { id: 2, name: "Produto", description: "descrição", price: "R$" },
];

function MostRented() {
  return (
    <section className="most-rented">
      <div className="most-rented-inner">
        <div className="most-rented-info">
          <h2 className="most-rented-title">Mais Alugados</h2>
          <p className="most-rented-desc">
            Produto entre os mais alugados da categoria, escolhido por clientes
            que buscam praticidade, qualidade e ótimo desempenho. Ideal para
            diferentes tipos de uso, oferecendo uma experiência confiável e
            eficiente. Conta com excelente aceitação, sendo uma das opções mais
            procuradas por unir custo-benefício, funcionalidade e facilidade de
            utilização.
          </p>
        </div>

        <div className="most-rented-cards">
          {items.map((item) => (
            <div key={item.id} className="rented-card">
              <div className="rented-img" />
              <div className="rented-footer">
                <span className="rented-price">{item.price}</span>
                <p className="rented-name">{item.name}</p>
                <p className="rented-sub">{item.description}</p>
              </div>
            </div>
          ))}

          <button className="rented-arrow">❯</button>
        </div>
      </div>
    </section>
  );
}

export default MostRented;
