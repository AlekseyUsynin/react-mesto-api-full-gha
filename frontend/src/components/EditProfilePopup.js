import React from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

function EditProfilePopup({ onUpdateUser, isOpen, onClose }) {
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const currentUser = React.useContext(CurrentUserContext);

  // После загрузки текущего пользователя из API
  // его данные будут использованы в управляемых компонентах.
  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  function handleChangeName(evt) {
    setName(evt.target.value);
  }

  function handleChangeDescription(evt) {
    setDescription(evt.target.value);
  }

  function handleSubmit(evt) {
    // Запрещаем браузеру переходить по адресу формы
    evt.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateUser({
      name: name,
      about: description,
    });
  }

  return (
    <PopupWithForm // popup редактирования профиля
      name="edit-profile"
      title="Редактировать профиль"
      onSubmit={handleSubmit}
      isOpen={isOpen}
      onClose={onClose}
      textButton="Сохранить"
    >
      <input
        className="popup__input popup__input_type_name"
        id="title"
        type="text"
        placeholder="Имя"
        name="titleSelector"
        onChange={handleChangeName}
        value={name || ""}
      />
      <span className="title-error popup__input-error"></span>
      <input
        id="info"
        className="popup__input popup__input_type_job"
        type="text"
        placeholder="О себе"
        name="infoSelector"
        required
        onChange={handleChangeDescription}
        value={description || ""}
      />
      <span className="info-error popup__input-error"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
