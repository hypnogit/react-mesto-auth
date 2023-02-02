import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import { useState, useEffect} from "react";
import ImagePopup from "./ImagePopup";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { api } from "../utils/Api";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);

  const [selectedCard, setSelectedCard] = useState(null);

  const [currentUser, setCurrentUser] = useState({});

  const [cards, setCards] = useState([]);

  useEffect(() => {
    api
      .getInitialCards()
      .then((initialCards) => {
        setCards(initialCards);
      })
      .catch();
  }, []);

  useEffect(() => {
    api
      .getUserInfo()
      .then((userInfo) => {
        setCurrentUser(userInfo);
      })
      .catch();
  }, []);

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
      setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
    });
  }

  function handleCardDelete(card) {
    api
      .removeMyCard(card._id)
      .then(setCards(cards.filter((cardElem) => cardElem._id != card._id)));
  }

  const handleEditAvatarClick = function () {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  };
  const handleEditProfileClick = function () {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
  };
  const handleAddPlaceClick = function () {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
  };
  const closeAllPopups = function () {
    setIsAddPlacePopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard(null);
  };
  const handleCardClick = function (card) {
    setSelectedCard(card);
  };

  const handleUpdateUser = function (updatedUser) {
    api
      .editUserInfo(updatedUser.name, updatedUser.about)
      .then((user) => {
        setCurrentUser(user)
        closeAllPopups();
      })
  };

  const handleUpdateAvatar = function (avatarLink) {
    api
      .editAvatar(avatarLink)
      .then((user) => {
        setCurrentUser(user)
        closeAllPopups();
      })
  };

  const handleAddPlaceSubmit = function (placeName, placeLink) {
    api
      .addNewCard(placeName, placeLink)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
      <div className="page">
        <Header />
        <Main
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          handleCardClick={handleCardClick}
          cards={cards}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
        />
        <Footer />
        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} />
        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      </div>
    </div>
    </CurrentUserContext.Provider>
    
  );
}

export default App;
