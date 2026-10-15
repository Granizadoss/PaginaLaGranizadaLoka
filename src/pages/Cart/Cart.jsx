import { Link } from "react-router-dom";

import { useCart } from "../../context/CartContext";

import "./Cart.css";


function Cart() {

  const {
    cart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    getTotal,
  } = useCart();


  const total = getTotal();


  return (
    <main className="cart-page">


      {/* ========================================
          ENCABEZADO
      ======================================== */}

      <div className="cart-header">

        <h1>
          🛒 Tu carrito
        </h1>

        <p>
          Revisa tus granizados antes de realizar tu pedido.
        </p>

      </div>


      {/* ========================================
          CARRITO VACÍO
      ======================================== */}

      {cart.length === 0 ? (

        <section className="empty-cart">

          <div className="empty-cart-icon">
            🍧
          </div>

          <h2>
            Tu carrito está vacío
          </h2>

          <p>
            Todavía no has agregado ningún granizado.
          </p>

          <Link
            to="/menu"
            className="continue-button"
          >
            Ver nuestro menú
          </Link>

        </section>

      ) : (


        /* ========================================
           CARRITO CON PRODUCTOS
        ======================================== */

        <section className="cart-content">


          <div className="cart-products">

            {cart.map((producto) => (

              <article
                className="cart-item"
                key={producto.id}
              >


                {/* EMOJI */}

                <div className="cart-item-emoji">
                  {producto.emoji}
                </div>


                {/* INFORMACIÓN */}

                <div className="cart-item-info">

                  <h3>
                    {producto.nombre}
                  </h3>

                  <p className="cart-item-price">
                    ${producto.precio.toLocaleString("es-CO")}
                  </p>


                  {/* CANTIDAD */}

                  <div className="quantity-controls">

                    <button
                      type="button"
                      onClick={() =>
                        decreaseQuantity(producto.id)
                      }
                    >
                      −
                    </button>

                    <span>
                      {producto.cantidad}
                    </span>

                    <button
                      type="button"
                      onClick={() =>
                        increaseQuantity(producto.id)
                      }
                    >
                      +
                    </button>

                  </div>

                </div>


                {/* TOTAL PRODUCTO */}

                <div className="cart-item-total">

                  <strong>
                    $
                    {(
                      producto.precio *
                      producto.cantidad
                    ).toLocaleString("es-CO")}
                  </strong>


                  <button
                    type="button"
                    className="remove-button"
                    onClick={() =>
                      removeFromCart(producto.id)
                    }
                  >
                    🗑️ Eliminar
                  </button>

                </div>


              </article>

            ))}

          </div>


          {/* ========================================
              RESUMEN
          ======================================== */}

          <aside className="cart-summary">

            <h2>
              Resumen del pedido
            </h2>


            <div className="summary-line">

              <span>
                Productos
              </span>

              <span>
                {cart.reduce(
                  (total, producto) =>
                    total + producto.cantidad,
                  0
                )}
              </span>

            </div>


            <div className="summary-line total-line">

              <span>
                Total
              </span>

              <strong>
                ${total.toLocaleString("es-CO")}
              </strong>

            </div>


            {/* BOTÓN REALIZAR PEDIDO */}

            <Link
              to="/checkout"
              className="checkout-button"
            >
              Realizar pedido
            </Link>


            {/* SEGUIR COMPRANDO */}

            <Link
              to="/menu"
              className="continue-shopping"
            >
              ← Seguir comprando
            </Link>


          </aside>


        </section>

      )}

    </main>
  );
}


export default Cart;