import logo from "../images/logo.svg";

function Header() {
  return (
    <div className="Header">
      <header className="header">
        <img src={logo} alt="Логотип" className="header__logo" />
      </header>
    </div>
  );
}

export default Header;
