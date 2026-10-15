import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "./AdminProducts.css";


/* =========================================
   PRODUCTOS INICIALES
========================================= */

const productosIniciales = [
  {
    id: 1,
    nombre: "Granizado de Mango",
    precio: 8000,
    categoria: "Naturales",
    emoji: "🥭",
  },

  {
    id: 2,
    nombre: "Granizado de Fresa",
    precio: 8000,
    categoria: "Naturales",
    emoji: "🍓",
  },

  {
    id: 3,
    nombre: "Granizado de Mora",
    precio: 8000,
    categoria: "Naturales",
    emoji: "🫐",
  },

  {
    id: 4,
    nombre: "Granizado de Limón",
    precio: 8000,
    categoria: "Naturales",
    emoji: "🍋",
  },
];


/* =========================================
   EMOJIS DISPONIBLES
========================================= */

const emojisDisponibles = [

  // Frutas
  "🥭",
  "🍓",
  "🫐",
  "🍋",
  "🍍",
  "🍉",
  "🍊",
  "🍎",
  "🍏",
  "🍌",
  "🍑",
  "🍒",
  "🍇",
  "🥝",
  "🥥",
  "🍈",

  // Bebidas
  "🍹",
  "🥤",
  "🧋",
  "🍸",
  "🍷",
  "🍺",
  "🍻",
  "🥂",
  "🍵",
  "☕",

  // Hielo / postres
  "🧊",
  "🍧",
  "🍨",
  "🍦",
  "🍰",

  // Extras
  "✨",
  "🌈",
  "💜",
  "💖",
  "⭐",
];


/* =========================================
   COMPONENTE
========================================= */

