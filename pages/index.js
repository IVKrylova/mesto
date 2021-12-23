import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';

// переменные, необходимые для реализации открытия popup в profile__info
const buttonEdit = document.querySelector('.button-edit');
const profileName = document.querySelector('.profile__name');
const inputName = document.querySelector('#name');
const profileProfession = document.querySelector('.profile__profession');
const inputProfession = document.querySelector('#profession');
const popupProfileInfoSelector = '#popup-profile-info';
const formPopupProfileInfoSelector = '#form-edit-profile';

// переменные, необходимые для реализации добавления карточек в elements из массива
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];
const elementsListSelector = '.elements__list';
const elementsList = document.querySelector('.elements__list');

// переменные, необходимые для реализации добавления карточек в elements через форму
const buttonAdd = document.querySelector('.button-add');
const inputPlace = document.querySelector('#place');
const inputPlaceUrl = document.querySelector('#place-url');
const popupElementCardSelector = '#popup-element-card';
const formAddCardSelector = '#form-add-card';
const popupElementImageSelector = '#element-popup';

// объект с настройками валидации форм
const config = {
  inputSelector: '.form__item',
  submitButtonSelector: '.form__button',
  inactiveButtonClass: 'form__button_disabled',
  inputErrorClass: 'form__item_type_error',
  errorClass: 'form__input-error_active'
};

// функция установки значений для popup в profile__info
function setValuesPopupProfileInfo() {
  inputName.value = profileName.textContent;
  inputProfession.value = profileProfession.textContent;
}

// oбработчик отправки формы в profile__info
function submitHandlerFormProfileInfo() {
  profileName.textContent = inputName.value;
  profileProfession.textContent = inputProfession.value;
}

// функция создания карточки
function createCard(dataCard, selectorCard) {
  // создание экземпляра класса PopupWithImage
  const popupElementImage = new PopupWithImage(popupElementImageSelector, dataCard);
  popupElementImage.setEventListeners();

  // создание экземпляра класса карточки
  const handleCardClick = popupElementImage.open.bind(popupElementImage);
  const elementCard = new Card(dataCard, selectorCard, handleCardClick);

  return elementCard.generateElementCard();
}

// oбработчик отправки формы для добавления карточки в elements
function submitHandlerFormElementCard() {
  const cardFromForm = new Section({
    items: [{ link: inputPlaceUrl.value, name: inputPlace.value }],
    renderer: item => elementsList.prepend(createCard(item, '.element'))
    },
    elementsListSelector
  );

  cardFromForm.renderItems();
}

// создание экземпляра класса FormValidator для формы в profile__info
const editFormValidator = new FormValidator(config, '#form-edit-profile');
editFormValidator.enableValidation();

// создание экземпляра класса FormValidator для формы для добавления карточки в elements
const cardFormValidator = new FormValidator(config, '#form-add-card');
cardFormValidator.enableValidation();

// создание экземпляра класса PopupWithForm для profile__info
const popupProfileInfo = new PopupWithForm(popupProfileInfoSelector, submitHandlerFormProfileInfo, formPopupProfileInfoSelector);
popupProfileInfo.setEventListeners();

// открытие popup в profile__info
buttonEdit.addEventListener('click', () => {
  editFormValidator.resetValidation();
  setValuesPopupProfileInfo();
  editFormValidator.removeInactiveStateOfButton();
  popupProfileInfo.open();
});

// создание экземпляра класса PopupWithForm для elements
const popupElementCard = new PopupWithForm(popupElementCardSelector, submitHandlerFormElementCard, formAddCardSelector);
popupElementCard.setEventListeners();

// открытие popup для добавления карточки в elements
buttonAdd.addEventListener('click', () => {
  cardFormValidator.resetValidation();
  popupElementCard.open();
});

// добавление карточек из массива в elements
const cardsList = new Section({
  items: initialCards,
  renderer: item => {
    const elementCard = createCard(item, '.element');

    cardsList.addItem(elementCard);
    }
  },
  elementsListSelector
);
cardsList.renderItems();
