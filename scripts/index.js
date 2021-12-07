import Card from './Card.js';
import FormValidator from './FormValidator.js';

// переменные, необходимые для реализации открытия popup в profile__info
const popupProfileInfo = document.querySelector('#popup-profile-info');
const formPopupProfileInfo = document.querySelector('#form-edit-profile');
const buttonEdit = document.querySelector('.button-edit');
const profileName = document.querySelector('.profile__name');
const inputName = document.querySelector('#name');
const profileProfession = document.querySelector('.profile__profession');
const inputProfession = document.querySelector('#profession');
const buttonFormSubmitPopupProfileInfo = popupProfileInfo.querySelector('.form__button');

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
const elementsList = document.querySelector('.elements__list');

// переменные, необходимые для реализации добавления карточек в elements через форму
const formAddCard = document.querySelector('#form-add-card');
const buttonAdd = document.querySelector('.button-add');
const popupElementCard = document.querySelector('#popup-element-card');
const inputPlace = document.querySelector('#place');
const inputPlaceUrl = document.querySelector('#place-url');

// переменные, необходимые для реализации закрытия popup при клике на overlay и крeстик
const popupsList = document.querySelectorAll('.popup');

// функция открытия popup
function openPopup(elementPopup) {
  elementPopup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupByEsc);
}

// функция закрытия popup
function closePopup(elementPopup) {
  elementPopup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupByEsc);
}

// функция установки значений для popup в profile__info
function setValuesPopupProfileInfo() {
  inputName.value = profileName.textContent;
  inputProfession.value = profileProfession.textContent;
}

// oбработчик отправки формы в profile__info
function submitHandlerFormProfileInfo(evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileProfession.textContent = inputProfession.value;
  closePopup(popupProfileInfo);
}

// функция добавления карточек в elements из массива
function addElementsFromArrey(initialCards) {
  initialCards.forEach((card) => {
    const elementCard = new Card(card, '.element');
    elementsList.append(elementCard.generateElementCard());
  });
}

// oбработчик отправки формы для добавления карточки в elements
function submitHandlerFormElementCard(evt) {
  evt.preventDefault();
  const newElementCard = new Card({link: inputPlaceUrl.value, name: inputPlace.value}, '.element');
  elementsList.prepend(newElementCard.generateElementCard());
  formAddCard.reset();
  closePopup(popupElementCard);
}

// функция сброса полей формы при закрытии
function resetInputForm(formElement) {
  if(formElement) {
    const errorElementsList = formElement.querySelectorAll('.form__input-error');
    const inputElementsList = formElement.querySelectorAll('.form__item');

    formElement.reset();
    errorElementsList.forEach((errorElement) => {
      errorElement.textContent = '';
    });
    inputElementsList.forEach((inputElement) => {
      inputElement.classList.remove('form__item_type_error');
    });
  }
}

// функция закрытия popup при нажатии на Esc
function closePopupByEsc(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');

    closePopup(openedPopup);
  }
}

// добавление карточек из массива в elements
addElementsFromArrey(initialCards);

// открытие popup в profile__info
buttonEdit.addEventListener('click', () => {
  resetInputForm(formPopupProfileInfo);
  setValuesPopupProfileInfo();
  if(buttonFormSubmitPopupProfileInfo.hasAttribute('disabled')) {
    buttonFormSubmitPopupProfileInfo.removeAttribute('disabled');
    buttonFormSubmitPopupProfileInfo.classList.remove('form__button_disabled');
  }
  openPopup(popupProfileInfo);
});

// прикрепляем обработчик к форме в profile__info
formPopupProfileInfo.addEventListener('submit', submitHandlerFormProfileInfo);

// открытие popup для добавления карточки в elements
buttonAdd.addEventListener('click', () => {
  resetInputForm(formAddCard);
  openPopup(popupElementCard);
});

// прикрепляем обработчик к форме в popup для добавления карточки в elements
// имя карточки для теста Холмогорский район
// ссылка карточки для теста https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg
formAddCard.addEventListener('submit', submitHandlerFormElementCard);

// закрытие popup при клике на overlay и крeстик
popupsList.forEach((popup) => {
  popup.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup_opened')) {
      closePopup(popup)
    }
    if (evt.target.classList.contains('button-close')) {
      closePopup(popup)
    }
  });
});
