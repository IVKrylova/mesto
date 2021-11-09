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

// функция открытия popup для добавления карточки в elements
function popupElementCardOpened() {
  popupElementCard.classList.add('popup_opened');
}

// функция закрытия popup для добавления карточки в elements
function popupElementCardClouse() {
  popupElementCard.classList.remove('popup_opened');
}

// открытие popup в profile__info
buttonEdit.addEventListener('click', popupProfileInfoOpened);

// закрытие popup в profile__info
buttonClosePopupProfileInfo.addEventListener('click', popupProfileInfoClouse);

// oбработчик отправки формы в profile__info
function formSubmitHandler (evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileProfession.textContent = inputProfession.value;
  popupProfileInfoClouse();
}

// прикрепляем обработчик к форме в profile__info
popupProfileInfo.addEventListener('submit', formSubmitHandler);

// открытие popup для добавления карточки в elements
buttonAdd.addEventListener('click', popupElementCardOpened);

// закрытие popup для добавления карточки в elements
buttonClosePopupElementCard.addEventListener('click', popupElementCardClouse);
