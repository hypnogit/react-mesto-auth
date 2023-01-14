import Card from "./Card";
import { api } from "../utils/Api.js";
import { useEffect } from "react";
import { useState } from "react";

function Main({ onEditProfile, onAddPlace, onEditAvatar, handleCardClick }) {
  const [userName, setUserName] = useState();
  const [userDescription, setUserDescription] = useState();
  const [userAvatar, setUserAvatar] = useState();
  const [cards, setCards] = useState([]);

  useEffect(() => {
    api
      .getUserInfo()
      .then((userInfo) => {
        setUserName(userInfo.name);
        setUserDescription(userInfo.about);
        setUserAvatar(userInfo.avatar);
      })
      .catch();
  }, []);

  useEffect(() => {
    api
      .getInitialCards()
      .then((initialCards) => {
        setCards(initialCards);
      })
      .catch();
  }, []);

  return (
    <div className="Main">
      <main className="content">
        <section className="profile">
          <div className="profile__avatar-section" onClick={onEditAvatar}>
            <div className="profile__avatar-overlay" />
            <button
              aria-label="Кнопка редактирования аватара"
              type="button"
              className="profile__edit-avatar-button"
              style={{ backgroundImage: `url(${userAvatar})` }}
            />
          </div>
          <div className="profile__info">
            <h1 className="profile__name">{userName}</h1>
            <button
              aria-label="Кнопка редактирования информации профиля"
              type="button"
              className="profile__edit-info"
              onClick={onEditProfile}
            />
            <p className="profile__job">{userDescription}</p>
          </div>
          <button
            aria-label="Кнопка добавления новой карточки"
            type="button"
            className="profile__add-element"
            onClick={onAddPlace}
          />
        </section>
        <section className="elements">
          {cards.map((card) => (
            <Card key={card._id} card={card} onCardClick={handleCardClick} />
          ))}
        </section>
      </main>
    </div>
  );
}

export default Main;
