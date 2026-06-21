// src/components/Navbar.jsx
import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { useCart } from "../context/CartContext";
import { getBrinquedos } from "../services/api";
import "./Navbar.css";

function Navbar() {
  const [busca, setBusca]         = useState("");
  const [previa, setPrevia]       = useState([]);
  const [mostrarPrevia, setMostrarPrevia] = useState(false);
  const [carregando, setCarregando] = useState(false);
  const { quantidade }            = useCart();
  const navigate                  = useNavigate();
  const wrapRef                   = useRef(null);
  const timerRef                  = useRef(null);

  // Fecha a prévia ao clicar fora
  useEffect(() => {
    const handler = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) {
        setMostrarPrevia(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Busca com debounce — espera 350ms após o usuário parar de digitar
  useEffect(() => {
    clearTimeout(timerRef.current);

    if (busca.trim().length < 2) {
      setPrevia([]);
      setMostrarPrevia(false);
      return;
    }

    setCarregando(true);
    timerRef.current = setTimeout(() => {
      getBrinquedos({ search: busca.trim() })
        .then((data) => {
          setPrevia(data.slice(0, 5)); // máximo 5 itens na prévia
          setMostrarPrevia(true);
          setCarregando(false);
        })
        .catch(() => {
          setPrevia([]);
          setCarregando(false);
        });
    }, 350);

    return () => clearTimeout(timerRef.current);
  }, [busca]);

  const irParaProduto = (id) => {
    setBusca("");
    setMostrarPrevia(false);
    navigate(`/produto/${id}`);
  };

  const irParaCatalogo = () => {
    if (!busca.trim()) return;
    navigate(`/catalogo?search=${encodeURIComponent(busca.trim())}`);
    setBusca("");
    setMostrarPrevia(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") irParaCatalogo();
    if (e.key === "Escape") setMostrarPrevia(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <Link to="/">
          <img src={logo} alt="Caixa Mágica" className="navbar-logo" />
        </Link>

        <ul className="navbar-links">
          <li><Link to="/catalogo">Catálogo</Link></li>
          <li><Link to="/login">Login</Link></li>
          <li><a href="#">Sobre</a></li>
        </ul>

        {/* ── Busca com prévia ── */}
        <div className="navbar-search" ref={wrapRef}>
          <input
            type="text"
            placeholder="Pesquisar Produto"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => previa.length > 0 && setMostrarPrevia(true)}
            autoComplete="off"
          />
          <span className="search-icon" onClick={irParaCatalogo}>
            {carregando ? "⏳" : "🔍"}
          </span>

          {/* Dropdown de prévia */}
          {mostrarPrevia && (
            <div className="search-previa">
              {previa.length === 0 ? (
                <div className="previa-vazio">Nenhum resultado encontrado</div>
              ) : (
                <>
                  {previa.map((produto) => {
                    const img = produto.imagens?.[0]?.imagem_url || null;
                    return (
                      <div
                        key={produto.id}
                        className="previa-item"
                        onClick={() => irParaProduto(produto.id)}
                      >
                        <div className="previa-img">
                          {img
                            ? <img src={img} alt={produto.nome} onError={(e) => { e.target.style.display = "none"; }} />
                            : <div className="previa-img-placeholder" />
                          }
                        </div>
                        <div className="previa-info">
                          <p className="previa-nome">{produto.nome}</p>
                          <p className="previa-preco">
                            {produto.valor_base
                              ? `R$ ${parseFloat(produto.valor_base).toFixed(2).replace(".", ",")}/dia`
                              : produto.categoria?.nome || ""}
                          </p>
                        </div>
                      </div>
                    );
                  })}

                  {/* Ver todos os resultados */}
                  <button className="previa-ver-todos" onClick={irParaCatalogo}>
                    Ver todos os resultados para "{busca}"
                  </button>
                </>
              )}
            </div>
          )}
        </div>

        {/* ── Carrinho ── */}
        <button className="navbar-cart" onClick={() => navigate("/carrinho")}>
          🛒
          {quantidade > 0 && (
            <span className="cart-badge">{quantidade}</span>
          )}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
