/* const formElement = document.querySelector('.form'); */
const buttonAdd = document.querySelector('.button-add');
const popupElementCard = document.querySelector('#popup-element-card');
const buttonClosePopupElementCard = document.querySelector('#button-close-popup-element-card');
const inputPlace = document.querySelector('#place');
const inputPlaceUrl = document.querySelector('#place-url');

// функция открытия popup для добавления карточки в elements
function popupElementCardOpened() {
  popupElementCard.classList.add('popup_opened');
}

// функция закрытия popup для добавления карточки в elements
function popupElementCardClouse() {
  popupElementCard.classList.remove('popup_opened');
}

// функция добавления карточек в начало блока elements
function addElements(imageSrc, titleValue) {
  const elementTemplate = document.querySelector('#element-template').content;
  const elementCard = elementTemplate.querySelector('.element').cloneNode(true);

  elementCard.querySelector('.element__image').src = imageSrc;
  elementCard.querySelector('.element__image').alt = titleValue;
  elementCard.querySelector('.element__title').textContent = titleValue;

  elementsList.prepend(elementCard);
}

// oбработчик отправки формы для добавления карточки в elements
function formSubmitHandlerElementCard (evt) {
  evt.preventDefault();
  addElements(inputPlaceUrl.value, inputPlace.value);
  popupElementCardClouse();
}

// открытие popup для добавления карточки в elements
buttonAdd.addEventListener('click', popupElementCardOpened);

// закрытие popup для добавления карточки в elements
buttonClosePopupElementCard.addEventListener('click', popupElementCardClouse);

// прикрепляем обработчик к форме в popup для добавления карточки в elements
// имя карточки для теста Холмогорский район
// ссылка карточки для теста https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg
popupElementCard.addEventListener('submit', formSubmitHandlerElementCard);
