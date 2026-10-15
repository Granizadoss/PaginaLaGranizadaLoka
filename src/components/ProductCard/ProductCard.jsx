import { Link } from "react-router-dom";

import "./ProductCard.css";

function ProductCard({ producto }) {

  if (!producto) {
    return null;
  }

  return (
    <article className="product-card">

      {/* =====================================
          EMOJI / IMAGEN
      ===================================== */}

      <div className="product-card-image">

        <span className="product-emoji">
          {producto.emoji || "🥤"}
        </span>

      </div>


      {/* =====================================
          INFORMACIÓN
      ===================================== */}

      <div className="product-card-content">

        <h3>
          {producto.nombre}
        </h3>


        <p className="product-description">
          {producto.descripcion ||
            "Delicioso granizado preparado con ingredientes frescos."}
        </p>


        {/* ===================================
            PRECIO
        =================================== */}

        <div className="product-price">

          $
          {Number(producto.precio || 0).toLocaleString(
            "es-CO"
          )}

        </div>


        {/* ===================================
            BOTÓN
        =================================== */}

        <Link
          to={`/producto/${producto.id}`}
          className="product-button"
        >
          Ver producto
        </Link>

      </div>

    </article>
  );
}

export default ProductCard;