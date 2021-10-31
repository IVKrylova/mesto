const popupElement = document.querySelector('.popup');
const buttonEdit = document.querySelector('.button-edit');
const buttonClose = document.querySelector('.button-close');
const profileName = document.querySelector('.profile__name');
const inputName = document.querySelector('#name');
const profileProfession = document.querySelector('.profile__profession');
const inputProfession = document.querySelector('#profession');
const formElement = document.querySelector('.form');

// функция открытия popup
function popupOpened() {
  popupElement.classList.add('popup_opened');
  inputName.value = profileName.textContent;
  inputProfession.value = profileProfession.textContent;
}

// функция закрытия popup
function popupClouse() {
  popupElement.classList.remove('popup_opened');
}

// oбработчик отправки формы
function formSubmitHandler (evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileProfession.textContent = inputProfession.value;
  popupClouse();
}

// открытие и закрытие popup
buttonEdit.addEventListener('click', popupOpened);
buttonClose.addEventListener('click', popupClouse);

// прикрепляем обработчик к форме
formElement.addEventListener('submit', formSubmitHandler);
