import "./Hero.css";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="hero">

      <div className="hero-content">

        <span className="hero-tag">
          ❄️ Refrescantes • Naturales • Deliciosos
        </span>

        <h1>
          Los mejores <span>granizados</span> de la ciudad
        </h1>

        <p>
          Descubre sabores únicos preparados con ingredientes frescos,
          fruta natural y mucho hielo para refrescar cualquier momento.
        </p>

        <div className="hero-buttons">

          <Link to="/menu">
            <button className="primary-btn">
              🍧 Ver Menú
            </button>
          </Link>

          <Link to="/contacto">
            <button className="secondary-btn">
              📞 Contáctanos
            </button>
          </Link>

        </div>

      </div>

      <div className="hero-image">
        🥤
      </div>

    </section>
  );
}

export default Hero;