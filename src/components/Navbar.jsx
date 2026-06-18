// src/components/Navbar.jsx
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
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

        <div className="navbar-search">
          <input type="text" placeholder="Pesquisar Produto" />
          <span className="search-icon">🔍</span>
        </div>

        <button className="navbar-cart">🛒</button>
      </div>
    </nav>
  );
}

export default Navbar;
