import { useEffect, useState } from "react";

import "./Pedidos.css";

function Pedidos() {

  const [pedidos, setPedidos] = useState([]);

  const [usuarioActivo, setUsuarioActivo] =
    useState(null);


  // =========================================
  // CARGAR USUARIO
  // =========================================

  useEffect(() => {

    const usuario =
      JSON.parse(
        localStorage.getItem("usuarioActivo")
      );

    setUsuarioActivo(usuario);

  }, []);


  // =========================================
  // CARGAR PEDIDOS
  // =========================================

  useEffect(() => {

    if (!usuarioActivo) {
      return;
    }

    const pedidosGuardados =
      JSON.parse(
        localStorage.getItem("pedidos")
      ) || [];


    // =======================================
    // ADMIN
    // =======================================

    if (usuarioActivo.rol === "admin") {

      setPedidos(pedidosGuardados);

      return;

    }


    // =======================================
    // CLIENTE
    // =======================================

    const misPedidos =
      pedidosGuardados.filter(
        (pedido) =>
          pedido.usuarioCorreo ===
          usuarioActivo.correo
      );


    setPedidos(misPedidos);

  }, [usuarioActivo]);


  // =========================================
  // FORMATEAR PRECIO
  // =========================================

  const formatoPrecio = (precio) => {

    return Number(
      precio || 0
    ).toLocaleString("es-CO");

  };


  // =========================================
  // ESTILO DEL ESTADO
  // =========================================

  const obtenerClaseEstado = (estado) => {

    switch (estado) {

      case "En preparación":
        return "estado-preparacion";

      case "En camino":
        return "estado-camino";

      case "Entregado":
        return "estado-entregado";

      default:
        return "estado-pendiente";

    }

  };


  // =========================================
  // SIN SESIÓN
  // =========================================

  if (!usuarioActivo) {

    return (

      <main className="pedidos-page">

        <section className="pedidos-empty">

          <div>
            🔐
          </div>

          <h2>
            Necesitas iniciar sesión
          </h2>

          <p>
            Inicia sesión para consultar
            tus pedidos.
          </p>

        </section>

      </main>

    );

  }


  // =========================================
  // PEDIDOS
  // =========================================

  return (

    <main className="pedidos-page">


      {/* =====================================
          ENCABEZADO
      ===================================== */}

      <section className="pedidos-header">

        <div>

          <span className="pedidos-badge">
            📦 MIS PEDIDOS
          </span>

          <h1>
            {usuarioActivo.rol === "admin"
              ? "Todos los pedidos"
              : "Mis pedidos"}
          </h1>

          <p>

            {usuarioActivo.rol === "admin"
              ? "Consulta todos los pedidos realizados."
              : "Aquí puedes consultar tus pedidos y su estado."}

          </p>

        </div>

      </section>


      {/* =====================================
          SIN PEDIDOS
      ===================================== */}

      {pedidos.length === 0 ? (

        <section className="pedidos-empty">

          <div>
            🥤
          </div>

          <h2>
            Aún no tienes pedidos
          </h2>

          <p>
            Cuando realices una compra,
            aparecerá aquí.
          </p>

        </section>

      ) : (

        <section className="pedidos-list">

          {pedidos
            .slice()
            .reverse()
            .map((pedido) => (

              <article
                className="pedido-card"
                key={pedido.numeroPedido}
              >


                {/* =================================
                    CABECERA
                ================================= */}

                <div className="pedido-card-header">

                  <div>

                    <span>
                      Número de pedido
                    </span>

                    <h2>
                      {pedido.numeroPedido}
                    </h2>

                  </div>


                  <div className="pedido-date">

                    {pedido.fecha}

                  </div>

                </div>


                {/* =================================
                    ESTADO
                ================================= */}

                <div className="pedido-status">

                  <span>
                    Estado del pedido
                  </span>

                  <strong
                    className={
                      obtenerClaseEstado(
                        pedido.estado
                      )
                    }
                  >

                    {pedido.estado ===
                      "Pendiente" &&
                      "🟡 "}

                    {pedido.estado ===
                      "En preparación" &&
                      "🔵 "}

                    {pedido.estado ===
                      "En camino" &&
                      "🟠 "}

                    {pedido.estado ===
                      "Entregado" &&
                      "🟢 "}

                    {pedido.estado ||
                      "Pendiente"}

                  </strong>

                </div>


                {/* =================================
                    PRODUCTOS
                ================================= */}

                <div className="pedido-products">

                  <h3>
                    🥤 Productos
                  </h3>


                  {pedido.productos?.map(
                    (producto, index) => (

                      <div
                        className="pedido-product"
                        key={
                          producto.id ||
                          index
                        }
                      >

                        <span className="pedido-product-icon">
                          {producto.emoji ||
                            "🥤"}
                        </span>


                        <div>

                          <strong>
                            {producto.nombre}
                          </strong>

                          <span>
                            Cantidad:{" "}
                            {producto.cantidad}
                          </span>

                        </div>


                        <strong>

                          $
                          {formatoPrecio(
                            Number(
                              producto.precio ||
                                0
                            ) *
                            Number(
                              producto.cantidad ||
                                0
                            )
                          )}

                        </strong>

                      </div>

                    )
                  )}

                </div>


                {/* =================================
                    INFORMACIÓN DEL PEDIDO
                ================================= */}

                <div className="pedido-details">


                  <div>

                    <span>
                      📍 Dirección
                    </span>

                    <strong>

                      {pedido.datosCliente
                        ?.direccion ||
                        "No disponible"}

                    </strong>

                  </div>


                  <div>

                    <span>
                      🏘️ Barrio
                    </span>

                    <strong>

                      {pedido.datosCliente
                        ?.barrio ||
                        "No disponible"}

                    </strong>

                  </div>


                  <div>

                    <span>
                      💳 Método de pago
                    </span>

                    <strong>

                      {pedido.datosCliente
                        ?.metodoPago ||
                        "No disponible"}

                    </strong>

                  </div>


                  <div>

                    <span>
                      💰 Total
                    </span>

                    <strong className="pedido-total">

                      $
                      {formatoPrecio(
                        pedido.total
                      )}

                    </strong>

                  </div>

                </div>


                {/* =================================
                    OBSERVACIONES
                ================================= */}

                {pedido.datosCliente
                  ?.observaciones && (

                  <div className="pedido-observaciones">

                    <strong>
                      📝 Observaciones
                    </strong>

                    <p>
                      {pedido.datosCliente
                        .observaciones}
                    </p>

                  </div>

                )}

              </article>

            ))}

        </section>

      )}

    </main>

  );

}

export default Pedidos;