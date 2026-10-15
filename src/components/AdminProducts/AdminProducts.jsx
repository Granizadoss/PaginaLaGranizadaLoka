import { useEffect, useState } from "react";
import "./AdminProducts.css";

const productosIniciales = [
  {
    id: 1,
    nombre: "Granizado de Mango",
    categoria: "frutales",
    precio: 8000,
    emoji: "🥭",
    descripcion:
      "Refrescante granizado preparado con el delicioso sabor del mango.",
    popular: true,
  },
  {
    id: 2,
    nombre: "Granizado de Fresa",
    categoria: "frutales",
    precio: 8000,
    emoji: "🍓",
    descripcion:
      "Granizado dulce y refrescante con un delicioso sabor a fresa.",
    popular: true,
  },
  {
    id: 3,
    nombre: "Granizado de Mora",
    categoria: "frutales",
    precio: 8500,
    emoji: "🫐",
    descripcion:
      "Una combinación refrescante con el sabor intenso de la mora.",
    popular: false,
  },
  {
    id: 4,
    nombre: "Granizado de Limón",
    categoria: "frutales",
    precio: 7500,
    emoji: "🍋",
    descripcion:
      "Una opción cítrica, refrescante y perfecta para los días calurosos.",
    popular: true,
  },
  {
    id: 5,
    nombre: "Granizado de Mango con Ron",
    categoria: "alcohol",
    precio: 12000,
    emoji: "🥭🍹",
    descripcion:
      "Granizado de mango combinado con ron para una experiencia diferente.",
    popular: false,
  },
  {
    id: 6,
    nombre: "Granizado de Fresa con Vodka",
    categoria: "alcohol",
    precio: 12000,
    emoji: "🍓🍸",
    descripcion:
      "El sabor dulce de la fresa combinado con vodka.",
    popular: false,
  },
  {
    id: 7,
    nombre: "Granizado de Limón con Tequila",
    categoria: "alcohol",
    precio: 13000,
    emoji: "🍋🍹",
    descripcion:
      "Una combinación cítrica y refrescante con tequila.",
    popular: false,
  },
  {
    id: 8,
    nombre: "Piña Colada Frozen",
    categoria: "alcohol",
    precio: 14000,
    emoji: "🍍🍹",
    descripcion:
      "Una deliciosa combinación tropical de piña y coco en versión frozen.",
    popular: true,
  },
];

