const popup = document.querySelector('.popup');
const buttonEdit = document.querySelector('.button-edit');
const buttonClose = document.querySelector('.button-close');
const profileName = document.querySelector('.profile__name');
const inputName = document.querySelector('#name');
const profileProfession = document.querySelector('.profile__profession');
const inputProfession = document.querySelector('#profession');

//console.log(inputName);


function popupOpened() {
  popup.classList.add('popup_opened');
  inputName.value = profileName.textContent;
  inputProfession.value = profileProfession.textContent;
}

function popupRemoved() {
  popup.classList.remove('popup_opened');
}

// открытие и закрытие popup
buttonEdit.addEventListener('click', popupOpened);
buttonClose.addEventListener('click', popupRemoved);
