import React from "react";

function PopupWithForm({
  name,
  isOpen,
  onClose,
  title,
  children,
  textButton,
  onSubmit,
}) {
  return (
    <div className={`popup popup_${name} ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container">
        <button
          className="popup__button-close"
          type="button"
          onClick={onClose}
        ></button>
        <form
          className={`popup__form popup__form_${name}`}
          name={`${name}-form`}
          onSubmit={onSubmit}
        >
          <h2 className="popup__title">{title}</h2>
          {children}
          <button className="popup__button-submit" type="submit">
            {textButton || "Сохранить"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
