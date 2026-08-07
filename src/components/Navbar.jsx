import logo from "../assets/mngm-logo.png";

function Navbar() {
  return (
    <nav className="navbar">
      <img
        src={logo}
        alt="MNGM Group"
        className="navbar-logo"
        width="60"
        height="60"
      />

      <h1 className="navbar-title">
        MNGM Group
      </h1>
    </nav>
  );
}

export default Navbar;