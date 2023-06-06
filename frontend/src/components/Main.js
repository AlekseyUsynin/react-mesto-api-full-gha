import React from "react";
import Card from "./Card";
import CurrentUserContext from "../contexts/CurrentUserContext";

function Main({
  cards,
  onEditAvatar,
  onEditProfile,
  onAddPlace,
  onCardClick,
  onCardLike,
  onCardDelete,
}) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main>
      {/* раздел профиль */}
      <section className="profile">
        <div className="profile__container">
          <div
            className="profile__edit-avatar"
            onClick={() => {
              onEditAvatar(true);
            }}
          >
            <img
              className="profile__avatar"
              src={currentUser.avatar}
              alt="Аватарка"
            />
          </div>
          <div className="profile__info">
            <h1 className="profile__title" name="profileTitle">
              {currentUser.name}
            </h1>
            <button
              className="profile__edit-button"
              type="button"
              onClick={() => {
                onEditProfile(true);
              }}
            ></button>
            <p className="profile__subtitle">{currentUser.about}</p>
          </div>
        </div>
        <button
          className="profile__add-button"
          type="button"
          onClick={() => {
            onAddPlace(true);
          }}
        ></button>
      </section>

      {/* конструктор карточки */}
      <section className="elements">
        {cards.map((card) => (
          <Card
            card={card}
            key={card._id}
            onCardDelete={onCardDelete}
            onCardClick={onCardClick}
            onCardLike={onCardLike}
          />
        ))}
      </section>
    </main>
  );
}

export default Main;
