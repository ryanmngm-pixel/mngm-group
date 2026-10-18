import { useState, useRef, useEffect } from "react";
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
    name: "MNGM Services",
    category: "PROFESSIONAL SERVICES",
    description: "Services built around getting things done.",
    number: "02",
    href: "/services",
  },
  {
    name: "MNGM Auto",
    category: "AUTOMOTIVE",
    description: "Driven by a better way forward.",
    number: "03",
    href: "/auto",
  },
  {
    name: "Logic",
    category: "TECHNOLOGY",
    description: "A smarter way to stay accountable.",
    number: "04",
    href: "/logic",
  },
  {
    name: "Stride",
    category: "FINANCIAL TECHNOLOGY",
    description: "A better relationship with your money.",
    number: "05",
    href: "/stride",
  },
  {
    name: "Moovio",
    category: "SOFTWARE",
    description: "Better experiences for automotive businesses.",
    number: "06",
    href: "/moovio",
  },
];

function ArrowIcon({ direction = "right" }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={`arrow-icon arrow-icon-${direction}`}
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
  const [isDragging, setIsDragging] = useState(false);

  const startX = useRef(0);
  const dragDistance = useRef(0);
  const pointerId = useRef(null);
  const cardRef = useRef(null);

  const activeBusiness = businesses[activeIndex];

  function navigate(step) {
    setDirection(step);
    setActiveIndex(
      (current) =>
        (current + step + businesses.length) % businesses.length
    );
  }

  function handlePointerDown(event) {
    if (event.button !== 0) return;

    startX.current = event.clientX;
    dragDistance.current = 0;
    pointerId.current = event.pointerId;

    setIsDragging(true);
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function handlePointerMove(event) {
    if (!isDragging || pointerId.current !== event.pointerId) return;

    dragDistance.current = event.clientX - startX.current;
  }

  function handlePointerUp(event) {
    if (pointerId.current !== event.pointerId) return;

    const distance = dragDistance.current;

    setIsDragging(false);
    pointerId.current = null;

    if (Math.abs(distance) > 55) {
      navigate(distance < 0 ? 1 : -1);
    }
  }

  function handlePointerCancel() {
    setIsDragging(false);
    pointerId.current = null;
    dragDistance.current = 0;
  }

  function handleCardClick(event) {
    if (Math.abs(dragDistance.current) > 10) {
      event.preventDefault();
      return;
    }

    window.location.href = activeBusiness.href;
  }

  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === "ArrowRight") navigate(1);
      if (event.key === "ArrowLeft") navigate(-1);
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <main className="site">
      <header className="header">
        <a className="wordmark" href="/" aria-label="MNGM Group home">
          <span className="wordmark-main">MNGM</span>
          <span className="wordmark-sub">GROUP</span>
        </a>

        <div className="header-label">
          <span className="status-dot" />
          <span>AN INDEPENDENT PORTFOLIO</span>
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
        <div className="orbit orbit-outer" aria-hidden="true" />
        <div className="orbit orbit-inner" aria-hidden="true" />

        <div className="portfolio-meta">
          <span className="portfolio-label">OUR BUSINESSES</span>

          <span className="portfolio-count" aria-live="polite">
            {activeBusiness.number}
            <span>/</span>
            {String(businesses.length).padStart(2, "0")}
          </span>
        </div>

        <div
          className={`carousel ${isDragging ? "is-dragging" : ""}`}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerCancel}
        >
          <a
            key={activeBusiness.name}
            ref={cardRef}
            className={`business-card ${
              direction > 0 ? "enter-right" : "enter-left"
            }`}
            href={activeBusiness.href}
            onClick={handleCardClick}
            draggable="false"
          >
            <span className="card-top">
              <span className="card-number">
                {activeBusiness.number}
              </span>

              <span className="card-arrow">
                <ArrowIcon />
              </span>
            </span>

            <span className="card-main">
              <span className="card-name">
                {activeBusiness.name}
              </span>

              <span className="card-category">
                {activeBusiness.category}
              </span>
            </span>

            <span className="card-bottom">
              <span className="card-description">
                {activeBusiness.description}
              </span>

              <span className="card-explore">
                EXPLORE
                <ArrowIcon />
              </span>
            </span>
          </a>
        </div>

        <div className="carousel-controls">
          <button
            className="nav-button"
            type="button"
            onClick={() => navigate(-1)}
            aria-label="Previous business"
          >
            <ArrowIcon direction="left" />
          </button>

          <span className="controls-label">DRAG TO EXPLORE</span>

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

      <footer className="footer">
        <span className="footer-copy">
          © {new Date().getFullYear()} MNGM GROUP
        </span>

<nav className="legal-links" aria-label="Footer links">
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