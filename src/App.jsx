import { useEffect, useState } from "react";
import Orbit from "./Orbit";
import "./App.css";

const ventures = [
  {
    id: "studios",
    name: "MNGM Studios",
    category: "Digital and creative",
    description: "Websites and digital experiences designed to make businesses stand apart.",
    link: "https://mngmstudios.com",
    accent: "#FF784F",
    live: true,
  },
  {
    id: "mylynkr",
    name: "Mylynkr",
    category: "Smart home",
    description: "Mylynkr is a smart home solution that makes life easier.",
    link: "https://mylynkr.com",
    accent: "#6070CE",
    live: false,
  },
  {
    id: "sabl",
    name: "sabl.",
    category: "Money and finance",
    description: "Money better.",
    link: null,
    accent: "#C9A86C",
    live: false,
  },
  {
    id: "logic",
    name: "Logic",
    category: "AI and technology",
    description: "Logic is an AI that pushes you to get further.",
    link: "https://uselogic.app",
    accent: "#8B5CF6",
    live: false,
  },
];

const STATEMENT =
  "We believe the best ideas deserve more than just a plan. They deserve to be built.";

function ArrowIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M7 17 17 7" />
      <path d="M8 7h9v9" />
    </svg>
  );
}

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("menu-open", menuOpen);
    if (!menuOpen) return () => document.body.classList.remove("menu-open");

    const onKey = (event) => event.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.classList.remove("menu-open");
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className={`site-header ${scrolled ? "scrolled" : ""} ${menuOpen ? "open" : ""}`}>
      <div className="header-inner">
        <a href="#home" className="logo" onClick={closeMenu} aria-label="MNGM Group home">
          MNGM<span className="logo-sub">Group</span>
        </a>

        <nav className="desktop-nav" aria-label="Main navigation">
          <a href="#ventures">Ventures</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </nav>

        <a href="#contact" className="header-action">
          Get in touch <ArrowIcon />
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
        {["Home", "Ventures", "About", "Contact"].map((title, i) => (
          <a key={title} href={i === 0 ? "#home" : `#${title.toLowerCase()}`} onClick={closeMenu}
            style={{ "--i": i }}>
            {title}
            <ArrowIcon />
          </a>
        ))}
        <p className="mobile-nav-bottom">Independent by design. Founded in Utah, 2026.</p>
      </nav>
    </header>
  );
}

function Hero() {
  const words = ["Built", "to", "build", "what's", "next."];

  return (
    <section className="hero" id="home">
      <Orbit ventures={ventures} />
      <div className="hero-veil" aria-hidden="true" />

      <div className="hero-content container">
        <p className="hero-kicker load" style={{ "--d": "0.2s" }}>
          <span className="signal" aria-hidden="true" />
          Independent holding company, founded in Utah
        </p>

        <h1 className="hero-title" aria-label="Built to build what's next.">
          {words.map((word, i) => (
            <span className="word" key={word} aria-hidden="true">
              <span style={{ "--d": `${0.35 + i * 0.09}s` }}>{word}</span>
            </span>
          ))}
        </h1>

        <p className="hero-description load" style={{ "--d": "0.9s" }}>
          MNGM Group creates and runs ambitious businesses, digital products, and experiences.
        </p>

        <div className="load" style={{ "--d": "1.05s" }}>
          <a className="button" href="#ventures">
            Explore our ventures <ArrowIcon />
          </a>
        </div>
      </div>

      <div className="hero-legend container load" style={{ "--d": "1.4s" }}>
        <span className="legend-title">In orbit</span>
        <ul>
          {ventures.map((v) => (
            <li key={v.id} style={{ "--accent": v.accent }}>{v.name}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function VentureCard({ venture }) {
  const Tag = venture.link ? "a" : "div";
  const linkProps = venture.link
    ? { href: venture.link, target: "_blank", rel: "noopener noreferrer" }
    : {};

  // The accent light follows the cursor across the panel
  const track = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--mx", `${event.clientX - rect.left}px`);
    event.currentTarget.style.setProperty("--my", `${event.clientY - rect.top}px`);
  };

  return (
    <Tag
      className={`venture ${venture.link ? "" : "is-static"}`}
      style={{ "--accent": venture.accent }}
      onPointerMove={track}
      {...linkProps}
    >
      <div className="venture-top">
        <span className="venture-category">{venture.category}</span>
        <span className={`venture-status ${venture.live ? "is-live" : ""}`}>
          {venture.live ? "Live" : "In development"}
        </span>
      </div>

      <h3 className="venture-name">{venture.name}</h3>

      <div className="venture-bottom">
        <p>{venture.description}</p>
        {venture.link ? (
          <span className="venture-link">
            {venture.link.replace("https://", "")} <ArrowIcon />
          </span>
        ) : (
          <span className="venture-link is-muted">Launching soon</span>
        )}
      </div>
    </Tag>
  );
}

function Ventures() {
  return (
    <section className="section ventures" id="ventures">
      <div className="container">
        <div className="section-heading">
          <h2>The ventures</h2>
          <p>Different industries, one ambition: build things that matter.</p>
        </div>

        <div className="venture-grid">
          {ventures.map((venture) => (
            <VentureCard key={venture.id} venture={venture} />
          ))}
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section className="section about" id="about">
      <div className="container">
        <p className="statement">
          {STATEMENT.split(" ").map((word, i) => (
            <span key={i}>{word} </span>
          ))}
        </p>

        <div className="about-details">
          <h2>Who we are</h2>
          <p>
            MNGM Group is an independent parent company focused on developing and operating
            ventures across technology, creative services, and beyond.
          </p>
          <p className="about-location">
            <span className="signal" aria-hidden="true" />
            Founded in Utah, USA
          </p>
        </div>
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
    <section className="section contact" id="contact">
      <div className="contact-portal" aria-hidden="true" />
      <div className="container">
        <h2 className="contact-title">Let's make something happen.</h2>

        <p className="contact-description">
          Have an idea, an opportunity, or something worth building? We'd like to hear about it.
        </p>

        <button type="button" className="button button-large" onClick={copyPhone}>
          <span aria-live="polite">{copied ? "Phone number copied" : "Copy our phone number"}</span>
          <ArrowIcon />
        </button>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-mark" aria-hidden="true">MNGM</div>

        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} MNGM Group, LLC</span>
          <nav className="footer-links" aria-label="Footer navigation">
            <a href="#ventures">Ventures</a>
            <a href="#about">About</a>
            <a href="#contact">Contact</a>
          </nav>
          <a href="#home" className="back-to-top">Back to top</a>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
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
