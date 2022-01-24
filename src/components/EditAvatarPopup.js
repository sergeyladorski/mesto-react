import { React, useEffect, useRef } from 'react';
import PopupWithForm from './PopupWithForm';

export default function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
    const avatarRef = useRef();
    //reset inputs on close
    useEffect(() => {
        avatarRef.current.value = '';
    }, [isOpen]);

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateAvatar(avatarRef.current.value);
    }

    return (
        <PopupWithForm
            name='avatar'
            title='Обновить аватар'
            defaultValue='Сохранить'
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
        >
            <label className='form__input-label' htmlFor='avatar'>
                <input
                    ref={avatarRef}
                    type='url'
                    id='avatar'
                    name='avatar'
                    placeholder='Ссылка на новый аватар'
                    className='form__input'
                    required
                />
                <span className='form__input-error' id='avatar-error'>
                </span>
            </label>
        </PopupWithForm>
    );
}