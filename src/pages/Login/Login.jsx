import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./Login.css";

function Login() {
  const navigate = useNavigate();

  const [esRegistro, setEsRegistro] = useState(false);

  const [datos, setDatos] = useState({
    nombre: "",
    correo: "",
    contraseña: "",
  });

  const [mensaje, setMensaje] = useState("");

  const handleChange = (e) => {
    setDatos({
      ...datos,
      [e.target.name]: e.target.value,
    });

    setMensaje("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setMensaje("");

    /*
    ========================================
    ACCESO ADMINISTRADOR
    ========================================
    */

    if (
      !esRegistro &&
      datos.correo === "admin" &&
      datos.contraseña === "1234"
    ) {
      const administrador = {
        nombre: "Administrador",
        correo: "admin",
        rol: "admin",
      };

      localStorage.setItem(
        "usuarioActivo",
        JSON.stringify(administrador)
      );

      navigate("/admin");

      return;
    }

    /*
    ========================================
    USUARIOS REGULARES
    ========================================
    */

    const usuarios =
      JSON.parse(
        localStorage.getItem("usuarios")
      ) || [];

    /*
    ========================================
    REGISTRO
    ========================================
    */

    if (esRegistro) {
      if (!datos.nombre.trim()) {
        setMensaje(
          "❌ Ingresa tu nombre completo."
        );

        return;
      }

      const usuarioExistente = usuarios.find(
        (usuario) =>
          usuario.correo === datos.correo
      );

      if (usuarioExistente) {
        setMensaje(
          "❌ Este correo ya está registrado."
        );

        return;
      }

      const nuevoUsuario = {
        nombre: datos.nombre,
        correo: datos.correo,
        contraseña: datos.contraseña,
        rol: "cliente",
      };

      usuarios.push(nuevoUsuario);

      localStorage.setItem(
        "usuarios",
        JSON.stringify(usuarios)
      );

      setMensaje(
        "✅ Cuenta creada correctamente. Ahora puedes iniciar sesión."
      );

      setEsRegistro(false);

      setDatos({
        nombre: "",
        correo: "",
        contraseña: "",
      });

      return;
    }

    /*
    ========================================
    INICIO DE SESIÓN CLIENTE
    ========================================
    */

    const usuarioEncontrado = usuarios.find(
      (usuario) =>
        usuario.correo === datos.correo &&
        usuario.contraseña === datos.contraseña
    );

    if (!usuarioEncontrado) {
      setMensaje(
        "❌ Correo o contraseña incorrectos."
      );

      return;
    }

    /*
    ========================================
    GUARDAR SESIÓN
    ========================================
    */

    localStorage.setItem(
      "usuarioActivo",
      JSON.stringify(usuarioEncontrado)
    );

    /*
    ========================================
    CLIENTE → INICIO
    ========================================
    */

    navigate("/");
  };

  return (
    <main className="login-page">

      <section className="login-card">

        {/* ICONO */}

        <div className="login-icon">
          🍧
        </div>


        {/* TÍTULO */}

        <h1>
          {esRegistro
            ? "Crear cuenta"
            : "Iniciar sesión"}
        </h1>

        <p>
          {esRegistro
            ? "Crea tu cuenta en La Granizada Loka"
            : "Bienvenido a La Granizada Loka"}
        </p>


        {/* FORMULARIO */}

        <form onSubmit={handleSubmit}>

          {/* NOMBRE */}

          {esRegistro && (
            <div className="input-group">

              <label htmlFor="nombre">
                Nombre completo
              </label>

              <input
                id="nombre"
                type="text"
                name="nombre"
                value={datos.nombre}
                onChange={handleChange}
                placeholder="Escribe tu nombre"
                required
              />

            </div>
          )}


          {/* CORREO */}

          <div className="input-group">

            <label htmlFor="correo">
              {esRegistro
                ? "Correo electrónico"
                : "Correo electrónico o usuario"}
            </label>

            <input
              id="correo"
              type="text"
              name="correo"
              value={datos.correo}
              onChange={handleChange}
              placeholder={
                esRegistro
                  ? "ejemplo@gmail.com"
                  : "Tu correo o admin"
              }
              required
            />

          </div>


          {/* CONTRASEÑA */}

          <div className="input-group">

            <label htmlFor="contraseña">
              Contraseña
            </label>

            <input
              id="contraseña"
              type="password"
              name="contraseña"
              value={datos.contraseña}
              onChange={handleChange}
              placeholder="••••••••"
              required
            />

          </div>


          {/* MENSAJE */}

          {mensaje && (
            <div className="login-message">
              {mensaje}
            </div>
          )}


          {/* BOTÓN */}

          <button
            type="submit"
            className="login-button"
          >
            {esRegistro
              ? "Crear cuenta"
              : "Iniciar sesión"}
          </button>

        </form>


        {/* CAMBIAR ENTRE LOGIN Y REGISTRO */}

        <div className="login-switch">

          {esRegistro ? (

            <p>
              ¿Ya tienes una cuenta?{" "}

              <button
                type="button"
                onClick={() => {
                  setEsRegistro(false);
                  setMensaje("");

                  setDatos({
                    nombre: "",
                    correo: "",
                    contraseña: "",
                  });
                }}
              >
                Inicia sesión
              </button>

            </p>

          ) : (

            <p>
              ¿No tienes una cuenta?{" "}

              <button
                type="button"
                onClick={() => {
                  setEsRegistro(true);
                  setMensaje("");

                  setDatos({
                    nombre: "",
                    correo: "",
                    contraseña: "",
                  });
                }}
              >
                Regístrate
              </button>

            </p>

          )}

        </div>


        {/* INFORMACIÓN ADMIN */}

        <div className="admin-login-info">

          <small>
            🔐 Acceso administrativo disponible
          </small>

        </div>

      </section>

    </main>
  );
}

export default Login;