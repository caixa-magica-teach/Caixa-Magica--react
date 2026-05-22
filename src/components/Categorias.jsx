// src/components/Categories.jsx
import "./Categorias.css";

const categories = [
  { id: 1, label: "Para mamães" },
  { id: 2, label: "Kits" },
  { id: 3, label: "Brinquedos de Papelão" },
];

function Categories() {
  return (
    <section className="categories">
      <div className="categories-inner">
        {categories.map((cat) => (
          <div key={cat.id} className="category-card">
            <div className="category-img" />
            <p className="category-label">{cat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Categories;
