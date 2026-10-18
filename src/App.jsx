import { useState } from "react";
import "./App.css";

const businesses = [
  {
    name: "MNGM Studios",
    category: "DIGITAL & CREATIVE",
    description: "Digital experiences built for business.",
    url: "#studios",
    number: "01",
  },
  {
    name: "MNGM Services",
    category: "PROFESSIONAL SERVICES",
    description: "Services built around getting things done.",
    url: "#services",
    number: "02",
  },
  {
    name: "MNGM Auto",
    category: "AUTOMOTIVE",
    description: "Driven by a better way forward.",
    url: "#auto",
    number: "03",
  },
  {
    name: "Logic",
    category: "TECHNOLOGY",
    description: "A smarter way to stay accountable.",
    url: "#logic",
    number: "04",
  },
  {
    name: "Stride",
    category: "FINANCIAL TECHNOLOGY",
    description: "A better relationship with your money.",
    url: "#stride",
    number: "05",
  },
  {
    name: "Moovio",
    category: "SOFTWARE",
    description: "Better experiences for automotive businesses.",
    url: "#moovio",
    number: "06",
  },
];

export default function App() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const activeBusiness = businesses[activeIndex];

  function navigate(step) {
    setDirection(step);

    setActiveIndex(
      (current) =>
        (current + step + businesses.length) % businesses.length
    );
  }

  function openBusiness() {
    window.location.hash = activeBusiness.url.slice(1);
  }

  return (
    <main className="site">
      <header className="header">
        <a className="wordmark" href="/">
          MNGM<span>GROUP</span>
        </a>

        <div className="header-label">
          <span className="status-dot" />
          AN INDEPENDENT PORTFOLIO
        </div>
      </header>

      <section className="intro">
        <p className="eyebrow">INDEPENDENT BY DESIGN.</p>

        <h1>
          Built to
          <br />
          <span>build.</span>
        </h1>

        <p className="intro-description">
          A collection of businesses.
          <br />
          One long-term vision.
        </p>
      </section>

      <section className="portfolio" aria-label="Our businesses">
        <div className="orbit" />

        <div className="portfolio-caption">
          <span>OUR BUSINESSES</span>

          <span className="carousel-count">
            {activeBusiness.number}
            <span className="count-divider">/</span>
            {String(businesses.length).padStart(2, "0")}
          </span>
        </div>

        <div className="carousel">
          <button
            key={activeBusiness.name}
            className={`business-card slide-in ${
              direction === 1 ? "slide-from-right" : "slide-from-left"
            }`}
            onClick={openBusiness}
            type="button"
            aria-label={`Explore ${activeBusiness.name}`}
          >
            <span className="card-number">
              {activeBusiness.number}
            </span>

            <span className="card-arrow" aria-hidden="true">
              ↗
            </span>

            <span className="card-content">
              <span className="card-name">
                {activeBusiness.name}
              </span>

              <span className="card-category">
                {activeBusiness.category}
              </span>
            </span>

            <span className="card-description">
              {activeBusiness.description}
            </span>
          </button>
        </div>

        <div className="carousel-controls">
          <button
            type="button"
            onClick={() => navigate(-1)}
            aria-label="Previous business"
          >
            ←
          </button>

          <span>EXPLORE OUR BUSINESSES</span>

          <button
            type="button"
            onClick={() => navigate(1)}
            aria-label="Next business"
          >
            →
          </button>
        </div>
      </section>

      <footer className="footer">
        <span className="footer-copy">
          © {new Date().getFullYear()} MNGM GROUP
        </span>

        <nav className="legal-links" aria-label="Legal">
          <a href="/privacy">Privacy</a>
          <a href="/terms">Terms</a>
          <a href="/legal">Legal</a>
        </nav>
      </footer>
    </main>
  );
}