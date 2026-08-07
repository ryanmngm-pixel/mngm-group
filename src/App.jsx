import "./App.css";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import CompanyCard from "./components/CompanyCard";
import Footer from "./components/Footer";

import companies from "./data/companies";

function App() {
  return (
    <>
      <Navbar />

      <Hero />

      <main className="company-grid">
        {companies.map((company) => (
          <CompanyCard
            key={company.title}
            title={company.title}
            description={company.description}
            status={company.status}
            link={company.link}
          />
        ))}
      </main>

      <Footer />
    </>
  );
}

export default App;