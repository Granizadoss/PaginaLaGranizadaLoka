import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import "./Admin.css";

function Admin() {

  const [pedidos, setPedidos] = useState([]);

  const [pedidoEditando, setPedidoEditando] = useState(null);

  const [mostrarEditor, setMostrarEditor] = useState(false);


  /* =========================================
     CARGAR PEDIDOS
  ========================================= */

  const cargarPedidos = () => {

    const pedidosGuardados =
      JSON.parse(
        localStorage.getItem("pedidos")
      ) || [];

    setPedidos(pedidosGuardados);

  };


  /* =========================================
     CARGAR AL INICIAR
  ========================================= */

  useEffect(() => {

    cargarPedidos();

    const actualizarPedidos = () => {
      cargarPedidos();
    };

    window.addEventListener(
      "pedidosActualizados",
      actualizarPedidos
    );

    return () => {

      window.removeEventListener(
        "pedidosActualizados",
        actualizarPedidos
      );

    };

  }, []);


  /* =========================================
     GUARDAR PEDIDOS
  ========================================= */

  const guardarPedidos = (pedidosActualizados) => {

    setPedidos(pedidosActualizados);

    localStorage.setItem(
      "pedidos",
      JSON.stringify(
        pedidosActualizados
      )
    );

    window.dispatchEvent(
      new Event("pedidosActualizados")
    );

  };


  /* =========================================
     CAMBIAR ESTADO
  ========================================= */

  const cambiarEstado = (
    numeroPedido,
    nuevoEstado
  ) => {

    const pedidosActualizados =
      pedidos.map((pedido) => {

        if (
          pedido.numeroPedido ===
          numeroPedido
        ) {

          return {
            ...pedido,
            estado: nuevoEstado,
          };

        }

        return pedido;

      });

    guardarPedidos(
      pedidosActualizados
    );

  };


  /* =========================================
     ELIMINAR PEDIDO
  ========================================= */

  const eliminarPedido = (
    numeroPedido
  ) => {

    const confirmar =
      window.confirm(
        "¿Estás seguro de que quieres eliminar este pedido?\n\nEsta acción no se puede deshacer."
      );

    if (!confirmar) {
      return;
    }


    const pedidosActualizados =
      pedidos.filter(
        (pedido) =>
          pedido.numeroPedido !==
          numeroPedido
      );


    guardarPedidos(
      pedidosActualizados
    );


    alert(
      "El pedido fue eliminado correctamente."
    );

  };


  /* =========================================
     ABRIR EDITOR
  ========================================= */

  const abrirEditor = (pedido) => {

    setPedidoEditando({
      ...pedido,

      datosCliente: {
        ...(pedido.datosCliente || {}),
      },

      productos: (
        pedido.productos || []
      ).map((producto) => ({
        ...producto,
        cantidad:
          Number(producto.cantidad) || 1,
      })),

    });

    setMostrarEditor(true);

  };


  /* =========================================
     CERRAR EDITOR
  ========================================= */

  const cerrarEditor = () => {

    setPedidoEditando(null);

    setMostrarEditor(false);

  };


  /* =========================================
     CAMBIAR DATOS DEL CLIENTE
  ========================================= */

  const cambiarDatoCliente = (
    campo,
    valor
  ) => {

    setPedidoEditando(
      (pedidoActual) => ({

        ...pedidoActual,

        datosCliente: {

          ...(pedidoActual.datosCliente || {}),

          [campo]: valor,

        },

      })
    );

  };


  /* =========================================
     CAMBIAR PRODUCTO
  ========================================= */

  const cambiarCantidadProducto = (
    indice,
    nuevaCantidad
  ) => {

    const cantidad =
      Math.max(
        1,
        Number(nuevaCantidad) || 1
      );


    setPedidoEditando(
      (pedidoActual) => {

        const productosActualizados =
          [...pedidoActual.productos];


        productosActualizados[
          indice
        ] = {

          ...productosActualizados[
            indice
          ],

          cantidad,

        };


        return {

          ...pedidoActual,

          productos:
            productosActualizados,

        };

      }
    );

  };


  /* =========================================
     AUMENTAR PRODUCTO
  ========================================= */

  const aumentarProducto = (
    indice
  ) => {

    const producto =
      pedidoEditando.productos[
        indice
      ];


    cambiarCantidadProducto(
      indice,
      Number(producto.cantidad || 1) + 1
    );

  };


  /* =========================================
     DISMINUIR PRODUCTO
  ========================================= */

  const disminuirProducto = (
    indice
  ) => {

    const producto =
      pedidoEditando.productos[
        indice
      ];


    const cantidadActual =
      Number(
        producto.cantidad || 1
      );


    if (cantidadActual <= 1) {

      eliminarProducto(
        indice
      );

      return;

    }


    cambiarCantidadProducto(
      indice,
      cantidadActual - 1
    );

  };


  /* =========================================
     ELIMINAR PRODUCTO DEL PEDIDO
  ========================================= */

  const eliminarProducto = (
    indice
  ) => {

    const confirmar =
      window.confirm(
        "¿Quieres eliminar este producto del pedido?"
      );

    if (!confirmar) {
      return;
    }


    setPedidoEditando(
      (pedidoActual) => {

        const productosActualizados =
          pedidoActual.productos.filter(
            (_, posicion) =>
              posicion !== indice
          );


        return {

          ...pedidoActual,

          productos:
            productosActualizados,

        };

      }
    );

  };


  /* =========================================
     CALCULAR TOTAL DEL PEDIDO EDITADO
  ========================================= */

  const calcularTotalEditado = () => {

    if (!pedidoEditando) {
      return 0;
    }


    return (
      pedidoEditando.productos || []
    ).reduce(
      (
        total,
        producto
      ) =>
        total +
        (
          Number(
            producto.precio
          ) || 0
        ) *
        (
          Number(
            producto.cantidad
          ) || 0
        ),
      0
    );

  };


  /* =========================================
     GUARDAR EDICIÓN
  ========================================= */

  const guardarEdicion = () => {

    if (!pedidoEditando) {
      return;
    }


    if (
      !pedidoEditando.datosCliente?.nombre?.trim()
    ) {

      alert(
        "Debes ingresar el nombre del cliente."
      );

      return;

    }


    if (
      !pedidoEditando.datosCliente?.telefono?.trim()
    ) {

      alert(
        "Debes ingresar el teléfono del cliente."
      );

      return;

    }


    if (
      !pedidoEditando.datosCliente?.direccion?.trim()
    ) {

      alert(
        "Debes ingresar la dirección del pedido."
      );

      return;

    }


    if (
      !pedidoEditando.productos ||
      pedidoEditando.productos.length === 0
    ) {

      alert(
        "El pedido debe tener al menos un producto."
      );

      return;

    }


    const nuevoTotal =
      calcularTotalEditado();


    const pedidoActualizado = {

      ...pedidoEditando,

      total:
        nuevoTotal,

      productos:
        pedidoEditando.productos,

    };


    const pedidosActualizados =
      pedidos.map((pedido) =>
        pedido.numeroPedido ===
        pedidoEditando.numeroPedido
          ? pedidoActualizado
          : pedido
      );


    guardarPedidos(
      pedidosActualizados
    );


    cerrarEditor();


    alert(
      "El pedido fue actualizado correctamente. ✅"
    );

  };


  /* =========================================
     ESTADOS
  ========================================= */

  const estados = [

    {
      id: "Pendiente",
      icono: "🟡",
      nombre: "Pendiente",
      clase: "pending",
    },

    {
      id: "En preparación",
      icono: "🔵",
      nombre: "En preparación",
      clase: "preparation",
    },

    {
      id: "En camino",
      icono: "🟠",
      nombre: "En camino",
      clase: "camino",
    },

    {
      id: "Entregado",
      icono: "🟢",
      nombre: "Entregado",
      clase: "delivered",
    },

  ];


  /* =========================================
     POSICIÓN DEL ESTADO
  ========================================= */

  const obtenerPosicionEstado = (
    estado
  ) => {

    const posicion =
      estados.findIndex(
        (item) =>
          item.id === estado
      );

    return posicion === -1
      ? 0
      : posicion;

  };


  /* =========================================
     ESTADO COMPLETADO
  ========================================= */

  const estadoCompletado = (
    pedido,
    indice
  ) => {

    const estadoActual =
      pedido.estado ||
      "Pendiente";


    const posicionActual =
      obtenerPosicionEstado(
        estadoActual
      );


    return indice < posicionActual;

  };


  /* =========================================
     ESTADÍSTICAS
  ========================================= */

  const totalPedidos =
    pedidos.length;


  const ventasTotales =
    pedidos.reduce(
      (total, pedido) =>
        total +
        (
          Number(
            pedido.total
          ) || 0
        ),
      0
    );


  const productosVendidos =
    pedidos.reduce(
      (
        total,
        pedido
      ) =>
        total +
        (
          pedido.productos || []
        ).reduce(
          (
            cantidad,
            producto
          ) =>
            cantidad +
            (
              Number(
                producto.cantidad
              ) || 0
            ),
          0
        ),
      0
    );


  const clientes =
    new Set(
      pedidos
        .map(
          (pedido) =>
            pedido.datosCliente?.telefono
        )
        .filter(Boolean)
    ).size;


  /* =========================================
     ESTADOS DE PEDIDOS
  ========================================= */

  const pedidosPendientes =
    pedidos.filter(
      (pedido) =>
        (
          pedido.estado ||
          "Pendiente"
        ) === "Pendiente"
    ).length;


  const pedidosPreparacion =
    pedidos.filter(
      (pedido) =>
        pedido.estado ===
        "En preparación"
    ).length;


  const pedidosCamino =
    pedidos.filter(
      (pedido) =>
        pedido.estado ===
        "En camino"
    ).length;


  const pedidosEntregados =
    pedidos.filter(
      (pedido) =>
        pedido.estado ===
        "Entregado"
    ).length;


  /* =========================================
     RENDER
  ========================================= */

  return (

    <main className="admin-page">


      {/* =====================================
          ENCABEZADO
      ===================================== */}

      <section className="admin-header">

        <div>

          <span className="admin-badge">
            🛠️ ADMINISTRACIÓN
          </span>

          <h1>
            Panel de administración
          </h1>

          <p>
            Bienvenido, Administrador.
            Desde aquí puedes administrar
            La Granizada Loka.
          </p>

        </div>

      </section>


      {/* =====================================
          ESTADÍSTICAS
      ===================================== */}

      <section className="admin-stats">


        <div className="admin-stat-card">

          <div className="stat-icon">
            📦
          </div>

          <div>

            <span>
              Pedidos
            </span>

            <strong>
              {totalPedidos}
            </strong>

          </div>

        </div>


        <div className="admin-stat-card">

          <div className="stat-icon">
            💰
          </div>

          <div>

            <span>
              Ventas
            </span>

            <strong>
              $
              {ventasTotales.toLocaleString(
                "es-CO"
              )}
            </strong>

          </div>

        </div>


        <div className="admin-stat-card">

          <div className="stat-icon">
            🥤
          </div>

          <div>

            <span>
              Productos vendidos
            </span>

            <strong>
              {productosVendidos}
            </strong>

          </div>

        </div>


        <div className="admin-stat-card">

          <div className="stat-icon">
            👥
          </div>

          <div>

            <span>
              Clientes
            </span>

            <strong>
              {clientes}
            </strong>

          </div>

        </div>


      </section>


      {/* =====================================
          ADMINISTRACIÓN
      ===================================== */}

      <section className="admin-actions">

        <div className="admin-section-title">

          <h2>
            ⚙️ Administración
          </h2>

          <p>
            Gestiona los diferentes
            apartados del sistema.
          </p>

        </div>


        <div className="admin-actions-grid">


          <Link
            to="/admin/productos"
            className="admin-action-card"
          >

            <div className="admin-action-icon">
              🥤
            </div>

            <div>

              <h3>
                Productos
              </h3>

              <p>
                Agregar, editar y eliminar
                productos del menú.
              </p>

            </div>

            <span className="admin-action-arrow">
              →
            </span>

          </Link>


          <Link
            to="/pedidos"
            className="admin-action-card"
          >

            <div className="admin-action-icon">
              📦
            </div>

            <div>

              <h3>
                Pedidos
              </h3>

              <p>
                Consultar pedidos y actualizar
                su estado.
              </p>

            </div>

            <span className="admin-action-arrow">
              →
            </span>

          </Link>


        </div>

      </section>


      {/* =====================================
          RESUMEN DE ESTADOS
      ===================================== */}

      <section className="admin-orders-summary">

        <div className="admin-section-title">

          <h2>
            📊 Estado de los pedidos
          </h2>

          <p>
            Resumen de los pedidos actuales.
          </p>

        </div>


        <div className="orders-status-grid">


          <div className="order-status-card pending">

            <span>
              🟡
            </span>

            <div>

              <strong>
                {pedidosPendientes}
              </strong>

              <small>
                Pendientes
              </small>

            </div>

          </div>


          <div className="order-status-card preparation">

            <span>
              🔵
            </span>

            <div>

              <strong>
                {pedidosPreparacion}
              </strong>

              <small>
                En preparación
              </small>

            </div>

          </div>


          <div className="order-status-card camino">

            <span>
              🟠
            </span>

            <div>

              <strong>
                {pedidosCamino}
              </strong>

              <small>
                En camino
              </small>

            </div>

          </div>


          <div className="order-status-card delivered">

            <span>
              🟢
            </span>

            <div>

              <strong>
                {pedidosEntregados}
              </strong>

              <small>
                Entregados
              </small>

            </div>

          </div>


        </div>

      </section>


      {/* =====================================
          PEDIDOS RECIENTES
      ===================================== */}

      <section className="admin-recent-orders">


        <div className="admin-section-title">

          <h2>
            📋 Pedidos recientes
          </h2>

          <p>
            Administra y actualiza los pedidos.
          </p>

        </div>


        {pedidos.length === 0 ? (

          <div className="admin-empty">

            <div>
              📦
            </div>

            <p>
              Todavía no hay pedidos.
            </p>

          </div>

        ) : (

          <div className="recent-orders-list">


            {pedidos
              .slice(-5)
              .reverse()
              .map((pedido) => {

                const estadoActual =
                  pedido.estado ||
                  "Pendiente";


                return (

                  <article
                    className="recent-order"
                    key={
                      pedido.numeroPedido
                    }
                  >


                    {/* INFORMACIÓN */}

                    <div className="recent-order-top">


                      <div className="recent-order-info">

                        <strong>
                          {pedido.numeroPedido}
                        </strong>

                        <span>
                          {pedido.datosCliente?.nombre ||
                            "Cliente"}
                        </span>

                      </div>


                      <div className="recent-order-price">

                        $
                        {Number(
                          pedido.total || 0
                        ).toLocaleString(
                          "es-CO"
                        )}

                      </div>

                    </div>


                    {/* ESTADO */}

                    <div className="order-status-wrapper">

                      <span className="order-status-label">
                        Estado del pedido
                      </span>


                      <div className="order-status-selector">


                        {estados.map(
                          (
                            estado,
                            indice
                          ) => (

                            <div
                              className="status-step-wrapper"
                              key={
                                estado.id
                              }
                            >


                              {indice > 0 && (

                                <span
                                  className={
                                    `status-line ${
                                      estadoCompletado(
                                        pedido,
                                        indice
                                      )
                                        ? "completed"
                                        : ""
                                    }`
                                  }
                                />

                              )}


                              <button
                                type="button"
                                className={
                                  `status-option ${
                                    estado.clase
                                  } ${
                                    estadoActual ===
                                    estado.id
                                      ? "active"
                                      : ""
                                  } ${
                                    estadoCompletado(
                                      pedido,
                                      indice
                                    )
                                      ? "completed"
                                      : ""
                                  }`
                                }
                                onClick={() =>
                                  cambiarEstado(
                                    pedido.numeroPedido,
                                    estado.id
                                  )
                                }
                              >

                                <span className="status-icon">
                                  {estado.icono}
                                </span>

                                <span className="status-name">
                                  {estado.nombre}
                                </span>

                              </button>


                            </div>

                          )
                        )}


                      </div>


                      <div
                        className={
                          `current-status ${
                            estados[
                              obtenerPosicionEstado(
                                estadoActual
                              )
                            ]?.clase ||
                            "pending"
                          }`
                        }
                      >

                        Estado actual:

                        <strong>
                          {estadoActual}
                        </strong>

                      </div>

                    </div>


                    {/* ACCIONES */}

                    <div className="order-actions">

                      <button
                        type="button"
                        className="edit-order-button"
                        onClick={() =>
                          abrirEditor(
                            pedido
                          )
                        }
                      >
                        ✏️ Editar pedido
                      </button>


                      <button
                        type="button"
                        className="delete-order-button"
                        onClick={() =>
                          eliminarPedido(
                            pedido.numeroPedido
                          )
                        }
                      >
                        🗑️ Eliminar pedido
                      </button>

                    </div>


                  </article>

                );

              })}


          </div>

        )}

      </section>


      {/* =====================================
          MODAL DE EDICIÓN
      ===================================== */}

      {mostrarEditor &&
        pedidoEditando && (

          <div
            className="admin-modal-overlay"
            onMouseDown={(e) => {

              if (
                e.target ===
                e.currentTarget
              ) {
                cerrarEditor();
              }

            }}
          >

            <div className="admin-edit-modal">


              {/* CABECERA */}

              <div className="edit-modal-header">

                <div>

                  <span>
                    ✏️ EDITAR PEDIDO
                  </span>

                  <h2>
                    {pedidoEditando.numeroPedido}
                  </h2>

                </div>


                <button
                  type="button"
                  className="close-modal-button"
                  onClick={
                    cerrarEditor
                  }
                >
                  ✕
                </button>

              </div>


              {/* CONTENIDO */}

              <div className="edit-modal-content">


                {/* DATOS DEL CLIENTE */}

                <section className="edit-section">

                  <div className="edit-section-title">

                    <h3>
                      👤 Datos del cliente
                    </h3>

                    <p>
                      Información de contacto
                      del cliente.
                    </p>

                  </div>


                  <div className="edit-form-grid">


                    <div className="edit-field">

                      <label>
                        Nombre
                      </label>

                      <input
                        type="text"
                        value={
                          pedidoEditando
                            .datosCliente
                            ?.nombre || ""
                        }
                        onChange={(e) =>
                          cambiarDatoCliente(
                            "nombre",
                            e.target.value
                          )
                        }
                        placeholder="Nombre del cliente"
                      />

                    </div>


                    <div className="edit-field">

                      <label>
                        Teléfono
                      </label>

                      <input
                        type="text"
                        value={
                          pedidoEditando
                            .datosCliente
                            ?.telefono || ""
                        }
                        onChange={(e) =>
                          cambiarDatoCliente(
                            "telefono",
                            e.target.value
                          )
                        }
                        placeholder="Teléfono"
                      />

                    </div>


                    <div className="edit-field edit-field-full">

                      <label>
                        Dirección
                      </label>

                      <input
                        type="text"
                        value={
                          pedidoEditando
                            .datosCliente
                            ?.direccion || ""
                        }
                        onChange={(e) =>
                          cambiarDatoCliente(
                            "direccion",
                            e.target.value
                          )
                        }
                        placeholder="Dirección de entrega"
                      />

                    </div>


                    <div className="edit-field">

                      <label>
                        Barrio
                      </label>

                      <input
                        type="text"
                        value={
                          pedidoEditando
                            .datosCliente
                            ?.barrio || ""
                        }
                        onChange={(e) =>
                          cambiarDatoCliente(
                            "barrio",
                            e.target.value
                          )
                        }
                        placeholder="Barrio"
                      />

                    </div>


                    <div className="edit-field">

                      <label>
                        Método de pago
                      </label>

                      <select
                        value={
                          pedidoEditando
                            .datosCliente
                            ?.metodoPago || ""
                        }
                        onChange={(e) =>
                          cambiarDatoCliente(
                            "metodoPago",
                            e.target.value
                          )
                        }
                      >

                        <option value="">
                          Seleccionar
                        </option>

                        <option value="Efectivo">
                          💵 Efectivo
                        </option>

                        <option value="Daviplata">
                          📱 Daviplata
                        </option>

                        <option value="Nequi">
                          📱 Nequi
                        </option>

                        <option value="Transferencia">
                          🏦 Transferencia
                        </option>

                      </select>

                    </div>


                  </div>

                </section>


                {/* PRODUCTOS */}

                <section className="edit-section">

                  <div className="edit-section-title">

                    <h3>
                      🥤 Productos
                    </h3>

                    <p>
                      Modifica las cantidades
                      del pedido.
                    </p>

                  </div>


                  <div className="edit-products-list">


                    {pedidoEditando.productos.map(
                      (
                        producto,
                        indice
                      ) => (

                        <div
                          className="edit-product-item"
                          key={
                            `${producto.id}-${indice}`
                          }
                        >


                          <div className="edit-product-icon">

                            {producto.emoji ||
                              "🥤"}

                          </div>


                          <div className="edit-product-info">

                            <strong>
                              {producto.nombre}
                            </strong>

                            <span>

                              $
                              {Number(
                                producto.precio || 0
                              ).toLocaleString(
                                "es-CO"
                              )}

                            </span>

                          </div>


                          <div className="edit-quantity">

                            <button
                              type="button"
                              onClick={() =>
                                disminuirProducto(
                                  indice
                                )
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
                                aumentarProducto(
                                  indice
                                )
                              }
                            >
                              +
                            </button>

                          </div>


                          <strong className="edit-product-total">

                            $
                            {(
                              Number(
                                producto.precio || 0
                              ) *
                              Number(
                                producto.cantidad || 0
                              )
                            ).toLocaleString(
                              "es-CO"
                            )}

                          </strong>


                          <button
                            type="button"
                            className="remove-product-button"
                            onClick={() =>
                              eliminarProducto(
                                indice
                              )
                            }
                            title="Eliminar producto"
                          >
                            🗑️
                          </button>


                        </div>

                      )
                    )}


                  </div>

                </section>


                {/* TOTAL */}

                <section className="edit-total">

                  <span>
                    Total del pedido
                  </span>

                  <strong>
                    $
                    {calcularTotalEditado().toLocaleString(
                      "es-CO"
                    )}
                  </strong>

                </section>


              </div>


              {/* BOTONES */}

              <div className="edit-modal-footer">

                <button
                  type="button"
                  className="cancel-edit-button"
                  onClick={
                    cerrarEditor
                  }
                >
                  Cancelar
                </button>


                <button
                  type="button"
                  className="save-edit-button"
                  onClick={
                    guardarEdicion
                  }
                >
                  💾 Guardar cambios
                </button>

              </div>


            </div>

          </div>

        )}


    </main>

  );

}


export default Admin;