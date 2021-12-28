import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
    const avatarRef = React.useRef();

    function handleClosePopup() {
        onClose();
        setTimeout(() => {
            (avatarRef.current.value = "");
        }, 200);
    }
    function handleSubmit(e) {
        e.preventDefault();
        onUpdateAvatar(avatarRef.current.value);
        handleClosePopup();
    }

    return (
        <PopupWithForm
            name="avatar"
            title="Обновить аватар"
            defaultValue="Сохранить"
            isOpen={isOpen}
            onCloce={handleClosePopup}
            onSubmit={handleSubmit}
        >
            <label className="form__input-label" htmlFor="avatar">
                <input
                    ref={avatarRef}
                    type="url"
                    id="avatar"
                    name="avatar"
                    placeholder="Ссылка на новый аватар"
                    className="form__input"
                    required
                />
                <span className="form__input-error" id="avatar-error">
                </span>
            </label>
        </PopupWithForm>
    );
}

export default EditAvatarPopup;