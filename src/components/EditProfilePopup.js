import {React, useEffect, useContext, useRef} from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

export default function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
    const currentUser = useContext(CurrentUserContext);

    const nameRef = useRef();
    const descriptionRef = useRef();
    useEffect(() => {
        nameRef.current.value = currentUser.name;
        descriptionRef.current.value = currentUser.about;
    }, [isOpen, currentUser]);

    function handleSubmit(e) {
        e.preventDefault();
        // Передаём значения управляемых компонентов во внешний обработчик
        onUpdateUser({
            name: nameRef.current.value,
            about: descriptionRef.current.value,
        });
    }

    return (
        <PopupWithForm
            name='info'
            title='Редактировать профиль'
            defaultValue='Сохранить'
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
        >
            <label className='form__input-label' htmlFor='name'>
                <input
                    type='text'
                    id='name'
                    name='name'
                    placeholder='Имя'
                    ref={nameRef}
                    className='form__input'
                    required
                    minLength='2'
                    maxLength='40' />
                <span className='form__input-error' id='name-error'></span>
            </label>

            <label className='form__input-label' htmlFor='about'>
                <input
                    type='text'
                    id='about'
                    name='about'
                    placeholder='О себе'
                    ref={descriptionRef}
                    className='form__input'
                    required
                    minLength='2'
                    maxLength='200' />
                <span className='form__input-error' id='about-error'></span>
            </label>
        </PopupWithForm>
    );
}