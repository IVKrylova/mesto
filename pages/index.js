import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
/* import PopupWithImage from '../components/PopupWithImage.js'; */
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';

// переменные, необходимые для реализации открытия popup в profile__info
/* const popupProfileInfo = document.querySelector('#popup-profile-info'); */
/* const formPopupProfileInfo = document.querySelector('#form-edit-profile'); */
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
/* const formAddCard = document.querySelector('#form-add-card'); */
const buttonAdd = document.querySelector('.button-add');
/* const popupElementCard = document.querySelector('#popup-element-card'); */
const inputPlace = document.querySelector('#place');
const inputPlaceUrl = document.querySelector('#place-url');

const popupElementCardSelector = '#popup-element-card';
const formAddCardSelector = '#form-add-card';
const popupElementImageSelector = '#element-popup';

/* // переменные, необходимые для реализации закрытия popup при клике на overlay и крeстик
const popupsList = document.querySelectorAll('.popup'); */

// объект с настройками валидации форм
const config = {
  inputSelector: '.form__item',
  submitButtonSelector: '.form__button',
  inactiveButtonClass: 'form__button_disabled',
  inputErrorClass: 'form__item_type_error',
  errorClass: 'form__input-error_active'
};

/* // функция открытия popup
function openPopup(elementPopup) {
  elementPopup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupByEsc);
} */

/* // функция закрытия popup
function closePopup(elementPopup) {
  elementPopup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupByEsc);
} */

// функция установки значений для popup в profile__info
function setValuesPopupProfileInfo() {
  inputName.value = profileName.textContent;
  inputProfession.value = profileProfession.textContent;
}

// oбработчик отправки формы в profile__info
function submitHandlerFormProfileInfo(/* evt */) {
  /* evt.preventDefault(); */
  profileName.textContent = inputName.value;
  profileProfession.textContent = inputProfession.value;
  /* closePopup(popupProfileInfo); */
}

// функция создания карточки
function createCard(dataCard, selectorCard) {
  // создание экземпляра класса PopupWithImage
  const popupElementImage = new PopupWithImage(popupElementImageSelector, dataCard);
  const handleCardClick = popupElementImage.open.bind(popupElementImage);

  // создание экземпляра класса карточки
  const elementCard = new Card(dataCard, selectorCard, handleCardClick);
  return elementCard.generateElementCard();
}

// oбработчик отправки формы для добавления карточки в elements
function submitHandlerFormElementCard(/* evt */) {
  /* evt.preventDefault(); */

  const cardFromForm = new Section({
    items: [{ link: inputPlaceUrl.value, name: inputPlace.value }],
    renderer: item => elementsList.prepend(createCard(item, '.element'))
    },
    elementsListSelector
  );

  cardFromForm.renderItems();
  /* formAddCard.reset();
  closePopup(popupElementCard); */
}

/* // функция закрытия popup при нажатии на Esc
function closePopupByEsc(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');

    closePopup(openedPopup);
  }
} */

// создание экземпляра класса FormValidator для формы в profile__info
const editFormValidator = new FormValidator(config, '#form-edit-profile');
editFormValidator.enableValidation();

// создание экземпляра класса FormValidator для формы для добавления карточки в elements
const cardFormValidator = new FormValidator(config, '#form-add-card');
cardFormValidator.enableValidation();

// создание экземпляра класса PopupWithForm для profile__info
const popupProfileInfo = new PopupWithForm(popupProfileInfoSelector, submitHandlerFormProfileInfo, formPopupProfileInfoSelector);

// открытие popup в profile__info
buttonEdit.addEventListener('click', () => {
  editFormValidator.resetValidation();
  setValuesPopupProfileInfo();
  editFormValidator.removeInactiveStateOfButton();
  popupProfileInfo.open();
});

// создание экземпляра класса PopupWithForm для elements
const popupElementCard = new PopupWithForm(popupElementCardSelector, submitHandlerFormElementCard, formAddCardSelector);

/* // прикрепляем обработчик к форме в profile__info
formPopupProfileInfo.addEventListener('submit', submitHandlerFormProfileInfo);
 */

// открытие popup для добавления карточки в elements
buttonAdd.addEventListener('click', () => {
  cardFormValidator.resetValidation();
  popupElementCard.open();
});

/* // прикрепляем обработчик к форме в popup для добавления карточки в elements
// имя карточки для теста Холмогорский район
// ссылка карточки для теста https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg
formAddCard.addEventListener('submit', submitHandlerFormElementCard); */

// закрытие popup при клике на overlay и крeстик
/* popupsList.forEach(popup => {
  popup.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup_opened')) {
      closePopup(popup)
    }
    if (evt.target.classList.contains('button-close')) {
      closePopup(popup)
    }
  });
}); */

// обработчик открытия popup для image
/* function handleCardClick(popupElementImage) {
  popupElementImage.querySelector('.popup__image').src = link;
  popupElementImage.querySelector('.popup__image').alt = name;
  popupElementImage.querySelector('.popup__description').textContent = name;
} */

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
