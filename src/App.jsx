
import { useEffect, useState } from "react";
import "./App.css";

const ventures = [
  {
    id: "studios",
    number: "01",
    name: "MNGM Studios",
    category: "DIGITAL / CREATIVE",
    description:
      "Websites and digital experiences designed to make businesses stand apart.",
    link: "https://mngmstudios.com",
    accent: "#FF784F",
    status: "ACTIVE VENTURE",
    monogram: "MNGM",
  },
  {
    id: "moovio",
    number: "02",
    name: "moovio",
    category: "SOFTWARE / AUTOMOTIVE",
    description:
      "A smarter way for automotive repair shops to keep their customers informed.",
    link: "https://moovio.world",
    accent: "#8CAFFF",
    status: "IN DEVELOPMENT",
    monogram: "moovio.",
  },
  {
    id: "sabl",
    number: "03",
    name: "sabl.",
    category: "MONEY / FINANCE",
    description:
      "Money Better.",
    link: null,
    accent: "#C9A86C",
    status: "IN DEVELOPMENT",
    monogram: "sabl.",
  },
  {
    id: "logic",
    number: "04",
    name: "Logic",
    category: "AI / TECHNOLOGY",
    description:
      "Logic is an AI that pushes you to get further.",
    link: "https://uselogic.app",
    accent: "#8B5CF6",
    status: "IN DEVELOPMENT",
    monogram: "logic",
  },
];

function ArrowIcon({ diagonal = false }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {diagonal ? (
        <>
          <path d="M7 17 17 7" />
          <path d="M8 7h9v9" />
        </>
      ) : (
        <>
          <path d="M4 12h16" />
          <path d="m13 5 7 7-7 7" />
        </>
      )}
    </svg>
  );
}

function Reveal({ children, className = "", delay = 0 }) {
  return (
    <div
      className={`reveal ${className}`}
      style={{ "--reveal-delay": `${delay}ms` }}
    >
      {children}
    </div>
  );
}

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("menu-open", menuOpen);

    return () => document.body.classList.remove("menu-open");
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className={`site-header ${scrolled ? "scrolled" : ""}`}>
      <div className="header-inner">
        <a
          href="#home"
          className="header-logo"
          onClick={closeMenu}
          aria-label="MNGM Group home"
        >
          MNGM<span className="registered">®</span>
        </a>

        <nav className="desktop-nav" aria-label="Main navigation">
          <a href="#ventures">Ventures</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </nav>

        <a href="#ventures" className="header-action">
          Explore the group <ArrowIcon diagonal />
        </a>

        <button
          type="button"
          className={`menu-toggle ${menuOpen ? "active" : ""}`}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span />
          <span />
        </button>
      </div>

      <nav
        id="mobile-navigation"
        className={`mobile-nav ${menuOpen ? "open" : ""}`}
        aria-label="Mobile navigation"
        aria-hidden={!menuOpen}
        inert={!menuOpen}
      >
        <a href="#home" onClick={closeMenu}>
          Home <span>01</span>
        </a>
        <a href="#ventures" onClick={closeMenu}>
          Ventures <span>02</span>
        </a>
        <a href="#about" onClick={closeMenu}>
          About <span>03</span>
        </a>
        <a href="#contact" onClick={closeMenu}>
          Contact <span>04</span>
        </a>

        <div className="mobile-nav-bottom">
          INDEPENDENT BY DESIGN.
          <br />
          ESTABLISHED 2026.
        </div>
      </nav>
    </header>
  );
}

function Hero() {
  return (
    <section className="hero" id="home">
      <div className="hero-orbit hero-orbit-one" />
      <div className="hero-orbit hero-orbit-two" />
      <div className="hero-orbit hero-orbit-three" />

      <div className="hero-content container">
        <Reveal>
          <div className="eyebrow hero-eyebrow">
            <span className="eyebrow-dot" />
            INDEPENDENT BY DESIGN
            <span className="eyebrow-divider" />
            EST. 2026
          </div>
        </Reveal>

        <Reveal delay={100}>
          <h1 className="hero-title">
            Built to build
            <br />
            <span>what's next.</span>
          </h1>
        </Reveal>

        <Reveal delay={200}>
          <p className="hero-description">
            An independent group creating ambitious businesses,
            digital products, and experiences.
          </p>
        </Reveal>

        <Reveal delay={300}>
          <a className="primary-button" href="#ventures">
            Explore our ventures
            <ArrowIcon diagonal />
          </a>
        </Reveal>
      </div>

      <div className="hero-bottom container">
        <span>THE MNGM GROUP</span>
        <a href="#ventures">
          SCROLL TO EXPLORE <span className="scroll-arrow">↓</span>
        </a>
      </div>
    </section>
  );
}

