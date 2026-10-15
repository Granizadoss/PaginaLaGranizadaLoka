import { useState } from "react";
import { useCart } from "../../context/CartContext";
import products from "../../data/products";

import "./AIChat.css";


function AIChat() {

  const { addToCart } = useCart();

  const [abierto, setAbierto] = useState(false);

  const [mensaje, setMensaje] = useState("");

  const [cargando, setCargando] = useState(false);

  const [mensajes, setMensajes] = useState([
    {
      id: 1,
      tipo: "ia",
      texto:
        "¡Hola! 👋 Soy Loka, el asistente de La Granizada Loka. ¿En qué puedo ayudarte?"
    }
  ]);


  // =========================================
  // ENVIAR MENSAJE
  // =========================================

  const enviarMensaje = async (e) => {

    e.preventDefault();

    if (!mensaje.trim() || cargando) {
      return;
    }


    const textoUsuario =
      mensaje.trim();


    // =======================================
    // MENSAJE DEL USUARIO
    // =======================================

    const nuevoMensaje = {

      id: Date.now(),

      tipo: "usuario",

      texto: textoUsuario

    };


    setMensajes(
      (mensajesActuales) => [
        ...mensajesActuales,
        nuevoMensaje
      ]
    );


    setMensaje("");

    setCargando(true);


    // =======================================
    // CONECTAR CON BACKEND
    // =======================================

    try {

      console.log(
        "🚀 Enviando mensaje:",
        textoUsuario
      );


      const respuesta =
        await fetch(
          "http://localhost:3000/api/ia",
          {

            method: "POST",

            headers: {
              "Content-Type":
                "application/json"
            },

            body: JSON.stringify({

              mensaje:
                textoUsuario,

              productos:
                products

            })

          }
        );


      const datos =
        await respuesta.json();


      // =====================================
      // ERROR
      // =====================================

      if (!respuesta.ok) {

        throw new Error(
          datos.error ||
          "Error del servidor."
        );

      }


      // =====================================
      // ACCIÓN DEL CARRITO
      // =====================================

      if (
        datos.accion ===
          "AGREGAR_CARRITO" &&
        datos.productoId
      ) {

        const producto =
          products.find(
            (item) =>
              Number(item.id) ===
              Number(datos.productoId)
          );


        if (producto) {

          addToCart(producto);


          console.log(
            "🛒 Producto agregado:",
            producto.nombre
          );

        }

      }


      // =====================================
      // RESPUESTA DE LOKA
      // =====================================

      const respuestaIA = {

        id:
          Date.now() + 1,

        tipo: "ia",

        texto:
          datos.respuesta ||
          "Lo siento, no recibí una respuesta."

      };


      setMensajes(
        (mensajesActuales) => [

          ...mensajesActuales,

          respuestaIA

        ]
      );


    } catch (error) {

      console.error(
        "❌ Error:",
        error
      );


      const mensajeError = {

        id:
          Date.now() + 2,

        tipo: "ia",

        texto:
          "❌ No pude comunicarme con Loka. Verifica que el servidor esté funcionando."

      };


      setMensajes(
        (mensajesActuales) => [

          ...mensajesActuales,

          mensajeError

        ]
      );


    } finally {

      setCargando(false);

    }

  };


  // =========================================
  // INTERFAZ
  // =========================================

  return (
    <>

      {/* =====================================
          BOTÓN
      ===================================== */}

      <button

        type="button"

        className="ai-chat-button"

        onClick={() =>
          setAbierto(!abierto)
        }

        aria-label="Abrir asistente"

      >

        🤖

      </button>


      {/* =====================================
          CHAT
      ===================================== */}

      {abierto && (

        <div className="ai-chat-window">


          {/* ENCABEZADO */}

          <div className="ai-chat-header">

            <div>

              <strong>
                🤖 Loka
              </strong>

              <span>
                Asistente virtual
              </span>

            </div>


            <button

              type="button"

              className="ai-chat-close"

              onClick={() =>
                setAbierto(false)
              }

            >

              ✕

            </button>

          </div>


          {/* =================================
              MENSAJES
          ================================= */}

          <div className="ai-chat-messages">

            {mensajes.map(
              (item) => (

                <div

                  key={item.id}

                  className={`ai-chat-message ${
                    item.tipo ===
                    "usuario"
                      ? "user-message"
                      : "ia-message"
                  }`}

                >

                  {item.texto}

                </div>

              )
            )}


            {/* CARGANDO */}

            {cargando && (

              <div className="ai-chat-message ia-message">

                🤖 Loka está pensando...

              </div>

            )}

          </div>


          {/* =================================
              FORMULARIO
          ================================= */}

          <form

            className="ai-chat-form"

            onSubmit={enviarMensaje}

          >

            <input

              type="text"

              value={mensaje}

              onChange={(e) =>
                setMensaje(
                  e.target.value
                )
              }

              placeholder={
                cargando
                  ? "Esperando respuesta..."
                  : "Escribe tu pregunta..."
              }

              disabled={cargando}

            />


            <button

              type="submit"

              aria-label="Enviar mensaje"

              disabled={
                cargando ||
                !mensaje.trim()
              }

            >

              ➤

            </button>

          </form>

        </div>

      )}

    </>
  );
}


export default AIChat;