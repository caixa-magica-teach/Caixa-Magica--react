// src/components/Footer.jsx
import logo from "../assets/logo.png";
import "./Rodape.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        {/* Newsletter */}
        <div className="footer-newsletter"></div>
        <div className="footer-bottom">
          {/* Logo + redes sociais */}
          <div className="footer-brand">
            <img src={logo} alt="Caixa Mágica" className="footer-logo" />
            <div className="footer-social">
              <a href="#" aria-label="Whatsapp">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                </svg>
              </a>
              <a
                href="https://www.instagram.com/caixamagica_/"
                aria-label="Instagram"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle
                    cx="17.5"
                    cy="6.5"
                    r="1"
                    fill="currentColor"
                    stroke="none"
                  />
                </svg>
              </a>
            </div>
          </div>

          {/* Links */}
          <div className="footer-links">
            <div className="footer-col">
              <h4>Ajuda</h4>
              <a href="#">Serviço</a>
              <a href="#">Contatos</a>
              <a href="#">Contrato de Locação</a>
            </div>
            <div className="footer-col">
              <h4>Outros</h4>
              <a href="#">Política de Privacidade</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
