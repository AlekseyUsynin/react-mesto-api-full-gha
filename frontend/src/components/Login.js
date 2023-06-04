import { useState } from "react";

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handlePasswordInput = (evt) => {
    setPassword(evt.target.value);
  };

  const handleEmailInput = (evt) => {
    setEmail(evt.target.value);
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onLogin(email, password);
  };

  return (
    <section className="login">
      <h2 className="register__title">Вход</h2>
      <form className="register__form" onSubmit={handleSubmit}>
        <input
          className="register__input"
          name="email"
          type="email"
          placeholder="Email"
          value={email}
          onChange={handleEmailInput}
          required
        ></input>
        <input
          className="register__input"
          name="password"
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={handlePasswordInput}
          required
        ></input>
        <button className="register__submit-button" type="submit">
          Войти
        </button>
      </form>
    </section>
  );
}
