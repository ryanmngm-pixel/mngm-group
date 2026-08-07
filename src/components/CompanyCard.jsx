function CompanyCard({ title, description, status, link }) {
  const handleClick = () => {
    if (link) {
      window.open(link, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div
      className={`company-card ${!link ? "disabled" : ""}`}
      onClick={handleClick}
    >
      <div className="card-header">
        <h2>{title}</h2>

        <div className={`status-light ${status}`}></div>
      </div>

      <p>{description}</p>
    </div>
  );
}

export default CompanyCard;