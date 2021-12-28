import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
    const currentUser = React.useContext(CurrentUserContext);
    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');

    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser]);

    function handleChangeName(e) {
        setName(e.target.value);
    }
    function handleChangeDescription(e) {
        setDescription(e.target.value);
    }
    function handleSubmit(e) {
        e.preventDefault();
        // Передаём значения управляемых компонентов во внешний обработчик
        onUpdateUser({
            name,
            about: description,
        });
    }

    return (
        <PopupWithForm
            name="info"
            title="Редактировать профиль"
            defaultValue="Сохранить"
            isOpen={isOpen}
            onCloce={onClose}
            onSubmit={handleSubmit}
        >
            <label className="form__input-label" htmlFor="name">
                <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Имя"
                    defaultValue={name}
                    onChange={handleChangeName}
                    className="form__input"
                    required
                    minLength="2"
                    maxLength="40" />
                <span className="form__input-error" id="name-error"></span>
            </label>

            <label className="form__input-label" htmlFor="about">
                <input
                    type="text"
                    id="about"
                    name="about"
                    placeholder="О себе"
                    defaultValue={description}
                    onChange={handleChangeDescription}
                    className="form__input"
                    required
                    minLength="2"
                    maxLength="200" />
                <span className="form__input-error" id="about-error"></span>
            </label>
        </PopupWithForm>
    );
}

export default EditProfilePopup;