import { useState } from "react";
import { Link } from "react-router-dom";

export default function Register({ onRegister }) {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  function handleSubmit(evt) {
    evt.preventDefault();
    onRegister(email, password);
  }

  function handleEmailInput(evt) {
    setEmail(evt.target.value);
  }

  function handlePasswordInput(evt) {
    setPassword(evt.target.value);
  }

  return (
    <section className="register">
      <h3 className="register__title">Регистрация</h3>
      <form className="register__form" onSubmit={handleSubmit}>
        <input
          className="register register__input"
          onChange={handleEmailInput}
          type="email"
          placeholder="Email"
          value={email}
          required
        ></input>
        <input
          className="register__input"
          onChange={handlePasswordInput}
          type="password"
          placeholder="Пароль"
          value={password}
          required
        ></input>
        <button className="register__submit-button" type="submit">
          Зарегистрироваться
        </button>
      </form>
      <div className="register__contain">
        <p className="register__text">Уже зарегистрированы?</p>
        <Link className="register__link" to="/sign-in">
          &nbsp;Войти
        </Link>
      </div>
    </section>
  );
}
