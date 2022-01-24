import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import Card from './Card';

export default function Main({
    onEditAvatar, onEditProfile, onAddPlace,
    cards, onCardClick, onCardLike, onCardDeleteClick
}) {
    const currentUser = React.useContext(CurrentUserContext);

    return (
        <main className="content">
            <section className="profile">
                <img
                    src={currentUser.avatar}
                    alt="фото профиля"
                    className="profile__avatar"
                />
                <button
                    type="button"
                    className="profile__change-avatar"
                    onClick={onEditAvatar}
                ></button>
                <div className="profile__info">
                    <h1
                        className="profile__name">
                        {currentUser.name}
                    </h1>
                    <p
                        className="profile__desc">
                        {currentUser.about}
                    </p>
                </div>
                <button
                    type="button"
                    aria-label="редактировать информацию профиля"
                    className="profile__edit-info"
                    onClick={onEditProfile}
                ></button>

                <button
                    type="button"
                    aria-label="добавить фото"
                    className="profile__add-card"
                    onClick={onAddPlace}
                ></button>
            </section>

            <section className='gallery'>
                <ul aria-label='фото-галерея' className='gallery__list'>
                    {cards.map((card) => {
                        return (
                            <Card
                                onCardClick={onCardClick}
                                onCardLike={onCardLike}
                                onCardDeleteClick={onCardDeleteClick}
                                key={card._id}
                                card={card}
                            />
                        )
                    })}
                </ul>
            </section>
        </main>
    );
}