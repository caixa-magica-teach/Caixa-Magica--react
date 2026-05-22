// src/components/Navbar.jsx
import logo from "../assets/logo.png";
import "./Navbar.css";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <img src={logo} alt="Caixa Mágica" className="navbar-logo" />

        <ul className="navbar-links">
          <li>
            <a href="#">Catálogo</a>
          </li>
          <li>
            <Link to="/pages/Login">Login</Link>
          </li>
          <li>
            <a href="#">Sobre</a>
          </li>
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
