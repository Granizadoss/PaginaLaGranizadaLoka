import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import "./Confirmation.css";

function Confirmation() {
  const location = useLocation();

  const pedidoRecibido = location.state;

  const [pedido, setPedido] = useState(pedidoRecibido || null);

  /*
    ========================================
    BUSCAR EL PEDIDO EN LOCALSTORAGE
    ========================================
  */

  useEffect(() => {
    if (pedidoRecibido) {
      setPedido(pedidoRecibido);
      return;
    }

    const pedidosGuardados =
      JSON.parse(localStorage.getItem("pedidos")) || [];

    if (pedidosGuardados.length > 0) {
      const ultimoPedido =
        pedidosGuardados[pedidosGuardados.length - 1];

      setPedido(ultimoPedido);
    }
  }, [pedidoRecibido]);

  /*
    ========================================
    ACTUALIZAR ESTADO DEL PEDIDO
    ========================================
  */

  useEffect(() => {
    if (!pedido?.numeroPedido) {
      return;
    }

    const actualizarPedido = () => {
      const pedidosGuardados =
        JSON.parse(
          localStorage.getItem("pedidos")
        ) || [];

      const pedidoActual = pedidosGuardados.find(
        (item) =>
          item.numeroPedido ===
          pedido.numeroPedido
      );

      if (pedidoActual) {
        setPedido(pedidoActual);
      }
    };

    actualizarPedido();

    const intervalo = setInterval(
      actualizarPedido,
      1000
    );

    return () => {
      clearInterval(intervalo);
    };
  }, [pedido?.numeroPedido]);

  /*
    ========================================
    SIN PEDIDO
    ========================================
  */

  if (!pedido) {
    return (
      <main className="confirmation-page">

        <section className="confirmation-card">

          <div className="confirmation-icon">
            ❓
          </div>

          <h1>
            No encontramos el pedido
          </h1>

          <p className="confirmation-message">
            No hay información de un pedido para
            mostrar.
          </p>

          <div className="confirmation-buttons">

            <Link
              to="/menu"
              className="confirmation-primary-button"
            >
              🍧 Ir al menú
            </Link>

            <Link
              to="/"
              className="confirmation-secondary-button"
            >
              🏠 Volver al inicio
            </Link>

          </div>

        </section>

      </main>
    );
  }

  /*
    ========================================
    ESTADO DEL PEDIDO
    ========================================
  */

  const estado = pedido.estado || "Pendiente";

  const obtenerClaseEstado = () => {
    switch (estado) {
      case "Pendiente":
        return "confirmation-status-pendiente";

      case "En preparación":
        return "confirmation-status-preparacion";

      case "En camino":
        return "confirmation-status-camino";

      case "Entregado":
        return "confirmation-status-entregado";

      default:
        return "confirmation-status-pendiente";
    }
  };

  const obtenerIconoEstado = () => {
    switch (estado) {
      case "Pendiente":
        return "🟡";

      case "En preparación":
        return "🔵";

      case "En camino":
        return "🟠";

      case "Entregado":
        return "🟢";

      default:
        return "🟡";
    }
  };

  return (
    <main className="confirmation-page">

      <section className="confirmation-card">

        {/* ========================================
            ICONO
        ======================================== */}

        <div className="confirmation-icon">
          ✓
        </div>


        {/* ========================================
            ENCABEZADO
        ======================================== */}

        <h1>
          ¡Pedido realizado!
        </h1>

        <p className="confirmation-message">
          Gracias por realizar tu pedido en
          La Granizada Loka.
        </p>


        {/* ========================================
            NÚMERO DE PEDIDO
        ======================================== */}

        <div className="order-number">

          <span>
            Número de pedido
          </span>

          <strong>
            {pedido.numeroPedido}
          </strong>

        </div>


        {/* ========================================
            ESTADO DEL PEDIDO
        ======================================== */}

        <div className="confirmation-status">

          <span className="confirmation-status-title">
            Estado del pedido
          </span>

          <div
            className={`confirmation-status-badge ${obtenerClaseEstado()}`}
          >
            <span>
              {obtenerIconoEstado()}
            </span>

            <strong>
              {estado}
            </strong>
          </div>

        </div>


        {/* ========================================
            INFORMACIÓN DEL CLIENTE
        ======================================== */}

        <div className="confirmation-details">

          <h2>
            📋 Datos de entrega
          </h2>

          <div className="detail-row">

            <span>
              Nombre
            </span>

            <strong>
              {pedido.datosCliente?.nombre}
            </strong>

          </div>

          <div className="detail-row">

            <span>
              Teléfono
            </span>

            <strong>
              {pedido.datosCliente?.telefono}
            </strong>

          </div>

          <div className="detail-row">

            <span>
              Dirección
            </span>

            <strong>
              {pedido.datosCliente?.direccion}
            </strong>

          </div>

          <div className="detail-row">

            <span>
              Barrio
            </span>

            <strong>
              {pedido.datosCliente?.barrio}
            </strong>

          </div>

          <div className="detail-row">

            <span>
              Método de pago
            </span>

            <strong>
              {pedido.datosCliente?.metodoPago}
            </strong>

          </div>

          {pedido.datosCliente?.observaciones && (

            <div className="detail-row">

              <span>
                Observaciones
              </span>

              <strong>
                {pedido.datosCliente.observaciones}
              </strong>

            </div>

          )}

        </div>


        {/* ========================================
            PRODUCTOS
        ======================================== */}

        <div className="confirmation-products">

          <h2>
            🛒 Tu pedido
          </h2>

          {pedido.productos?.map((producto) => (

            <div
              className="confirmation-product"
              key={producto.id}
            >

              <div className="confirmation-product-main">

                <div className="confirmation-product-emoji">
                  {producto.emoji}
                </div>

                <div>

                  <strong>
                    {producto.nombre}
                  </strong>

                  <p>
                    Cantidad: {producto.cantidad}
                  </p>

                </div>

              </div>

              <strong>
                $
                {(
                  producto.precio *
                  producto.cantidad
                ).toLocaleString("es-CO")}
              </strong>

            </div>

          ))}


          {/* ======================================
              TOTAL
          ====================================== */}

          <div className="confirmation-total">

            <span>
              Total
            </span>

            <strong>
              $
              {pedido.total?.toLocaleString(
                "es-CO"
              )}
            </strong>

          </div>

        </div>


        {/* ========================================
            MENSAJE
        ======================================== */}

        <div className="confirmation-thanks">

          <strong>
            🎉 ¡Gracias por tu compra!
          </strong>

          <p>
            Puedes consultar el estado de tu pedido
            mientras lo preparamos.
          </p>

        </div>


        {/* ========================================
            BOTONES
        ======================================== */}

        <div className="confirmation-buttons">

          <Link
            to="/menu"
            className="confirmation-primary-button"
          >
            🍧 Seguir comprando
          </Link>

          <Link
            to="/"
            className="confirmation-secondary-button"
          >
            🏠 Volver al inicio
          </Link>

        </div>

      </section>

    </main>
  );
}

export default Confirmation;