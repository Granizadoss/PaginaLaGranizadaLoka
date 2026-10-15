import { useState } from "react";
import { useProducts } from "../../context/ProductsContext";
import ProductCard from "../../components/ProductCard/ProductCard";

import "./Menu.css";

function Menu() {

  const { productos } = useProducts();

  const [busqueda, setBusqueda] = useState("");
  const [categoria, setCategoria] = useState("todos");


  /* =========================================
     FILTRAR PRODUCTOS
  ========================================= */

  const productosFiltrados = productos.filter((producto) => {

    const coincideBusqueda =
      producto.nombre
        .toLowerCase()
        .includes(busqueda.toLowerCase()) ||
      producto.descripcion
        ?.toLowerCase()
        .includes(busqueda.toLowerCase());


    const coincideCategoria =
      categoria === "todos" ||
      producto.categoria === categoria;


    return (
      coincideBusqueda &&
      coincideCategoria
    );

  });


  return (

    <main className="menu-page">


      {/* =====================================
          ENCABEZADO
      ===================================== */}

      <section className="menu-header">

        <h1>
          🥤 Nuestro Menú
        </h1>

        <p>
          Descubre nuestros deliciosos granizados.
        </p>

      </section>


      {/* =====================================
          FILTROS
      ===================================== */}

      <section className="menu-filters">

        <div className="menu-search">

          <input
            type="text"
            placeholder="🔍 Buscar granizado..."
            value={busqueda}
            onChange={(e) =>
              setBusqueda(e.target.value)
            }
          />

        </div>


        <div className="menu-categories">

          <button
            type="button"
            className={
              categoria === "todos"
                ? "active"
                : ""
            }
            onClick={() =>
              setCategoria("todos")
            }
          >
            Todos
          </button>


          <button
            type="button"
            className={
              categoria === "frutales"
                ? "active"
                : ""
            }
            onClick={() =>
              setCategoria("frutales")
            }
          >
            🍓 Frutales
          </button>


          <button
            type="button"
            className={
              categoria === "alcohol"
                ? "active"
                : ""
            }
            onClick={() =>
              setCategoria("alcohol")
            }
          >
            🍹 Con alcohol
          </button>

        </div>

      </section>


      {/* =====================================
          PRODUCTOS
      ===================================== */}

      <section className="menu-products">

        {productosFiltrados.length > 0 ? (

          <div className="products-grid">

            {productosFiltrados.map(
              (producto) => (

                <ProductCard
                  key={producto.id}
                  producto={producto}
                />

              )
            )}

          </div>

        ) : (

          <div className="menu-no-results">

            <div className="menu-no-results-icon">
              🥤
            </div>

            <h2>
              No encontramos productos
            </h2>

            <p>
              Intenta con otro nombre
              o categoría.
            </p>

          </div>

        )}

      </section>

    </main>

  );

}

export default Menu;