function AdminProducts() {
  const [productos, setProductos] = useState([]);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [productoEditando, setProductoEditando] = useState(null);

  const [formulario, setFormulario] = useState({
    nombre: "",
    categoria: "frutales",
    precio: "",
    emoji: "🥤",
    descripcion: "",
    popular: false,
  });

  /* =========================================
     CARGAR PRODUCTOS
  ========================================= */

  useEffect(() => {
    const productosGuardados =
      localStorage.getItem("productos");

    if (productosGuardados) {
      try {
        setProductos(JSON.parse(productosGuardados));
      } catch (error) {
        setProductos(productosIniciales);
        localStorage.setItem(
          "productos",
          JSON.stringify(productosIniciales)
        );
      }
    } else {
      setProductos(productosIniciales);

      localStorage.setItem(
        "productos",
        JSON.stringify(productosIniciales)
      );
    }
  }, []);

  /* =========================================
     GUARDAR PRODUCTOS
  ========================================= */

  const guardarProductos = (nuevosProductos) => {
    setProductos(nuevosProductos);

    localStorage.setItem(
      "productos",
      JSON.stringify(nuevosProductos)
    );
  };

  /* =========================================
     CAMBIAR INPUT
  ========================================= */

  const manejarCambio = (e) => {
    const { name, value, type, checked } = e.target;

    setFormulario({
      ...formulario,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  /* =========================================
     ABRIR FORMULARIO NUEVO
  ========================================= */

  const nuevoProducto = () => {
    setProductoEditando(null);

    setFormulario({
      nombre: "",
      categoria: "frutales",
      precio: "",
      emoji: "🥤",
      descripcion: "",
      popular: false,
    });

    setMostrarFormulario(true);
  };

  /* =========================================
     EDITAR
  ========================================= */

  const editarProducto = (producto) => {
    setProductoEditando(producto);

    setFormulario({
      nombre: producto.nombre,
      categoria: producto.categoria,
      precio: producto.precio,
      emoji: producto.emoji,
      descripcion: producto.descripcion,
      popular: producto.popular,
    });

    setMostrarFormulario(true);
  };

  /* =========================================
     GUARDAR FORMULARIO
  ========================================= */

  const guardarProducto = (e) => {
    e.preventDefault();

    if (
      !formulario.nombre.trim() ||
      !formulario.precio ||
      !formulario.descripcion.trim()
    ) {
      alert("Completa todos los campos obligatorios.");
      return;
    }

    if (productoEditando) {
      const productosActualizados = productos.map(
        (producto) =>
          producto.id === productoEditando.id
            ? {
                ...producto,
                ...formulario,
                precio: Number(formulario.precio),
              }
            : producto
      );

      guardarProductos(productosActualizados);
    } else {
      const nuevo = {
        id: Date.now(),
        nombre: formulario.nombre,
        categoria: formulario.categoria,
        precio: Number(formulario.precio),
        emoji: formulario.emoji,
        descripcion: formulario.descripcion,
        popular: formulario.popular,
      };

      guardarProductos([
        ...productos,
        nuevo,
      ]);
    }

    setMostrarFormulario(false);

    setFormulario({
      nombre: "",
      categoria: "frutales",
      precio: "",
      emoji: "🥤",
      descripcion: "",
      popular: false,
    });

    setProductoEditando(null);
  };

  /* =========================================
     ELIMINAR
  ========================================= */

  const eliminarProducto = (id) => {
    const confirmar = window.confirm(
      "¿Seguro que deseas eliminar este producto?"
    );

    if (!confirmar) {
      return;
    }

    const productosActualizados =
      productos.filter(
        (producto) => producto.id !== id
      );

    guardarProductos(productosActualizados);
  };

  /* =========================================
     FORMATO PRECIO
  ========================================= */

  const formatoPrecio = (precio) => {
    return `$${Number(precio).toLocaleString("es-CO")}`;
  };

  return (
    <section className="admin-products">

      {/* ENCABEZADO */}

      <div className="admin-products-header">

        <div>
          <span className="admin-products-label">
            🥤 MENÚ
          </span>

          <h2>
            Administración de productos
          </h2>

          <p>
            Agrega, modifica o elimina los granizados
            disponibles en la tienda.
          </p>
        </div>

        <button
          className="admin-add-product"
          onClick={nuevoProducto}
        >
          ➕ Añadir producto
        </button>

      </div>


      {/* FORMULARIO */}

      {mostrarFormulario && (

        <div className="admin-product-form-container">

          <div className="admin-form-header">

            <div>
              <h3>
                {productoEditando
                  ? "✏️ Editar producto"
                  : "➕ Nuevo producto"}
              </h3>

              <p>
                Completa la información del producto.
              </p>
            </div>

            <button
              type="button"
              className="admin-close-form"
              onClick={() =>
                setMostrarFormulario(false)
              }
            >
              ✕
            </button>

          </div>


          <form
            className="admin-product-form"
            onSubmit={guardarProducto}
          >

            <div className="admin-form-grid">

              <div className="admin-form-group">

                <label>
                  Nombre del producto *
                </label>

                <input
                  type="text"
                  name="nombre"
                  value={formulario.nombre}
                  onChange={manejarCambio}
                  placeholder="Ej: Granizado de Maracuyá"
                />

              </div>


              <div className="admin-form-group">

                <label>
                  Categoría *
                </label>

                <select
                  name="categoria"
                  value={formulario.categoria}
                  onChange={manejarCambio}
                >

                  <option value="frutales">
                    Frutales
                  </option>

                  <option value="alcohol">
                    Con alcohol
                  </option>

                </select>

              </div>


              <div className="admin-form-group">

                <label>
                  Precio *
                </label>

                <input
                  type="number"
                  name="precio"
                  value={formulario.precio}
                  onChange={manejarCambio}
                  placeholder="Ej: 9000"
                  min="0"
                />

              </div>


              <div className="admin-form-group">

                <label>
                  Emoji
                </label>

                <input
                  type="text"
                  name="emoji"
                  value={formulario.emoji}
                  onChange={manejarCambio}
                  placeholder="🥭"
                />

              </div>

            </div>


            <div className="admin-form-group">

              <label>
                Descripción *
              </label>

              <textarea
                name="descripcion"
                value={formulario.descripcion}
                onChange={manejarCambio}
                placeholder="Describe el producto..."
                rows="4"
              />

            </div>


            <label className="admin-popular-check">

              <input
                type="checkbox"
                name="popular"
                checked={formulario.popular}
                onChange={manejarCambio}
              />

              <span>
                ⭐ Mostrar como producto popular
              </span>

            </label>


            <div className="admin-form-actions">

              <button
                type="button"
                className="admin-cancel-button"
                onClick={() =>
                  setMostrarFormulario(false)
                }
              >
                Cancelar
              </button>

              <button
                type="submit"
                className="admin-save-button"
              >
                💾{" "}
                {productoEditando
                  ? "Guardar cambios"
                  : "Añadir producto"}
              </button>

            </div>

          </form>

        </div>

      )}


      {/* LISTA DE PRODUCTOS */}

      <div className="admin-product-list">

        {productos.length === 0 ? (

          <div className="admin-no-products">

            <span>🥤</span>

            <h3>
              No hay productos
            </h3>

            <p>
              Añade tu primer granizado para comenzar.
            </p>

            <button
              onClick={nuevoProducto}
              className="admin-add-product"
            >
              ➕ Añadir producto
            </button>

          </div>

        ) : (

          productos.map((producto) => (

            <article
              className="admin-product-card"
              key={producto.id}
            >

              <div className="admin-product-emoji">
                {producto.emoji}
              </div>


              <div className="admin-product-info">

                <div className="admin-product-title">

                  <h3>
                    {producto.nombre}
                  </h3>

                  {producto.popular && (
                    <span className="popular-badge">
                      ⭐ Popular
                    </span>
                  )}

                </div>


                <span
                  className={`category-badge ${
                    producto.categoria === "alcohol"
                      ? "category-alcohol"
                      : "category-frutales"
                  }`}
                >
                  {producto.categoria === "alcohol"
                    ? "🍹 Con alcohol"
                    : "🍓 Frutal"}
                </span>


                <p>
                  {producto.descripcion}
                </p>

              </div>


              <div className="admin-product-price">

                <strong>
                  {formatoPrecio(producto.precio)}
                </strong>

              </div>


              <div className="admin-product-actions">

                <button
                  className="admin-edit-product"
                  onClick={() =>
                    editarProducto(producto)
                  }
                >
                  ✏️ Editar
                </button>

                <button
                  className="admin-delete-product"
                  onClick={() =>
                    eliminarProducto(producto.id)
                  }
                >
                  🗑️
                </button>

              </div>

            </article>

          ))

        )}

      </div>

    </section>
  );
}

export default AdminProducts;