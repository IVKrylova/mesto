// переменные, необходимые для реализации открытия popup в profile__info
export const buttonEdit = document.querySelector('.button-edit');
export const inputName = document.querySelector('#name');
export const inputProfession = document.querySelector('#profession');
export const popupProfileInfoSelector = '#popup-profile-info';
export const profileNameSelector = '.profile__name';
export const profileProfessionSelector = '.profile__profession';

// переменные, необходимые для реализации добавления карточек в elements из массива
export const initialCards = [
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
export const elementsListSelector = '.elements__list';
export const elementTemplateSelector = '#element-template';
export const cardSelector = '.element';

// переменные, необходимые для реализации добавления карточек в elements через форму
export const buttonAdd = document.querySelector('.button-add');
export const popupElementCardSelector = '#popup-element-card';
export const popupElementImageSelector = '#element-popup';

// объект с настройками валидации форм
export const config = {
  inputSelector: '.form__item',
  submitButtonSelector: '.form__button',
  inactiveButtonClass: 'form__button_disabled',
  inputErrorClass: 'form__item_type_error',
  errorClass: 'form__input-error_active'
};

// универсальный селектор формы
export const formSelector = '.form';

// объект с настройками для API
export const options = {
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-34',
  headers: {
    authorization: 'e8b623b1-ae65-4d07-9972-4d21425b16b6',
    'Content-Type': 'application/json'
  }
}

// переменные, необходимые для установки данных о пользователе с сервера
export const profileAvatar = document.querySelector('.profile__avatar-image');
