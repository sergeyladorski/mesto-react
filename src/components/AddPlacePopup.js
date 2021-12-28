import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {

    const [name, setName] = React.useState("");
    const [link, setLink] = React.useState("");

    function handleNameChange(e) {
        setName(e.target.value);
    }
    function handleLinkChange(e) {
        setLink(e.target.value);
    }
    function handleSubmit(e) {
        e.preventDefault();
        onAddPlace({ name, link })
    };

    return (
        <PopupWithForm
            name="card"
            title="Новое место"
            defaultValue="Создать"
            isOpen={isOpen}
            onCloce={onClose}
            onSubmit={handleSubmit}
        >
            <label className="form__input-label" htmlFor="place">
                <input
                    type="text"
                    id="place"
                    name="place"
                    placeholder="Название"
                    className="form__input"
                    required
                    minLength="2"
                    maxLength="30"
                    onChange={handleNameChange}
                    value={name}
                />
                <span className="form__input-error" id="place-error"></span>
            </label>

            <label className="form__input-label" htmlFor="source">
                <input
                    type="url"
                    id="source"
                    name="source"
                    placeholder="Ссылка на картинку"
                    className="form__input"
                    required
                    onChange={handleLinkChange}
                    value={link}
                />
                <span className="form__input-error" id="source-error"></span>
            </label>
        </PopupWithForm>
    );
}

export default AddPlacePopup;