function AdminProducts() {

  const [productos, setProductos] = useState([]);

  const [mostrarFormulario, setMostrarFormulario] =
    useState(false);

  const [productoEditando, setProductoEditando] =
    useState(null);


  /* =========================================
     FORMULARIO
  ========================================= */

  const [formulario, setFormulario] = useState({

    nombre: "",

    precio: "",

    categoria: "Naturales",

    emoji: "🥤",

  });


  /* =========================================
     CARGAR PRODUCTOS
  ========================================= */

  useEffect(() => {

    const guardados =
      localStorage.getItem("productos");


    if (guardados) {

      setProductos(
        JSON.parse(guardados)
      );

    } else {

      setProductos(
        productosIniciales
      );

      localStorage.setItem(
        "productos",
        JSON.stringify(productosIniciales)
      );

    }

  }, []);


  /* =========================================
     GUARDAR PRODUCTOS
  ========================================= */

  const guardarProductos = (
    nuevosProductos
  ) => {

    setProductos(
      nuevosProductos
    );

    localStorage.setItem(
      "productos",
      JSON.stringify(nuevosProductos)
    );

  };


  /* =========================================
     CAMBIAR CAMPOS
  ========================================= */

  const handleChange = (e) => {

    const {
      name,
      value
    } = e.target;


    setFormulario({
      ...formulario,
      [name]: value,
    });

  };


  /* =========================================
     SELECCIONAR EMOJI
  ========================================= */

  const seleccionarEmoji = (emoji) => {

    setFormulario({

      ...formulario,

      emoji: emoji,

    });

  };


  /* =========================================
     NUEVO PRODUCTO
  ========================================= */

  const abrirNuevoProducto = () => {

    setProductoEditando(null);


    setFormulario({

      nombre: "",

      precio: "",

      categoria: "Naturales",

      emoji: "🥤",

    });


    setMostrarFormulario(true);

  };


  /* =========================================
     EDITAR PRODUCTO
  ========================================= */

  const editarProducto = (producto) => {

    setProductoEditando(producto);


    setFormulario({

      nombre:
        producto.nombre,

      precio:
        producto.precio,

      categoria:
        producto.categoria,

      emoji:
        producto.emoji || "🥤",

    });


    setMostrarFormulario(true);

  };


  /* =========================================
     GUARDAR PRODUCTO
  ========================================= */

  const guardarProducto = (e) => {

    e.preventDefault();


    if (
      !formulario.nombre.trim() ||
      !formulario.precio
    ) {

      alert(
        "Completa todos los campos obligatorios."
      );

      return;

    }


    /* -----------------------------------------
       EDITAR
    ----------------------------------------- */

    if (productoEditando) {

      const productosActualizados =
        productos.map((producto) =>

          producto.id ===
          productoEditando.id

            ? {

                ...producto,

                nombre:
                  formulario.nombre,

                precio:
                  Number(
                    formulario.precio
                  ),

                categoria:
                  formulario.categoria,

                emoji:
                  formulario.emoji,

              }

            : producto

        );


      guardarProductos(
        productosActualizados
      );

    }


    /* -----------------------------------------
       NUEVO
    ----------------------------------------- */

    else {

      const nuevoProducto = {

        id:
          Date.now(),

        nombre:
          formulario.nombre,

        precio:
          Number(
            formulario.precio
          ),

        categoria:
          formulario.categoria,

        emoji:
          formulario.emoji,

      };


      guardarProductos([

        ...productos,

        nuevoProducto,

      ]);

    }


    setMostrarFormulario(false);

    setProductoEditando(null);

  };


  /* =========================================
     ELIMINAR PRODUCTO
  ========================================= */

  const eliminarProducto = (id) => {

    const confirmar =
      window.confirm(
        "¿Seguro que deseas eliminar este producto?"
      );


    if (!confirmar) {
      return;
    }


    const productosActualizados =
      productos.filter(
        (producto) =>
          producto.id !== id
      );


    guardarProductos(
      productosActualizados
    );

  };


  /* =========================================
     RENDER
  ========================================= */

  return (

    <main className="admin-products-page">


      {/* =====================================
          ENCABEZADO
      ===================================== */}

      <section className="admin-products-header">

        <div>

          <span className="admin-products-label">
            🥤 ADMINISTRACIÓN
          </span>


          <h1>
            Productos
          </h1>


          <p>
            Administra los granizados disponibles
            en el menú de La Granizada Loka.
          </p>

        </div>


        <div className="admin-products-header-buttons">

          <Link
            to="/admin"
            className="admin-products-back"
          >
            ← Panel
          </Link>


          <button
            className="admin-products-add"
            onClick={
              abrirNuevoProducto
            }
          >
            + Agregar producto
          </button>

        </div>

      </section>


      {/* =====================================
          FORMULARIO
      ===================================== */}

      {mostrarFormulario && (

        <section className="admin-product-form-card">


          {/* HEADER */}

          <div className="admin-product-form-header">

            <div>

              <h2>

                {productoEditando
                  ? "Editar producto"
                  : "Nuevo producto"}

              </h2>


              <p>
                Completa la información del granizado.
              </p>

            </div>


            <button
              type="button"
              className="admin-form-close"
              onClick={() =>
                setMostrarFormulario(false)
              }
            >
              ✕
            </button>

          </div>


          {/* FORM */}

          <form
            onSubmit={
              guardarProducto
            }
          >

            <div className="admin-form-grid">


              {/* =================================
                  NOMBRE
              ================================= */}

              <div className="admin-form-group">

                <label>
                  Nombre del producto
                </label>


                <input

                  type="text"

                  name="nombre"

                  value={
                    formulario.nombre
                  }

                  onChange={
                    handleChange
                  }

                  placeholder="Ej: Granizado de Mango"

                />

              </div>


              {/* =================================
                  PRECIO
              ================================= */}

              <div className="admin-form-group">

                <label>
                  Precio
                </label>


                <input

                  type="number"

                  name="precio"

                  value={
                    formulario.precio
                  }

                  onChange={
                    handleChange
                  }

                  placeholder="8000"

                  min="0"

                />

              </div>


              {/* =================================
                  CATEGORÍA
              ================================= */}

              <div className="admin-form-group">

                <label>
                  Categoría
                </label>


                <select

                  name="categoria"

                  value={
                    formulario.categoria
                  }

                  onChange={
                    handleChange
                  }

                >

                  <option value="Naturales">
                    Naturales
                  </option>

                  <option value="Con alcohol">
                    Con alcohol
                  </option>

                  <option value="Especiales">
                    Especiales
                  </option>

                </select>

              </div>


              {/* =================================
                  EMOJI
              ================================= */}

              <div className="admin-form-group emoji-selector-group">

                <label>
                  Emoji del producto
                </label>


                {/* PREVISUALIZACIÓN */}

                <div className="selected-emoji-preview">

                  <span>
                    {formulario.emoji}
                  </span>

                  <div>

                    <strong>
                      Emoji seleccionado
                    </strong>

                    <small>
                      {formulario.emoji}
                    </small>

                  </div>

                </div>


                {/* SELECTOR */}

                <div className="emoji-picker">

                  {emojisDisponibles.map(
                    (emoji, index) => (

                      <button

                        key={`${emoji}-${index}`}

                        type="button"

                        className={`emoji-option ${
                          formulario.emoji === emoji
                            ? "emoji-option-selected"
                            : ""
                        }`}

                        onClick={() =>
                          seleccionarEmoji(
                            emoji
                          )
                        }

                        title={`Seleccionar ${emoji}`}

                      >

                        {emoji}

                      </button>

                    )
                  )}

                </div>


                {/* EMOJI PERSONALIZADO */}

                <div className="custom-emoji-container">

                  <label>
                    O escribe o pega otro emoji
                  </label>


                  <input

                    type="text"

                    name="emoji"

                    value={
                      formulario.emoji
                    }

                    onChange={
                      handleChange
                    }

                    placeholder="🥭"

                    maxLength="8"

                  />

                </div>

              </div>


            </div>


            {/* =================================
                BOTONES
            ================================= */}

            <div className="admin-form-actions">

              <button

                type="button"

                className="admin-form-cancel"

                onClick={() =>
                  setMostrarFormulario(false)
                }

              >

                Cancelar

              </button>


              <button

                type="submit"

                className="admin-form-save"

              >

                {productoEditando
                  ? "Guardar cambios"
                  : "Agregar producto"}

              </button>

            </div>

          </form>

        </section>

      )}


      {/* =====================================
          LISTA DE PRODUCTOS
      ===================================== */}

      <section className="admin-products-list">


        <div className="admin-products-list-header">

          <div>

            <h2>
              🧊 Productos del menú
            </h2>


            <p>
              {productos.length}
              {" "}
              productos registrados
            </p>

          </div>

        </div>


        {/* ===================================
            SIN PRODUCTOS
        =================================== */}

        {productos.length === 0 ? (

          <div className="admin-products-empty">

            <span>
              🥤
            </span>


            <h3>
              No hay productos
            </h3>


            <p>
              Agrega tu primer granizado
              para comenzar.
            </p>


            <button
              onClick={
                abrirNuevoProducto
              }
            >
              + Agregar producto
            </button>

          </div>

        ) : (


          /* =================================
             PRODUCTOS
          ================================= */

          <div className="admin-products-grid">

            {productos.map(
              (producto) => (

                <article

                  className="admin-product-card"

                  key={
                    producto.id
                  }

                >


                  {/* ICONO */}

                  <div className="admin-product-icon">

                    {producto.emoji}

                  </div>


                  {/* INFORMACIÓN */}

                  <div className="admin-product-info">

                    <span className="admin-product-category">

                      {producto.categoria}

                    </span>


                    <h3>

                      {producto.nombre}

                    </h3>


                    <strong>

                      $

                      {producto.precio.toLocaleString(
                        "es-CO"
                      )}

                    </strong>

                  </div>


                  {/* ACCIONES */}

                  <div className="admin-product-actions">

                    <button

                      className="admin-product-edit"

                      onClick={() =>
                        editarProducto(
                          producto
                        )
                      }

                    >

                      ✏️ Editar

                    </button>


                    <button

                      className="admin-product-delete"

                      onClick={() =>
                        eliminarProducto(
                          producto.id
                        )
                      }

                    >

                      🗑️ Eliminar

                    </button>

                  </div>

                </article>

              )
            )}

          </div>

        )}

      </section>

    </main>

  );

}


export default AdminProducts;