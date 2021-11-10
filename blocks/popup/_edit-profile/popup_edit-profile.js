const popupProfileInfo = document.querySelector('#popup-profile-info');
const buttonEdit = document.querySelector('.button-edit');
const buttonClosePopupProfileInfo = document.querySelector('#button-close-popup-profile-info');
const profileName = document.querySelector('.profile__name');
const inputName = document.querySelector('#name');
const profileProfession = document.querySelector('.profile__profession');
const inputProfession = document.querySelector('#profession');

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

// открытие popup в profile__info
buttonEdit.addEventListener('click', popupProfileInfoOpened);

// закрытие popup в profile__info
buttonClosePopupProfileInfo.addEventListener('click', popupProfileInfoClouse);

// прикрепляем обработчик к форме в profile__info
popupProfileInfo.addEventListener('submit', formSubmitHandlerProfileInfo);
