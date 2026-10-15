import "./ProductModal.css";

function ProductModal({ producto, cantidad, setCantidad, onClose, onAdd }) {
  if (!producto) return null;

  const total = producto.precio * cantidad;

  return (
    <div className="modal-overlay" onClick={onClose}>

      <div
        className="product-modal"
        onClick={(e) => e.stopPropagation()}
      >

        {/* Botón cerrar */}
        <button
          className="modal-close"
          onClick={onClose}
        >
          ×
        </button>

        {/* Imagen / emoji */}
        <div className="modal-product-image">
          {producto.emoji}
        </div>

        {/* Información */}
        <div className="modal-product-info">

          {producto.popular && (
            <span className="modal-badge">
              ⭐ Popular
            </span>
          )}

          <h2>{producto.nombre}</h2>

          <p className="modal-description">
            {producto.descripcion ||
              "Delicioso granizado preparado con ingredientes frescos y mucho sabor."}
          </p>

          <p className="modal-price">
            ${producto.precio.toLocaleString("es-CO")}
          </p>

          {/* Cantidad */}
          <div className="modal-quantity">

            <span>Cantidad:</span>

            <div className="quantity-selector">

              <button
                onClick={() =>
                  setCantidad((cantidadActual) =>
                    Math.max(1, cantidadActual - 1)
                  )
                }
              >
                −
              </button>

              <strong>{cantidad}</strong>

              <button
                onClick={() =>
                  setCantidad((cantidadActual) =>
                    cantidadActual + 1
                  )
                }
              >
                +
              </button>

            </div>

          </div>

          {/* Total */}
          <p className="modal-total">
            Total:{" "}
            <strong>
              ${total.toLocaleString("es-CO")}
            </strong>
          </p>

          {/* Agregar al carrito */}
          <button
            className="modal-add-button"
            onClick={() => onAdd(producto, cantidad)}
          >
            🛒 Agregar al carrito
          </button>

        </div>

      </div>

    </div>
  );
}

export default ProductModal;