import { useState } from "react";
import "./App.css";

const businesses = [
  {
    name: "MNGM Studios",
    category: "DIGITAL & CREATIVE",
    description: "Digital experiences built for business.",
    number: "01",
    href: "https://www.mngmstudios.com/",
  },
  {
    name: "MNGM Detailing",
    category: "PROFESSIONAL DETAILING",
    description: "Detailing built around getting things done.",
    number: "02",
    href: "https://www.mngmdetailing.com/",
  },
  {
    name: "MNGM Auto",
    category: "AUTOMOTIVE",
    description: "Driven by a better way forward.",
    number: "03",
    href: null,
  },
  {
    name: "Logic",
    category: "TECHNOLOGY",
    description: "A smarter way to stay accountable.",
    number: "04",
    href: "https://www.uselogic.app/",
  },
  {
    name: "Cendra",
    category: "FINANCIAL TECHNOLOGY",
    description: "A better relationship with your money.",
    number: "05",
    href: "https://www.getcendra.app/",
  },
  {
    name: "Moovio",
    category: "SOFTWARE",
    description: "Better experiences for automotive businesses.",
    number: "06",
    href: "https://www.moovio.world/",
  },
];

function ArrowIcon({ direction = "right" }) {
  return (
    <svg
      className={`arrow-icon arrow-icon-${direction}`}
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M4.5 12H19.5M13 5.5L19.5 12L13 18.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function App() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const activeBusiness = businesses[activeIndex];

  function navigate(step) {
    setDirection(step);

    setActiveIndex((current) => {
      return (
        (current + step + businesses.length) % businesses.length
      );
    });
  }

  function handleCardClick(event) {
    if (!activeBusiness.href) {
      event.preventDefault();
      return;
    }

    // External websites use normal anchor navigation.
    // No JavaScript redirect is necessary.
  }

  return (
    <main className="site">
      {/* HEADER */}

      <header className="header">
        <a
          className="wordmark"
          href="/"
          aria-label="MNGM Group home"
        >
          <span className="wordmark-main">MNGM</span>
          <span className="wordmark-sub">GROUP</span>
        </a>

        <div className="header-label">
          <span className="status-dot" />
          <span>AN INDEPENDENT PORTFOLIO</span>
        </div>
      </header>

      {/* INTRODUCTION */}

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

      {/* BUSINESS CAROUSEL */}

      <section
        className="portfolio"
        aria-label="Explore our businesses"
      >
        <div
          className="orbit orbit-outer"
          aria-hidden="true"
        />

        <div
          className="orbit orbit-inner"
          aria-hidden="true"
        />

        <div className="portfolio-meta">
          <span className="portfolio-label">
            OUR BUSINESSES
          </span>

          <span
            className="portfolio-count"
            aria-live="polite"
          >
            {activeBusiness.number}
            <span>/</span>
            {String(businesses.length).padStart(2, "0")}
          </span>
        </div>

        <div className="carousel">
          {/*
            The card is a real link when a destination exists.
            Businesses without websites remain non-navigating cards.
          */}

          {activeBusiness.href ? (
            <a
              key={activeBusiness.name}
              className={`business-card ${
                direction > 0
                  ? "enter-right"
                  : "enter-left"
              }`}
              href={activeBusiness.href}
              onClick={handleCardClick}
            >
              <CardContent business={activeBusiness} />
            </a>
          ) : (
            <div
              key={activeBusiness.name}
              className={`business-card ${
                direction > 0
                  ? "enter-right"
                  : "enter-left"
              }`}
            >
              <CardContent business={activeBusiness} />
            </div>
          )}
        </div>

        {/* NAVIGATION */}

        <div className="carousel-controls">
          <button
            className="nav-button"
            type="button"
            onClick={() => navigate(-1)}
            aria-label="Previous business"
          >
            <ArrowIcon direction="left" />
          </button>

          <span className="controls-label">
            DRAG TO EXPLORE
          </span>

          <button
            className="nav-button"
            type="button"
            onClick={() => navigate(1)}
            aria-label="Next business"
          >
            <ArrowIcon />
          </button>
        </div>
      </section>

      {/* FOOTER */}

      <footer className="footer">
        <span className="footer-copy">
          © {new Date().getFullYear()} MNGM GROUP
        </span>

        <nav
          className="legal-links"
          aria-label="Footer links"
        >
          <a
            href="https://www.instagram.com/theprinceryan/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Instagram ↗
          </a>

          <a href="/privacy">Privacy</a>

          <a href="/terms">Terms</a>

          <a href="/legal">Legal</a>
        </nav>
      </footer>
    </main>
  );
}

function CardContent({ business }) {
  return (
    <>
      <span className="card-top">
        <span className="card-number">
          {business.number}
        </span>

        <span className="card-arrow">
          <ArrowIcon />
        </span>
      </span>

      <span className="card-main">
        <span className="card-name">
          {business.name}
        </span>

        <span className="card-category">
          {business.category}
        </span>
      </span>

      <span className="card-bottom">
        <span className="card-description">
          {business.description}
        </span>

        <span className="card-explore">
          EXPLORE
          <ArrowIcon />
        </span>
      </span>
    </>
  );
}