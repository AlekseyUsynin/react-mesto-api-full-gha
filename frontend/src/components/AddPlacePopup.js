import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onAddCard }) {
  const [name, setName] = React.useState("");
  const [link, setLink] = React.useState("");

  React.useEffect(() => {
    setName("");
    setLink("");
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    onAddCard({
      name: name,
      link: link,
    });
  }

  function handleChangePlaceName(e) {
    setName(e.target.value);
  }

  function handleChangePlaceLink(e) {
    setLink(e.target.value);
  }

  return (
    <PopupWithForm // popup добавлекния карточек
      isOpen={isOpen}
      onClose={onClose}
      name="add-profile"
      title="Новое место"
      textButton="Сохранить"
      onSubmit={handleSubmit}
    >
      <input
        id="name"
        className="popup__input popup_edit-profile"
        type="text"
        placeholder="Название"
        name="name"
        required
        onChange={handleChangePlaceName}
        value={name}
      />
      <span className="name-error popup__input-error"></span>
      <input
        id="link"
        className="popup__input popup__input_type_link"
        type="url"
        placeholder="Ссылка на картинку"
        name="link"
        required
        onChange={handleChangePlaceLink}
        value={link}
      />
      <span className="link-error popup__input-error"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
