function ImagePopup({ card, name, isOpen, onClose }) {
    return (
        <div
            className={`popup ${isOpen && 'popup_opened'}`}
            id={`popup-${name}`}
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