import { useState, useEffect } from "react";
import "../index.css";
import Footer from "./Footer";
import Header from "./Header";
import Main from "./Main";
import ImagePopup from "./ImagePopup";
import CurrentUserContext from "../contexts/CurrentUserContext";
import api from "../utils/api";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import Login from "./Login";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";
import InfoTooltip from "./InfoTooltip";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import * as auth from "../utils/auth";
import unionYes from "../images/unionYes.svg";
import unionNo from "../images/unionNo.svg";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [popupStatus, setPopupStatus] = useState(false);
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isEmail, setIsEmail] = useState(null);
  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = useState(false);

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (userId) {
    api
      .getUserInfo()
      .then((profileInfo) => setCurrentUser(profileInfo))
      .catch((err) => console.log(err));

    api
      .getInitialCards()
      .then((data) => {
        setCards(
          data.map((card) => ({
            _id: card._id,
            name: card.name,
            link: card.link,
            likes: card.likes,
            owner: card.owner,
          })).reverse()
        );
      })
      .catch((err) => console.log(err));
  }}, []);

  // проверка токена
  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (userId) {
      auth
        .checkToken(userId)
        .then((res) => {
          if (res) {
          if (res) {
            setIsLoggedIn(true);
            setIsEmail(res.email);
            navigate("/");
          }
        }
        })
        .catch((err) => {
          localStorage.removeItem('userId');
          console.log(err)});
    }
  }, [navigate]);

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(null);
    setIsInfoTooltipPopupOpen(false);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    api
      .addLike(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => console.log(err));
  }

  //удаление карточки
  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() =>
        setCards((state) => state.filter((item) => item._id !== card._id))
      )
      .catch((err) => console.log(err));
  }

  //обновить профиль
  function handleUpdateUser(profileData) {
    api
      .changeUserData(profileData)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  //обновить аватарку
  function handleUpdateAvatar(avatarData) {
    api
      .changeUserAvatar(avatarData)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleAddPlaceSubmit(data) {
    api
      .addCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  // регистрация
  function handleRegister(email, password) {
    auth
      .register(email, password)
      .then((res) => {
        if (res) {
          setPopupStatus({
            image: unionYes,
            message: "Вы успешно зарегистрировались!",
          });
          navigate("/sign-in");
          setIsLoggedIn(true);
          setIsEmail(res.email);
        } 
      })
      .catch(() => {
        setPopupStatus({
          image: unionNo,
          message: "Что-то пошло не так! Попробуйте еще раз.",
        });
      })
      .finally(handleInfoTooltip);
  }

  function handleInfoTooltip() {
    setIsInfoTooltipPopupOpen(true);
  }

  //логин
  function handleLogin(email, password) {
    auth
      .authorize(email, password)
      .then((res) => {
        localStorage.setItem('userId', res._id);
        setIsLoggedIn(true);
        setIsEmail(res.email);
        navigate("/");
      })
      .catch((err) => {
        setPopupStatus({
          image: unionNo,
          message: "Что-то пошло не так! Попробуйте еще раз.",
        });
        handleInfoTooltip();
      });
  }

  //выход
  function handleLogOut() {
    localStorage.removeItem('userId');
    setIsLoggedIn(false);
    setIsEmail(null);
    navigate("/");
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="app">
        <div className="page">
          <Routes>
            <Route
              path="/sign-up"
              element={
                <>
                  <Header title="Войти" route="/sign-in" />
                  <Register onRegister={handleRegister} />
                </>
              }
            />
            <Route
              path="/sign-in"
              element={
                <>
                  <Header title="Регистрация" route="/sign-up" />
                  <Login onLogin={handleLogin} />
                </>
              }
            />
            <Route
              path="/"
              element={
                <>
                  <Header
                    title="Выйти"
                    route=""
                    email={isEmail}
                    onClick={handleLogOut}
                  />
                  <ProtectedRoute
                    path="/"
                    component={Main}
                    isLoggedIn={isLoggedIn}
                    onEditProfile={setIsEditProfilePopupOpen}
                    onAddPlace={setIsAddPlacePopupOpen}
                    onEditAvatar={setIsEditAvatarPopupOpen}
                    onCardClick={setSelectedCard}
                    onCardLike={handleCardLike}
                    onCardDelete={handleCardDelete}
                    cards={cards}
                  />
                  <Footer />
                </>
              }
            />
            <Route
              path="*"
              element={
                isLoggedIn ? <Navigate to="/" /> : <Navigate to="/sign-in" />
              }
            />
          </Routes>
        </div>

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onUpdateUser={handleUpdateUser}
          onClose={closeAllPopups}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddCard={handleAddPlaceSubmit}
        />

        <ImagePopup card={selectedCard} onClose={closeAllPopups} />

        <InfoTooltip
          popupStatus={popupStatus}
          isOpen={isInfoTooltipPopupOpen}
          onClose={closeAllPopups}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
