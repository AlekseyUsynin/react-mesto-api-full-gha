import { Link } from "react-router-dom";

function Header(props) {
  return (
    <header className="header">
      <div className="header__logo"></div>
      <div
        className="header__authorization"
        to={props.route}
        onClick={props.onClick}
      >
        <p className="header__text">{props.email}</p>
        <Link className="header__link" to={props.route} onClick={props.onClick}>
          {props.title}
        </Link>
      </div>
    </header>
  );
}

export default Header;
