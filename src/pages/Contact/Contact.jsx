import { useState } from "react";
import "./Contact.css";

function Contact() {
  const [formulario, setFormulario] = useState({
    nombre: "",
    correo: "",
    asunto: "",
    mensaje: "",
  });

  // CAMBIA este número por el WhatsApp real del negocio.
  // Colombia: 57 + número de celular, sin espacios ni signos.
  const telefonoWhatsApp = "573000000000";

  const manejarCambio = (e) => {
    const { name, value } = e.target;

    setFormulario((actual) => ({
      ...actual,
      [name]: value,
    }));
  };

  const enviarFormulario = (e) => {
    e.preventDefault();

    const texto = `
Hola, La Granizada Loka. 🍧

Nombre: ${formulario.nombre}
Correo: ${formulario.correo}
Asunto: ${formulario.asunto}

Mensaje:
${formulario.mensaje}
    `.trim();

    const enlace = `https://wa.me/${telefonoWhatsApp}?text=${encodeURIComponent(
      texto
    )}`;

    window.open(enlace, "_blank", "noopener,noreferrer");
  };

  return (
    <main className="contact-page">

      {/* ENCABEZADO */}
      <section className="contact-hero">
        <span className="contact-badge">
          💜 ESTAMOS PARA TI
        </span>

        <h1>
          ¡Hablemos!
        </h1>

        <p>
          ¿Tienes preguntas, sugerencias o quieres saber
          más sobre nuestros granizados? Estamos aquí
          para ayudarte.
        </p>
      </section>

      {/* CONTENIDO PRINCIPAL */}
      <section className="contact-container">

        {/* INFORMACIÓN */}
        <aside className="contact-info">

          <h2>
            Contacta con nosotros
          </h2>

          <p className="contact-info-description">
            En La Granizada Loka nos encanta escucharte.
            Escríbenos y te atenderemos con mucho gusto.
          </p>

          <div className="contact-info-item">
            <div className="contact-info-icon">📱</div>

            <div>
              <h3>WhatsApp</h3>
              <p>Atención directa al cliente</p>
              <a
                href={`https://wa.me/${telefonoWhatsApp}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Escríbenos
              </a>
            </div>
          </div>

          <div className="contact-info-item">
            <div className="contact-info-icon">📧</div>

            <div>
              <h3>Correo electrónico</h3>
              <p>Para consultas y sugerencias</p>
              <a href="mailto:contacto@lagranizadaloka.com">
                contacto@lagranizadaloka.com
              </a>
            </div>
          </div>

          <div className="contact-info-item">
            <div className="contact-info-icon">📍</div>

            <div>
              <h3>Ubicación</h3>
              <p>
                Bogotá, Colombia
              </p>
            </div>
          </div>

          <div className="contact-decoration">
            🍧
          </div>

          <p className="contact-info-footer">
            ¡Gracias por elegir La Granizada Loka!
          </p>

        </aside>

        {/* FORMULARIO */}
        <section className="contact-form-container">

          <h2>
            Envíanos un mensaje
          </h2>

          <p>
            Completa los siguientes campos para
            preparar tu mensaje.
          </p>

          <form
            className="contact-form"
            onSubmit={manejarEnvioSeguro}
          >

            <div className="contact-field">
              <label htmlFor="nombre">
                Nombre completo
              </label>

              <input
                id="nombre"
                name="nombre"
                type="text"
                placeholder="Escribe tu nombre"
                value={formulario.nombre}
                onChange={manejarCambio}
                autoComplete="name"
                required
                maxLength={100}
              />
            </div>

            <div className="contact-field">
              <label htmlFor="correo">
                Correo electrónico
              </label>

              <input
                id="correo"
                name="correo"
                type="email"
                placeholder="ejemplo@correo.com"
                value={formulario.correo}
                onChange={manejarCambio}
                autoComplete="email"
                required
                maxLength={150}
              />
            </div>

            <div className="contact-field">
              <label htmlFor="asunto">
                Asunto
              </label>

              <select
                id="asunto"
                name="asunto"
                value={formulario.asunto}
                onChange={manejarCambio}
                required
              >
                <option value="">
                  Selecciona un asunto
                </option>
                <option value="Consulta sobre productos">
                  Consulta sobre productos
                </option>
                <option value="Pedidos">
                  Pedidos
                </option>
                <option value="Precios y promociones">
                  Precios y promociones
                </option>
                <option value="Sugerencias">
                  Sugerencias
                </option>
                <option value="Quejas o reclamos">
                  Quejas o reclamos
                </option>
                <option value="Otro">
                  Otro
                </option>
              </select>
            </div>

            <div className="contact-field">
              <label htmlFor="mensaje">
                Mensaje
              </label>

              <textarea
                id="mensaje"
                name="mensaje"
                placeholder="Cuéntanos cómo podemos ayudarte..."
                value={formulario.mensaje}
                onChange={manejarCambio}
                rows={5}
                required
                minLength={5}
                maxLength={1500}
              />
            </div>

            <button
              type="submit"
              className="contact-submit-button"
            >
              Enviar por WhatsApp
              <span>➤</span>
            </button>

            <p className="contact-privacy-note">
              Al continuar, se abrirá WhatsApp con tu
              mensaje preparado para que puedas enviarlo.
            </p>

          </form>

        </section>

      </section>

    </main>
  );
}

// Valida los datos antes de abrir WhatsApp.
function manejarEnvioSeguro(e) {
  // Esta función no se utiliza: el formulario debe
  // usar directamente manejarEnvio dentro del componente.
}

export default Contact;