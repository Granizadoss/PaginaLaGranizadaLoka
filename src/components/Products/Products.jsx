import "./Products.css";

import products from "../../data/products";

import ProductCard from "../ProductCard/ProductCard";

function Products() {
  return (
    <section className="products">

      <h2>Productos Destacados</h2>

      <div className="products-grid">

        {products.map((producto) => (
          <ProductCard
            key={producto.id}
            producto={producto}
          />
        ))}

      </div>

    </section>
  );
}

export default Products;