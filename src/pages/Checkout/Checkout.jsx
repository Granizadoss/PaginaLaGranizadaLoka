import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";

import "./Checkout.css";

function Checkout() {
  const { cart, getTotal, clearCart } = useCart();

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nombre: "",
    telefono: "",
    direccion: "",
    barrio: "",
    metodoPago: "",
    observaciones: "",
  });

  const [errores, setErrores] = useState({});

  const total = getTotal();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    if (errores[name]) {
      setErrores({
        ...errores,
        [name]: "",
      });
    }
  };

  const validarFormulario = () => {
    const nuevosErrores = {};

    if (!formData.nombre.trim()) {
      nuevosErrores.nombre =
        "Ingresa tu nombre completo.";
    }

    if (!formData.telefono.trim()) {
      nuevosErrores.telefono =
        "Ingresa tu número de teléfono.";
    } else if (
      !/^[0-9+\s-]{7,15}$/.test(formData.telefono)
    ) {
      nuevosErrores.telefono =
        "Ingresa un número de teléfono válido.";
    }

    if (!formData.direccion.trim()) {
      nuevosErrores.direccion =
        "Ingresa la dirección de entrega.";
    }

    if (!formData.barrio.trim()) {
      nuevosErrores.barrio =
        "Ingresa tu barrio.";
    }

    if (!formData.metodoPago) {
      nuevosErrores.metodoPago =
        "Selecciona un método de pago.";
    }

    setErrores(nuevosErrores);

    return Object.keys(nuevosErrores).length === 0;
  };

  const generarNumeroPedido = () => {
    const numero = Math.floor(
      1000 + Math.random() * 9000
    );

    return `#GL-${numero}`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validarFormulario()) {
      return;
    }

    const numeroPedido = generarNumeroPedido();

   const usuarioActivo =
  JSON.parse(
    localStorage.getItem("usuarioActivo")
  );

