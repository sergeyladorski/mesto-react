import { React, useEffect } from 'react';

export default function ConfirmPopup({
    name, title, defaultValue, isOpen, onClose, closeAllPopups, onConfirm, card }) {

    useEffect(() => {
        if (!isOpen) return;
        const handleEscapeClose = (evt) => {
            if (evt.key === "Escape") {
                onClose();
            }
        };
        document.addEventListener("keydown", handleEscapeClose);
        return () => {
            document.removeEventListener("keydown", handleEscapeClose);
        };
    }, [isOpen, onClose]);

    const handleOverlayClose = (evt) => {
        if (evt.target === evt.currentTarget && isOpen) {
            onClose();
        }
    };

    function handleSubmit(e) {
        e.preventDefault();
        onConfirm(card);
    };

    return (
        <div className={`popup ${isOpen && 'popup_opened'}`}
            id={`popup-${name}`}
            onClick={handleOverlayClose}>
            <div className='popup__container'>
                <button
                    type='button'
                    aria-label='закрыть'
                    className='popup__close'
                    onClick={onClose}
                ></button>
                <form
                    name={`form-${name}`}
                    className='form'
                    id={`form-${name}`}
                    onSubmit={handleSubmit}
                >
                    <h2 className='form__heading'>{title}</h2>
                    <input
                        type='submit'
                        value={defaultValue}
                        data-value={defaultValue}
                        className='form__save'
                        onClick={closeAllPopups}
                    />
                </form>
            </div>
        </div>
    );
}