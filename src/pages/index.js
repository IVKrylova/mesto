import './index.css'; // импорт главного файла стилей

import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';

import {
  buttonEdit,
  inputName,
  inputProfession,
  popupProfileInfoSelector,
  profileNameSelector,
  profileProfessionSelector,
  initialCards,
  elementsListSelector,
  elementTemplateSelector,
  cardSelector,
  buttonAdd,
  popupElementCardSelector,
  popupElementImageSelector,
  config
} from '../utils/constants.js';

// функция установки значений для popup в profile__info
function setValuesPopupProfileInfo() {
  const userData = userInfo.getUserInfo();

  inputName.value = userData.name;
  inputProfession.value = userData.profession;
}

// oбработчик отправки формы в profile__info
function submitHandlerFormProfileInfo({ name, profession }) {
  userInfo.setUserInfo({ name, profession });
}

// oбработчик отправки формы для добавления карточки в elements
function submitHandlerFormElementCard({ link, name }) {
  cardsList.prependItem({ link, name });
}

// создание экземпляра класса PopupWithImage
const popupElementImage = new PopupWithImage(popupElementImageSelector);
popupElementImage.setEventListeners();

// созданиe экземпляра класса UserInfo
const userInfo = new UserInfo({ profileNameSelector, profileProfessionSelector });

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

// создание экземпляра класса Section
const cardsList = new Section({
  items: initialCards,
  renderer: item => {
    // создание экземпляра класса карточки
    const handleCardClick = popupElementImage.open.bind(popupElementImage, item);
    const elementCard = new Card(item, cardSelector, handleCardClick, elementTemplateSelector);

    return elementCard.generateElementCard();
    }
  },
  elementsListSelector
);
cardsList.renderItems();
