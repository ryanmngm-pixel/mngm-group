import logo from "../assets/mngm-logo.png";

function Navbar() {
  return (
    <nav className="navbar">
      <img
        src={logo}
        alt="MNGM Group"
        className="navbar-logo"
      />
    </nav>
  );
}

export default Navbar;