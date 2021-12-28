import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ImagePopup from './ImagePopup';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { api } from '../utils/api';

function App() {
  //open popups
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  const [isAddPlacePopupOpen, setisAddPlacePopupOpen] = React.useState(false);
  function handleAddPlaceClick() {
    setisAddPlacePopupOpen(true);
  }
  const [isEditAvatarPopupOpen, setisEditAvatarPopupOpen] = React.useState(false);
  function handleEditAvatarClick() {
    setisEditAvatarPopupOpen(true);
  }
  //update user info
  function handleUpdateUser(userInfo) {
    api.setUserInfo(userInfo)
      .then((newUserInfo) => {
        setCurrentUser(newUserInfo);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
  }
   //update user avatar
  function handleUpdateAvatar(avatar) {
    api.setUserAvatar(avatar)
      .then((newAvatar) => {
        setCurrentUser(newAvatar);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
  }
  function handleAddPlaceSubmit(card) {
    api.postCard(card)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
  }
  //current card
  const [selectedCard, setSelectedCard] = React.useState({});
  const [isImagePopupOpen, setisImagePopupOpen] = React.useState(false);
  function handleCardClick(card) {
    setSelectedCard(card);
    setisImagePopupOpen(true);
  }
  // const [isConfirmPopupOpen, setIsConfirmPopupOpen] = React.useState(false);
  // function handleConfirmClick() {
  //   setIsConfirmPopupOpen(true);
  // }
  //close all popoups
  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setisAddPlacePopupOpen(false);
    setisEditAvatarPopupOpen(false);
    // setIsConfirmPopupOpen(false);
    setisImagePopupOpen(false);
    setTimeout(() => {
      setSelectedCard({});
  }, 700);
    
  }
  //set user info & cards
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);

  function handleCardLike(card) {
    //check out whether there's my like on the card already
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    //send a request to API and get new card data
    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardDelete(card) {
    //send a request to API and get new cards array
    api.deleteCard(card._id)
      .then((newCard) => {
        setCards((state) => state.filter((c) => c._id === card._id ? '' : newCard));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  React.useEffect(() => {
    Promise.all([api.getUserInfo(), api.getCards()])
      .then(resData => {
        const [userData, cardList] = resData;
        setCurrentUser(userData);
        setCards(cardList)
      })
      .catch((err) => {
        console.log(err);
      })
  }, [])


  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">

        <Header />
        <Main
          onEditAvatar={handleEditAvatarClick}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          cards={cards}
          onCardClick={handleCardClick}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
        />
        <Footer />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />

        {/* <PopupWithForm
          name="confirm"
          title="Вы уверены?"
          defaultValue="Да"
          isOpen={isConfirmPopupOpen}
          onCloce={closeAllPopups}
        /> */}

        <ImagePopup
          name="view"
          card={selectedCard}
          isOpen={isImagePopupOpen}
          onClose={closeAllPopups}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
