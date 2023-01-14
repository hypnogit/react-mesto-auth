function Card(props) {
  function handleClick() {
    props.onCardClick(props.card);
  }
  return (
    <div className="element">
      <img
        onClick={handleClick}
        src={props.card.link}
        alt={props.card.name}
        className="element__image"
      />
      <button
        aria-label="Кнопка удаления карточки"
        type="button"
        className="element__remove"
      />
      <div className="element__details">
        <h2 className="element__name">{props.card.name}</h2>
        <div className="element__like-section">
          <button
            aria-label="Кнопка лайка карточки"
            type="button"
            className="element__like"
          />
          <div className="element__like-count">{props.card.likes.length}</div>
        </div>
      </div>
    </div>
  );
}

export default Card;
