import './index.css'; // импорт главного файла стилей

import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithConfirmDelete from '../components/PopupWithConfirmDelete';
import Api from '../components/Api';

import {
  buttonEdit,
  inputName,
  inputProfession,
  popupProfileInfoSelector,
  profileNameSelector,
  profileProfessionSelector,
  elementsListSelector,
  elementTemplateSelector,
  cardSelector,
  buttonAdd,
  popupElementCardSelector,
  popupElementImageSelector,
  config,
  options,
  popupDeleteCardSelector,
  buttonEditAvatar,
  popupEditAvatarSelector
} from '../utils/constants.js';

// функция установки значений для popup в profile__info
function setValuesPopupProfileInfo() {
  const userData = userInfo.getUserInfo();

  inputName.value = userData.name;
  inputProfession.value = userData.profession;
}

// oбработчик отправки формы в profile__info
function submitHandlerFormProfileInfo({ name, profession }) {
  api.editProfileInfo({ name, profession }, popupProfileInfo.renderLoading)
    .then(data => {
      const { name, about } = data;

      return { name, about };
    })
    .then(data => {
      userInfo.setUserInfo(data);
      popupProfileInfo.close();
    })
    .catch(err => console.log(err))
}

// oбработчик отправки формы для добавления карточки в elements
function submitHandlerFormElementCard({ link, name }) {
  api.sendNewCard({ link, name }, popupElementCard.renderLoading)
    .then(data => {
      const { link, name, _id } = data;

      return { link, name, _id };
    })
    .then(data => {
      cardsList.then(section => {
        data.isOwner = true;
        section.prependItem(data);
        popupElementCard.close();
      });
    })
    .catch(err => console.log(err))
}

// обработчик формы удаления карточки
function submitHandlerFormDeleteCard() {
  api.deleteCard(popupDeletetCard.getCardId())
    .catch(err => console.log(err));
  api.getInitialCards()
    .then(data => {
      return data.filter(card => {
        if (card._id !== popupDeletetCard.getCardId()) {
          return card;
        }
      });
    })
    .then(data => {
      document.querySelector(elementsListSelector).innerHTML = '';
      crateSection(data);
    })
    .catch(err => console.log(err));
}

// функция создания экземпляра класса Section
function crateSection(data) {
  const сardsList = new Section({
    items: data,
    renderer: item => {
      // создание экземпляра класса карточки
      const handleCardClick = _ => {
        popupElementImage.open(item);
      }
      const handleButtonDelete = _ => {
        popupDeletetCard.open(item);
      }
      // обработчик постановки лайка
      const handlePutLike = function(item) {
        const cardId = item._id;
        api.putLike(cardId)
          .then(card => {
            this.putCountLikes(card.likes.length);
            this.handleToggleLike();
          })
          .catch(err => console.log(err));
      };
      // обработчик удаления лайка
      const handleDeleteLike = function(item) {
        const cardId = item._id;
        api.deleteLike(cardId)
          .then(card => {
            this.putCountLikes(card.likes.length);
            this.handleToggleLike();
          })
          .catch(err => console.log(err));
      };
      const elementCard = new Card(item, cardSelector, handleCardClick, elementTemplateSelector, handleButtonDelete, handlePutLike, handleDeleteLike);

      return elementCard.generateElementCard();
      }
    },
    elementsListSelector
  );
  сardsList.renderItems();
  return сardsList;
}

// обработчик формы редактирования аватара
function submitHandlerFormEditAvatar({ avatar }) {
  api.editAvatar(avatar, popupEditAvatar.renderLoading)
    .then(data => {
      const { avatar } = data;

      return avatar;
    })
    .then(avatar => {
      userInfo.editAvatar(avatar);
      popupEditAvatar.close();
    })
    .catch(err => console.log(err))
}

// создание экземпляра класса Api
const api = new Api(options);

// создание экземпляра класса PopupWithImage
const popupElementImage = new PopupWithImage(popupElementImageSelector);
popupElementImage.setEventListeners();

// созданиe экземпляра класса UserInfo
const userInfo = new UserInfo({ profileNameSelector, profileProfessionSelector });

// загрузка информации о пользователе с сервера
api.getUserInfo()
  .then(data => {
    const { name, about, avatar, _id } = data;

    userInfo.renderUserInfo({ name, about, avatar, _id });
  })
  .catch(err => console.log(err));

// открытие popup в profile__info
buttonEdit.addEventListener('click', () => {
  setValuesPopupProfileInfo();
  editFormValidator.resetValidation();
  popupProfileInfo.open();
});

// создание экземпляра класса FormValidator для формы в profile__info
const editFormValidator = new FormValidator(config, '#form-edit-profile');
editFormValidator.enableValidation();

// создание экземпляра класса FormValidator для формы для добавления карточки в elements
const cardFormValidator = new FormValidator(config, '#form-add-card');
cardFormValidator.enableValidation();

// создание экземпляра класса PopupWithForm для profile__info
const popupProfileInfo = new PopupWithForm(popupProfileInfoSelector, submitHandlerFormProfileInfo);
popupProfileInfo.setEventListeners();

// создание экземпляра класса PopupWithForm для elements
const popupElementCard = new PopupWithForm(popupElementCardSelector, submitHandlerFormElementCard);
popupElementCard.setEventListeners();

// открытие popup для добавления карточки в elements
buttonAdd.addEventListener('click', () => {
  cardFormValidator.resetValidation();
  popupElementCard.open();
});

// создание экземпляра класса PopupWithForm для удаления карточки
const popupDeletetCard = new PopupWithConfirmDelete(popupDeleteCardSelector, submitHandlerFormDeleteCard);
popupDeletetCard.setEventListeners();

// загрузка карточек с сервера
const cardsList = api.getInitialCards()
  .then(data => {
    // создание экземпляра класса Section
    const cardsList = crateSection(data);

    return cardsList;
  })
  .catch(err => console.log(err));

// создание экземпляра класса FormValidator для формы редактирования аватара
const editAvatarFormValidator = new FormValidator(config, '#form-edit-avatar');
editAvatarFormValidator.enableValidation();

// создание экземпляра класса PopupWithForm для редактирования аватара
const popupEditAvatar = new PopupWithForm(popupEditAvatarSelector, submitHandlerFormEditAvatar);
popupEditAvatar.setEventListeners();

// открытие popup для редактирования аватара
buttonEditAvatar.addEventListener('click', () => {
  editAvatarFormValidator.resetValidation();
  popupEditAvatar.open();
});
