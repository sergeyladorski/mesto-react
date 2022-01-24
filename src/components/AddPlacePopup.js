import { React, useState, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';

export default function AddPlacePopup({ isOpen, onClose, onAddPlace }) {

    const [name, setName] = useState('');
    const [link, setLink] = useState('');

    function handleNameChange(e) {
        setName(e.target.value);
    }
    function handleLinkChange(e) {
        setLink(e.target.value);
    }
    //reset inputs on close
    useEffect(() => {
        setName('');
        setLink('');
    }, [isOpen]);

    function handleSubmit(e) {
        e.preventDefault();
        onAddPlace({ name, link });
    };


    return (
        <PopupWithForm
            name='card'
            title='Новое место'
            defaultValue='Создать'
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
        >
            <label className='form__input-label' htmlFor='place'>
                <input
                    type='text'
                    id='place'
                    name='place'
                    placeholder='Название'
                    className='form__input'
                    required
                    minLength='2'
                    maxLength='30'
                    onChange={handleNameChange}
                    value={name}
                />
                <span className='form__input-error' id='place-error'></span>
            </label>

            <label className='form__input-label' htmlFor='source'>
                <input
                    type='url'
                    id='source'
                    name='source'
                    placeholder='Ссылка на картинку'
                    className='form__input'
                    required
                    onChange={handleLinkChange}
                    value={link}
                />
                <span className='form__input-error' id='source-error'></span>
            </label>
        </PopupWithForm>
    );
}