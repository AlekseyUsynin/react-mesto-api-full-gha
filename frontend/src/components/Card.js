import React from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = React.useContext(CurrentUserContext);
  // Определяем, являемся ли мы владельцем текущей карточк
  const isOwn = card.owner._id === currentUser._id;
  
  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = card.likes.some((i) => i._id === currentUser._id);

  // Создаём переменную, которую после зададим в `className` для кнопки лайка
  const cardLikeButtonClassName = `element__like ${isLiked && 'element__like_active'}`;

  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  return (
    <div className="element">
      <img
        onClick={handleClick}
        className="element__image"
        alt={card.name}
        src={card.link}
      />
      <h2 className="element__title">{card.name}</h2>
      <div className="element__like-container">
        <button
          className={cardLikeButtonClassName}
          type="button"
          onClick={handleLikeClick}
        ></button>
        <p className="element__likes-number">{card.likes.length}</p>
      </div>
      {/* <button className="element__delete"></button> */}
      {/* В разметке используем переменную для условного рендеринга */}
      {isOwn && (
        <button className="element__delete" onClick={handleDeleteClick} />
      )}
    </div>
  );
}

export default Card;
