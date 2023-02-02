import { createRef, useEffect } from "react";

import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
    const placeName = createRef()
    const placeLink = createRef()

    function handleSubmit(evt) {
        evt.preventDefault();

        props.onAddPlace(placeName.current.value, placeLink.current.value)
    }

    useEffect(() => {
        placeName.current.value=''
    }, [props.isOpen, placeName]);

    useEffect(() => {
        placeLink.current.value=''
    }, [props.isOpen, placeLink]);

    return (
        <PopupWithForm
        title="Новое место"
        name="add-mesto-popup"
        isOpen={props.isOpen}
        onClose={props.onClose}
        onSubmit={handleSubmit}
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
          ref={placeName}
        />
        <span className="add-mesto-popup__input-error" id="mesto-error" />
        <input
          required
          id="link"
          placeholder="Ссылка на картинку"
          name="add-mesto-popup__input_image"
          type="url"
          className="add-mesto-popup__input add-mesto-popup__input_type_image form__input"
          ref={placeLink}
        />
        <span className="add-mesto-popup__input-error" id="link-error" />
      </PopupWithForm>
    );
  }
  
  export default AddPlacePopup;
  