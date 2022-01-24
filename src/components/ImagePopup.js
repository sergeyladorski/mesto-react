import { React, useEffect } from 'react';

function ImagePopup({ card, name, isOpen, onClose }) {

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

    return (
        <div
            className={`popup ${isOpen && 'popup_opened'}`}
            id={`popup-${name}`}
            onClick={handleOverlayClose}
        >
            <figure className="popup__view-container">
                <button
                    type="button"
                    aria-label="закрыть"
                    className="popup__close"
                    onClick={onClose}
                ></button>
                <img
                    src={`${card.link}`}
                    alt={`${card.name}`}
                    className="popup__view"
                />
                <figcaption
                    className="popup__view-title">
                    {`${card.name}`}
                </figcaption>
            </figure>
        </div>
    );
}

export default ImagePopup;