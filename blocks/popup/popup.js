const popup = document.querySelector('.popup');
const buttonEdit = document.querySelector('.button-edit');
const buttonClose = document.querySelector('.button-close');

function popupOpened() {
 popup.classList.add('popup_opened');
}

function popupRemoved() {
  popup.classList.remove('popup_opened');
}

buttonEdit.addEventListener('click', popupOpened);
buttonClose.addEventListener('click', popupRemoved);
