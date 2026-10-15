import { Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

import { useCart } from "../../context/CartContext";

import "./Navbar.css";

function Navbar() {
  const { getTotalItems } = useCart();

  const navigate = useNavigate();
  const location = useLocation();

  const [usuario, setUsuario] = useState(null);

  const totalItems = getTotalItems();

  /* =========================================
     COMPROBAR USUARIO
  ========================================= */

  useEffect(() => {
    const cargarUsuario = () => {
      try {
        const usuarioGuardado =
          localStorage.getItem("usuarioActivo");

        if (usuarioGuardado) {
          const usuarioParseado =
            JSON.parse(usuarioGuardado);

          setUsuario(usuarioParseado);
        } else {
          setUsuario(null);
        }

      } catch (error) {
        console.error(
          "Error al cargar usuario:",
          error
        );

        setUsuario(null);
      }
    };

    cargarUsuario();

  }, [location.pathname]);


  /* =========================================
     CERRAR SESIÓN
  ========================================= */

  const cerrarSesion = () => {

    localStorage.removeItem("usuarioActivo");

    setUsuario(null);

    navigate("/");
  };


  return (
    <nav className="navbar">

      {/* =====================================
          LOGO
      ===================================== */}

      <Link
        to="/"
        className="navbar-logo"
      >
        🍧 La Granizada Loka
      </Link>


      {/* =====================================
          ENLACES
      ===================================== */}

      <div className="navbar-links">

        <Link to="/">
          Inicio
        </Link>

        <Link to="/menu">
          Menú
        </Link>

        {/* =================================
            MIS PEDIDOS
            Solo clientes
        ================================= */}

        {usuario && usuario.rol !== "admin" && (
          <Link to="/pedidos">
            Mis pedidos
          </Link>
        )}

        <Link to="/nosotros">
          Nosotros
        </Link>

        <Link to="/contacto">
          Contacto
        </Link>

      </div>


      {/* =====================================
          ACCIONES
      ===================================== */}

      <div className="navbar-actions">

        {usuario ? (

          <>

            {/* USUARIO */}

            <span className="navbar-user">
              👋 Hola, {usuario.nombre}
            </span>


            {/* CERRAR SESIÓN */}

            <button
              type="button"
              className="navbar-logout"
              onClick={cerrarSesion}
            >
              🚪 Cerrar sesión
            </button>

          </>

        ) : (

          /* LOGIN */

          <Link
            to="/login"
            className="navbar-login"
          >
            👤 Login
          </Link>

        )}


        {/* =================================
            CARRITO
        ================================= */}

        <Link
          to="/carrito"
          className="navbar-cart"
        >
          🛒

          {totalItems > 0 && (
            <span className="cart-count">
              {totalItems}
            </span>
          )}

        </Link>

      </div>

    </nav>
  );
}

export default Navbar;