import "./About.css";

function About() {
  return (
    <section className="about">
      <h1>Sobre Nosotros 💜</h1>

      <p>
        En <strong>La Granizada Loka</strong> queremos ofrecer los mejores
        granizados de Bogotá, preparados con ingredientes de calidad y mucho
        sabor.
      </p>

      <p>
        Nuestro objetivo es brindar una experiencia refrescante para toda la
        familia, con una gran variedad de sabores y combinaciones.
      </p>

      <div className="about-box">
        <h2>¿Por qué elegirnos?</h2>

        <ul>
          <li>🍧 Ingredientes frescos.</li>
          <li>🥭 Gran variedad de sabores.</li>
          <li>💜 Atención rápida y amable.</li>
          <li>⭐ Calidad garantizada.</li>
        </ul>
      </div>
    </section>
  );
}

export default About;