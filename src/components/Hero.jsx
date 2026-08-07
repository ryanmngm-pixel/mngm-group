import logo from "../assets/mngm-logo.png";

function Hero() {
  return (
    <section className="hero">
      <h1 className="hero-company-name">MNGM Group</h1>

      <img
        src={logo}
        alt="MNGM Group"
        className="hero-logo"
      />

      <h1>MNGM</h1>

      <p>
        Building products that solve real problems.
      </p>
    </section>
  );
}

export default Hero;