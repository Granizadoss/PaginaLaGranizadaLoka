import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";

import { useProducts } from "../../context/ProductsContext";
import { useCart } from "../../context/CartContext";

import "./Product.css";


function Product() {

  const { id } = useParams();

  const navigate = useNavigate();

  const { products } = useProducts();

  const { addToCart } = useCart();

  const [cantidad, setCantidad] = useState(1);


  // ==========================================
  // BUSCAR PRODUCTO
  // ==========================================

  const producto = products.find(
    (item) => String(item.id) === String(id)
  );


  // ==========================================
  // SI NO EXISTE
  // ==========================================

  if (!producto) {

    return (

      <main className="product-page">

        <div className="product-not-found">

          <div className="product-not-found-icon">
            🥤
          </div>

          <h1>
            Producto no encontrado
          </h1>

          <p>
            El producto que buscas no existe
            o fue eliminado.
          </p>

          <button
            type="button"
            onClick={() => navigate("/menu")}
          >
            ← Volver al menú
          </button>

        </div>

      </main>

    );

  }


  // ==========================================
  // CAMBIAR CANTIDAD
  // ==========================================

  const aumentarCantidad = () => {

    setCantidad((cantidadActual) =>
      cantidadActual + 1
    );

  };


  const disminuirCantidad = () => {

    setCantidad((cantidadActual) =>
      Math.max(1, cantidadActual - 1)
    );

  };


  // ==========================================
  // PRECIO TOTAL
  // ==========================================

  const total = producto.precio * cantidad;


  // ==========================================
  // AGREGAR AL CARRITO
  // ==========================================

  const agregarAlCarrito = () => {

    addToCart(producto, cantidad);

    navigate("/carrito");

  };


  // ==========================================
  // VISTA
  // ==========================================

  return (

    <main className="product-page">

      <section className="product-detail">


        {/* ==================================
            BOTÓN VOLVER
        ================================== */}

        <button
          type="button"
          className="product-back"
          onClick={() => navigate("/menu")}
        >
          ← Volver al menú
        </button>


        {/* ==================================
            PRODUCTO
        ================================== */}

        <div className="product-content">


          {/* IMAGEN / EMOJI */}

          <div className="product-image">

            <span>
              {producto.emoji}
            </span>

          </div>


          {/* INFORMACIÓN */}

          <div className="product-info">

            <span className="product-category">

              {producto.categoria === "alcohol"
                ? "🍹 Con alcohol"
                : "🍓 Frutal"}

            </span>


            <h1>
              {producto.nombre}
            </h1>


            <p className="product-description">
              {producto.descripcion}
            </p>


            <div className="product-price">
              ${producto.precio.toLocaleString("es-CO")}
            </div>


            {/* CANTIDAD */}

            <div className="product-quantity">

              <span>
                Cantidad
              </span>

              <div className="quantity-controls">

                <button
                  type="button"
                  onClick={disminuirCantidad}
                >
                  −
                </button>

                <strong>
                  {cantidad}
                </strong>

                <button
                  type="button"
                  onClick={aumentarCantidad}
                >
                  +
                </button>

              </div>

            </div>


            {/* TOTAL */}

            <div className="product-total">

              <span>
                Total
              </span>

              <strong>
                ${total.toLocaleString("es-CO")}
              </strong>

            </div>


            {/* AGREGAR */}

            <button
              type="button"
              className="product-add-cart"
              onClick={agregarAlCarrito}
            >
              🛒 Agregar al carrito
            </button>

          </div>

        </div>

      </section>

    </main>

  );

}


export default Product;