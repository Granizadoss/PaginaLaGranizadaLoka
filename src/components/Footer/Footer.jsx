import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">

        <div className="footer-logo">
          <h2>🍧 La Granizada Loka</h2>
          <p>
            Los mejores granizados de la ciudad.
            Frescura, sabor y calidad en cada vaso.
          </p>
        </div>

        <div className="footer-links">
          <h3>Enlaces</h3>

          <a href="#">Inicio</a>
          <a href="#">Menú</a>
          <a href="#">Nosotros</a>
          <a href="#">Contacto</a>

        </div>

        <div className="footer-contact">
          <h3>Contacto</h3>

          <p>📍 Bogotá, Colombia</p>

          <p>📞 +57 300 000 0000</p>

          <p>✉ lagranizadaloka@gmail.com</p>

        </div>

      </div>

      <div className="footer-copy">
        © 2026 La Granizada Loka. Todos los derechos reservados.
      </div>

    </footer>
  );
}

export default Footer;