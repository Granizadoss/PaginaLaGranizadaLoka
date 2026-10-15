import { Navigate } from "react-router-dom";

function AdminRoute({ children }) {

  /* =========================================
     COMPROBAR USUARIO
  ========================================= */

  const usuarioGuardado =
    localStorage.getItem("usuarioActivo");


  /* =========================================
     NO HAY SESIÓN
  ========================================= */

  if (!usuarioGuardado) {

    return (
      <Navigate
        to="/login"
        replace
      />
    );

  }


  /* =========================================
     COMPROBAR INFORMACIÓN DEL USUARIO
  ========================================= */

  try {

    const usuario =
      JSON.parse(usuarioGuardado);


    /* =======================================
       COMPROBAR ROL
    ======================================= */

    if (usuario.rol !== "admin") {

      return (
        <Navigate
          to="/"
          replace
        />
      );

    }


    /* =======================================
       USUARIO AUTORIZADO
    ======================================= */

    return children;


  } catch (error) {

    console.error(
      "Error al comprobar administrador:",
      error
    );


    /* =======================================
       LIMPIAR SESIÓN DAÑADA
    ======================================= */

    localStorage.removeItem(
      "usuarioActivo"
    );


    return (
      <Navigate
        to="/login"
        replace
      />
    );

  }

}


export default AdminRoute;