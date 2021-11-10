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
const popupProfileInfo = document.querySelector('#popup-profile-info');
const buttonEdit = document.querySelector('.button-edit');
const buttonClosePopupProfileInfo = document.querySelector('#button-close-popup-profile-info');
const profileName = document.querySelector('.profile__name');
const inputName = document.querySelector('#name');
const profileProfession = document.querySelector('.profile__profession');
const inputProfession = document.querySelector('#profession');
const formElement = document.querySelector('.form');
const buttonAdd = document.querySelector('.button-add');
const popupElementCard = document.querySelector('#popup-element-card');
const buttonClosePopupElementCard = document.querySelector('#button-close-popup-element-card');
const elementsList = document.querySelector('.elements__list');
const inputPlace = document.querySelector('#place');
const inputPlaceUrl = document.querySelector('#place-url');

// функция добавления карточек в elements
function addElements(imageSrc, titleValue) {
  const elementTemplate = document.querySelector('#element-template').content;
  const elementCard = elementTemplate.querySelector('.element').cloneNode(true);

  elementCard.querySelector('.element__image').src = imageSrc;
  elementCard.querySelector('.element__image').alt = titleValue;
  elementCard.querySelector('.element__title').textContent = titleValue;

  elementsList.prepend(elementCard);
}

// функция открытия popup в profile__info
function popupProfileInfoOpened() {
  popupProfileInfo.classList.add('popup_opened');
  inputName.value = profileName.textContent;
  inputProfession.value = profileProfession.textContent;
}

// функция закрытия popup в profile__info
function popupProfileInfoClouse() {
  popupProfileInfo.classList.remove('popup_opened');
}

// oбработчик отправки формы в profile__info
function formSubmitHandlerProfileInfo (evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileProfession.textContent = inputProfession.value;
  popupProfileInfoClouse();
}

// функция открытия popup для добавления карточки в elements
function popupElementCardOpened() {
  popupElementCard.classList.add('popup_opened');
}

// функция закрытия popup для добавления карточки в elements
function popupElementCardClouse() {
  popupElementCard.classList.remove('popup_opened');
}

// oбработчик отправки формы для добавления карточки в elements
function formSubmitHandlerElementCard (evt) {
  evt.preventDefault();
  addElements(inputPlaceUrl.value, inputPlace.value);
  popupElementCardClouse();
}

// добавление карточек из массива в elements
initialCards.forEach((card) => {
  return addElements(card.link, card.name);
});

// открытие popup в profile__info
buttonEdit.addEventListener('click', popupProfileInfoOpened);

// закрытие popup в profile__info
buttonClosePopupProfileInfo.addEventListener('click', popupProfileInfoClouse);

// прикрепляем обработчик к форме в profile__info
popupProfileInfo.addEventListener('submit', formSubmitHandlerProfileInfo);

// открытие popup для добавления карточки в elements
buttonAdd.addEventListener('click', popupElementCardOpened);

// закрытие popup для добавления карточки в elements
buttonClosePopupElementCard.addEventListener('click', popupElementCardClouse);

// прикрепляем обработчик к форме в popup для добавления карточки в elements
// имя карточки для теста Холмогорский район
// ссылка карточки для теста https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg
popupElementCard.addEventListener('submit', formSubmitHandlerElementCard);