const pedido = {
  numeroPedido: numeroPedido,

  datosCliente: {
    nombre: formData.nombre,
    telefono: formData.telefono,
    direccion: formData.direccion,
    barrio: formData.barrio,
    metodoPago: formData.metodoPago,
    observaciones: formData.observaciones,

    // Datos de la cuenta que realizó el pedido
    correo:
      usuarioActivo?.correo || "",
  },

  // Identificador del cliente
  usuarioCorreo:
    usuarioActivo?.correo || "",

  productos: cart,

  total: total,

  fecha: new Date().toLocaleString("es-CO"),

  // Estado inicial
  estado: "Pendiente",
};

    /*
      ========================================
      GUARDAR PEDIDO EN LOCALSTORAGE
      ========================================
    */

    const pedidosGuardados =
      JSON.parse(
        localStorage.getItem("pedidos")
      ) || [];

    pedidosGuardados.push(pedido);

    localStorage.setItem(
      "pedidos",
      JSON.stringify(pedidosGuardados)
    );

    /*
      ========================================
      VACIAR CARRITO
      ========================================
    */

    clearCart();

    /*
      ========================================
      IR A CONFIRMACIÓN
      ========================================
    */

    navigate("/confirmacion", {
      state: pedido,
    });
  };

  /*
    ========================================
    CARRITO VACÍO
    ========================================
  */

  if (cart.length === 0) {
    return (
      <main className="checkout-page">

        <section className="checkout-empty">

          <div className="checkout-empty-icon">
            🛒
          </div>

          <h1>
            Tu carrito está vacío
          </h1>

          <p>
            Agrega algunos granizados antes de
            continuar con tu pedido.
          </p>

          <Link
            to="/menu"
            className="checkout-back-button"
          >
            Ver nuestro menú
          </Link>

        </section>

      </main>
    );
  }

  /*
    ========================================
    CHECKOUT
    ========================================
  */

  return (
    <main className="checkout-page">

      <div className="checkout-header">

        <h1>
          🧾 Finalizar pedido
        </h1>

        <p>
          Completa tus datos para realizar tu pedido.
        </p>

      </div>

      <section className="checkout-content">

        {/* ========================================
            FORMULARIO
        ======================================== */}

        <form
          className="checkout-form"
          onSubmit={handleSubmit}
        >

          {/* DATOS DE ENTREGA */}

          <div className="checkout-section">

            <h2>
              📋 Datos de entrega
            </h2>

            {/* NOMBRE */}

            <div className="form-group">

              <label htmlFor="nombre">
                Nombre completo
              </label>

              <input
                id="nombre"
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                placeholder="Escribe tu nombre completo"
              />

              {errores.nombre && (
                <span className="form-error">
                  {errores.nombre}
                </span>
              )}

            </div>

            {/* TELÉFONO */}

            <div className="form-group">

              <label htmlFor="telefono">
                Número de teléfono
              </label>

              <input
                id="telefono"
                type="tel"
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
                placeholder="Ej: 300 123 4567"
              />

              {errores.telefono && (
                <span className="form-error">
                  {errores.telefono}
                </span>
              )}

            </div>

            {/* DIRECCIÓN */}

            <div className="form-group">

              <label htmlFor="direccion">
                Dirección de entrega
              </label>

              <input
                id="direccion"
                type="text"
                name="direccion"
                value={formData.direccion}
                onChange={handleChange}
                placeholder="Ej: Calle 123 #45-67"
              />

              {errores.direccion && (
                <span className="form-error">
                  {errores.direccion}
                </span>
              )}

            </div>

            {/* BARRIO */}

            <div className="form-group">

              <label htmlFor="barrio">
                Barrio
              </label>

              <input
                id="barrio"
                type="text"
                name="barrio"
                value={formData.barrio}
                onChange={handleChange}
                placeholder="Ej: Chapinero"
              />

              {errores.barrio && (
                <span className="form-error">
                  {errores.barrio}
                </span>
              )}

            </div>

            {/* OBSERVACIONES */}

            <div className="form-group">

              <label htmlFor="observaciones">
                Observaciones
              </label>

              <textarea
                id="observaciones"
                name="observaciones"
                value={formData.observaciones}
                onChange={handleChange}
                placeholder="¿Alguna indicación especial para tu pedido?"
                rows="4"
              />

            </div>

          </div>

          {/* ========================================
              MÉTODO DE PAGO
          ======================================== */}

          <div className="checkout-section">

            <h2>
              💳 Método de pago
            </h2>

            <div className="payment-options">

              {/* EFECTIVO */}

              <label className="payment-option">

                <input
                  type="radio"
                  name="metodoPago"
                  value="Efectivo"
                  checked={
                    formData.metodoPago ===
                    "Efectivo"
                  }
                  onChange={handleChange}
                />

                <span>
                  💵 Efectivo
                </span>

              </label>

              {/* NEQUI */}

              <label className="payment-option">

                <input
                  type="radio"
                  name="metodoPago"
                  value="Nequi"
                  checked={
                    formData.metodoPago ===
                    "Nequi"
                  }
                  onChange={handleChange}
                />

                <span>
                  📱 Nequi
                </span>

              </label>

              {/* DAVIPLATA */}

              <label className="payment-option">

                <input
                  type="radio"
                  name="metodoPago"
                  value="Daviplata"
                  checked={
                    formData.metodoPago ===
                    "Daviplata"
                  }
                  onChange={handleChange}
                />

                <span>
                  📱 Daviplata
                </span>

              </label>

            </div>

            {errores.metodoPago && (
              <span className="form-error">
                {errores.metodoPago}
              </span>
            )}

          </div>

          {/* ========================================
              CONFIRMAR PEDIDO
          ======================================== */}

          <button
            type="submit"
            className="place-order-button"
          >
            🛒 Confirmar pedido
          </button>

          <Link
            to="/carrito"
            className="checkout-return-button"
          >
            ← Volver al carrito
          </Link>

        </form>

        {/* ========================================
            RESUMEN DEL PEDIDO
        ======================================== */}

        <aside className="checkout-summary">

          <h2>
            🛒 Resumen del pedido
          </h2>

          <div className="checkout-products">

            {cart.map((producto) => (

              <div
                className="checkout-product"
                key={producto.id}
              >

                <div className="checkout-product-emoji">
                  {producto.emoji}
                </div>

                <div className="checkout-product-info">

                  <h3>
                    {producto.nombre}
                  </h3>

                  <p>
                    Cantidad: {producto.cantidad}
                  </p>

                  <strong>
                    $
                    {(
                      producto.precio *
                      producto.cantidad
                    ).toLocaleString("es-CO")}
                  </strong>

                </div>

              </div>

            ))}

          </div>

          {/* TOTAL */}

          <div className="checkout-total">

            <span>
              Total
            </span>

            <strong>
              ${total.toLocaleString("es-CO")}
            </strong>

          </div>

        </aside>

      </section>

    </main>
  );
}

export default Checkout;