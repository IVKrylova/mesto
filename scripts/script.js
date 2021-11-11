// переменные, необходимые для реализации открытия popup в profile__info
const popupProfileInfo = document.querySelector('#popup-profile-info');
const buttonEdit = document.querySelector('.button-edit');
const buttonClosePopupProfileInfo = document.querySelector('#button-close-popup-profile-info');
const profileName = document.querySelector('.profile__name');
const inputName = document.querySelector('#name');
const profileProfession = document.querySelector('.profile__profession');
const inputProfession = document.querySelector('#profession');

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
const buttonClosePopupElementCard = document.querySelector('#button-close-popup-element-card');
const inputPlace = document.querySelector('#place');
const inputPlaceUrl = document.querySelector('#place-url');

// переменные, необходимые для реализации просмотра изображений из elements в popup
const elementImageList = document.querySelectorAll('.element__image');

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

// функция создания карточек
function createElementCard(imageSrc, titleValue) {
  const elementTemplate = document.querySelector('#element-template').content;
  const elementCard = elementTemplate.querySelector('.element').cloneNode(true);

  elementCard.querySelector('.element__image').src = imageSrc;
  elementCard.querySelector('.element__image').alt = titleValue;
  elementCard.querySelector('.element__title').textContent = titleValue;
  elementCard.querySelector('.popup__image').src = imageSrc;
  elementCard.querySelector('.popup__image').alt = titleValue;
  elementCard.querySelector('.popup__description').textContent = titleValue;

  // переключение цвета лайка при клике
  elementCard.querySelector('.element__like').addEventListener('click', (evt) => {
    const eventTarget = evt.target;
    eventTarget.classList.toggle('element__like_active');
  });

  // обработчик удаления карточки
  elementCard.querySelector('.button-delete').addEventListener('click', (evt) => {
    const eventTarget = evt.target;
    const elementCardDelete = eventTarget.closest('.element');
    elementCardDelete.remove();
  });

  // открытие popup для image
  elementCard.querySelector('.element__link-to-popup').addEventListener('click', (evt) => {
    const eventTarget = evt.target;
    const elementCard = eventTarget.closest('.element');
    const popupElementImage = elementCard.querySelector('.element__popup');

    popupElementImage.classList.add('popup_opened');
  });

  // закрытие popup для image
  elementCard.querySelector('.button-close').addEventListener('click', (evt) => {
    const eventTarget = evt.target;
    const elementCard = eventTarget.closest('.element');
    const popupElementImage = elementCard.querySelector('.element__popup');

    popupElementImage.classList.remove('popup_opened');
  });

  return elementCard;
}

// функция добавления карточек в elements из массива
function addElementsFromArrey() {
  initialCards.forEach((card) => {
    elementsList.append(createElementCard(card.link, card.name));
  });
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
  elementsList.prepend(createElementCard(inputPlaceUrl.value, inputPlace.value));
  formAddCard.reset();
  popupElementCardClouse();
}

// добавление карточек из массива в elements
addElementsFromArrey();

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
