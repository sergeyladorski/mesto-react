function PopupWithForm({
    name, title, defaultValue, children, 
    isOpen, onCloce, closeAllPopups, onChange, onSubmit}) {
    return (
        <div className={`popup ${isOpen ? 'popup_opened' : ''}`}
            id={`popup-${name}`}>
            <div className="popup__container">
                <button
                    type="button"
                    aria-label="закрыть"
                    className="popup__close"
                    onClick={onCloce}
                ></button>
                <form
                    name={`form-${name}`}
                    className="form"
                    id={`form-${name}`}
                    noValidate
                    autoComplete="off"
                    onChange={onChange}
                    onSubmit={onSubmit}
                >
                    <h2 className="form__heading">{title}</h2>

                    <fieldset className="form__fieldset">
                        {children}
                    </fieldset>

                    <fieldset className="form__submit">
                        <input
                            type="submit"
                            value={`${defaultValue}`}
                            data-value={`${defaultValue}`}
                            className="form__save"
                            onClick={closeAllPopups}
                        />
                    </fieldset>
                </form>
            </div>
        </div>
    );
}

export default PopupWithForm;