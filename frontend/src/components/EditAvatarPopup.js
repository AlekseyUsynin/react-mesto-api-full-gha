import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ onUpdateAvatar, isOpen, onClose }) {
  const editAvatarRef = React.useRef(null);

  React.useEffect(() => {
    editAvatarRef.current.value = "";
  }, [isOpen]);

  function handleSubmit(evt) {
    evt.preventDefault();

    onUpdateAvatar({
      avatar: editAvatarRef.current.value,
    });
  }

  function handleChangeAvatar() {
    return editAvatarRef.current.value;
  }

  return (
    <PopupWithForm // popup avatar
      isOpen={isOpen}
      onClose={onClose}
      name="popup-form-avatar"
      title="Обновить аватар"
      textButton="Сохранить"
      onSubmit={handleSubmit}
    >
      <input
        id="avatar"
        className="popup__input popup__input_type_avatar"
        type="url"
        name="avatar"
        placeholder="Ссылка на картинку"
        required
        onChange={handleChangeAvatar}
        ref={editAvatarRef}
      />
      <span className="avatar-error popup__input-error"></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
