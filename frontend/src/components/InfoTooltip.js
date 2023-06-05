export default function InfoTooltip(props) {
  return (
    <section
      className={`popup popup_tooltip ${props.isOpen ? "popup_opened" : ""}`}
    >
      <div className="popup__container">
        <button
          className="popup__button-close"
          onClick={props.onClose}
          type="button"
        ></button>
        <form className="popup__form">
          <img
            src={props.popupStatus.image}
            alt={props.popupStatus.message}
            className="popup__icon"
          />
          <p className="popup__caption">{props.popupStatus.message}</p>
        </form>
      </div>
    </section>
  );
}