function VentureCard({ venture }) {
  return (
    <a
      className={`venture-card venture-${venture.id}`}
      href={venture.link}
      target="_blank"
      rel="noopener noreferrer"
      style={{ "--venture-accent": venture.accent }}
      aria-label={`Visit ${venture.name} website`}
    >
      <div className="venture-glow" />

      <div className="venture-card-top">
        <span className="venture-category">{venture.category}</span>

        <span className="venture-arrow">
          <ArrowIcon diagonal />
        </span>
      </div>

      <div className="venture-card-center">
        <div className="venture-monogram">
          {venture.monogram}
        </div>
      </div>

      <div className="venture-card-bottom">
        <div>
          <span className="venture-number">
            {venture.number} / {venture.status}
          </span>
          <h3>{venture.name}</h3>
          <p>{venture.description}</p>
        </div>
      </div>
    </a>
  );
}

function Ventures() {
  return (
    <section className="ventures-section section-padding" id="ventures">
      <div className="container">
        <Reveal>
          <div className="section-heading">
            <div>
              <div className="section-label">
                <span>01</span>
                <span className="label-line" />
                OUR COMPANIES
              </div>

              <h2>
                The ventures<span className="heading-period">.</span>
              </h2>
            </div>

            <span className="section-count">
              01 — {String(ventures.length).padStart(2, "0")}
            </span>
          </div>
        </Reveal>

        <div className="venture-grid">
          {ventures.map((venture, index) => (
            <Reveal key={venture.id} delay={index * 100}>
              <VentureCard venture={venture} />
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="ventures-footer">
            <span>DIFFERENT INDUSTRIES. ONE AMBITION.</span>
            <span>BUILD THINGS THAT MATTER. ↗</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function About() {
  return (
    <section className="about-section section-padding" id="about">
      <div className="container">
        <Reveal>
          <div className="section-label">
            <span>02</span>
            <span className="label-line" />
            THE GROUP
          </div>
        </Reveal>

        <Reveal delay={100}>
          <h2 className="about-statement">
            We believe the best ideas deserve more than just a plan.
            <span> They deserve to be built.</span>
          </h2>
        </Reveal>

        <Reveal delay={200}>
          <div className="about-details">
            <div className="about-detail-label">WHO WE ARE</div>

            <p>
              MNGM Group is an independent parent company focused
              on developing and operating ventures across
              technology, creative services, and beyond.
            </p>

            <div className="about-location">
              <span className="location-dot" />
              FOUNDED IN UTAH, USA
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Contact() {
  const [copied, setCopied] = useState(false);

  async function copyPhone() {
    const phone = "4352782290";

    try {
      await navigator.clipboard.writeText(phone);
      setCopied(true);
    } catch {
      const input = document.createElement("textarea");
      input.value = phone;
      input.style.position = "fixed";
      input.style.opacity = "0";
      document.body.appendChild(input);
      input.select();

      const success = document.execCommand("copy");
      document.body.removeChild(input);

      if (success) {
        setCopied(true);
      } else {
        window.location.href = `tel:${phone}`;
        return;
      }
    }

    window.setTimeout(() => setCopied(false), 2500);
  }

  return (
    <section className="contact-section section-padding" id="contact">
      <div className="container">
        <Reveal>
          <div className="section-label">
            <span>03</span>
            <span className="label-line" />
            GET IN TOUCH
          </div>

          <h2 className="contact-title">
            Let's make
            <br />
            something <span>happen.</span>
          </h2>

          <p className="contact-description">
            Have an idea, an opportunity, or something worth building?
            We'd like to hear about it.
          </p>

          <button
            type="button"
            className="contact-button"
            onClick={copyPhone}
            aria-live="polite"
          >
            {copied ? "Number copied!" : "Get in touch"}
            <ArrowIcon diagonal />
          </button>
        </Reveal>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <a href="#home" className="footer-logo">
            MNGM<span>®</span>
          </a>

          <div className="footer-tagline">
            BUILT TO BUILD WHAT'S NEXT.
          </div>
        </div>

        <div className="footer-divider" />

        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} MNGM GROUP, LLC</span>

          <div className="footer-links">
            <a href="#ventures">VENTURES</a>
            <a href="#about">ABOUT</a>
            <a href="#contact">CONTACT</a>
          </div>

          <a href="#home" className="back-to-top">
            BACK TO TOP ↑
          </a>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  useEffect(() => {
    document.title = "MNGM Group — Built to Build What's Next";

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -25px 0px" }
    );

    document.querySelectorAll(".reveal").forEach((element) => {
      observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="app">
      <Header />

      <main>
        <Hero />
        <Ventures />
        <About />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}
