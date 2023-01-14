import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import { useState } from "react";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);

  const [selectedCard, setSelectedCard] = useState();

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
    setSelectedCard();
  };
  const handleCardClick = function (card) {
    setSelectedCard(card);
  };

  return (
    <div className="App">
      <div className="page">
        <Header />
        <Main
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          handleCardClick={handleCardClick}
        />
        <PopupWithForm
          title="Редактировать профиль"
          name="profile-popup"
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
        >
          <input
            required
            id="name"
            placeholder="Имя"
            name="profile-popup__input_name"
            type="text"
            className="profile-popup__input profile-popup__input_type_name form__input"
            minLength={2}
            maxLength={40}
          />
          <span className="profile-popup__input-error" id="name-error" />
          <input
            required
            id="about"
            placeholder="Профессия"
            name="profile-popup__input_job"
            type="text"
            className="profile-popup__input profile-popup__input_type_job form__input"
            minLength={2}
            maxLength={200}
          />
          <span className="profile-popup__input-error" id="about-error" />
        </PopupWithForm>
        <PopupWithForm
          title="Новое место"
          name="add-mesto-popup"
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
        >
          <input
            required
            id="mesto"
            placeholder="Название"
            name="add-mesto-popup__input_mesto"
            type="text"
            className="add-mesto-popup__input add-mesto-popup__input_type_mesto form__input"
            minLength={2}
            maxLength={30}
          />
          <span className="add-mesto-popup__input-error" id="mesto-error" />
          <input
            required
            id="link"
            placeholder="Ссылка на картинку"
            name="add-mesto-popup__input_image"
            type="url"
            className="add-mesto-popup__input add-mesto-popup__input_type_image form__input"
          />
          <span className="add-mesto-popup__input-error" id="link-error" />
        </PopupWithForm>
        <PopupWithForm
          title="Обновить аватар"
          name="update-avatar-popup"
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
        >
          <input
            required
            id="avatar"
            placeholder="Ссылка на аватар"
            name="update-avatar-popup__input"
            type="url"
            className="update-avatar-popup__input form__input"
          />
          <span
            className="update-avatar-popup__input-error"
            id="avatar-error"
          />
        </PopupWithForm>
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        <Footer />
      </div>
    </div>
  );
}

export default App;
