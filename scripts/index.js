// переменные, необходимые для реализации открытия popup в profile__info
const popupProfileInfo = document.querySelector('#popup-profile-info');
const buttonEdit = document.querySelector('.button-edit');
const buttonClosePopupProfileInfo = document.querySelector('#button-close-popup-profile-info');
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
const buttonClosePopupElementCard = document.querySelector('#button-close-popup-element-card');
const inputPlace = document.querySelector('#place');
const inputPlaceUrl = document.querySelector('#place-url');

// переменные, необходимые для реализации просмотра изображений из elements в popup
const elementImageList = document.querySelectorAll('.element__image');
const popupElementImage = document.querySelector('#element-popup');
const buttonClosePreviewElementCard = document.querySelector('#button-close-element-popup');

// переменные, необходимые для реализации закрытия popup при клике на overlay и нажатии на Esc
const popupElement = document.querySelector('.popup');

// функция открытия popup
function openPopup(elementPopup) {
  elementPopup.classList.add('popup_opened');
}

// функция закрытия popup
function closePopup(elementPopup) {
  elementPopup.classList.remove('popup_opened');
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

// функция создания карточек
function createElementCard(imageSrc, titleValue) {
  const elementTemplate = document.querySelector('#element-template').content;
  const elementCard = elementTemplate.querySelector('.element').cloneNode(true);

  elementCard.querySelector('.element__image').src = imageSrc;
  elementCard.querySelector('.element__image').alt = titleValue;
  elementCard.querySelector('.element__title').textContent = titleValue;

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
    popupElementImage.querySelector('.popup__image').src = imageSrc;
    popupElementImage.querySelector('.popup__image').alt = titleValue;
    popupElementImage.querySelector('.popup__description').textContent = titleValue;

    openPopup(popupElementImage);
  });

  return elementCard;
}

// функция добавления карточек в elements из массива
function addElementsFromArrey(initialCards) {
  initialCards.forEach((card) => {
    elementsList.append(createElementCard(card.link, card.name));
  });
}

// oбработчик отправки формы для добавления карточки в elements
function submitHandlerFormElementCard(evt) {
  evt.preventDefault();
  elementsList.prepend(createElementCard(inputPlaceUrl.value, inputPlace.value));
  formAddCard.reset();
  closePopup(popupElementCard);
}

// функция сброса полей формы при закрытии
function resetInputForm(formElement) {
  if(formElement) {
    const errorElementsList = Array.from(formElement.querySelectorAll('.form__input-error'));
    const inputElementsList = Array.from(formElement.querySelectorAll('.form__item'));

    formElement.reset();
    errorElementsList.forEach((errorElement) => {
      errorElement.textContent = '';
    });
    inputElementsList.forEach((inputElement) => {
      inputElement.classList.remove('form__item_type_error');
    });
  }
}

// функция закрытия popup при клике на overlay
function closePopupByClickOverlay(popupElement) {
  const formElement = popupElement.querySelector('.form');

  document.addEventListener('click', (evt) => {
    if(evt.target === popupElement) {
      closePopup(popupElement);
      resetInputForm(formElement);
    }
  });
}

// функция добавления возможности закрытия popup при клике на overlay всем popup
function setClosePopupByClickOverlayToPopups() {
  const popapsList = Array.from(document.querySelectorAll('.popup'));

  popapsList.forEach((popupElement) => {
    closePopupByClickOverlay(popupElement);
  });
}

// функция закрытия popup при нажатии на Esc
function closePopupByEsc(popupElement) {
  const formElement = popupElement.querySelector('.form');

  document.addEventListener('keydown', (evt) => {
    if ((evt.key === "Escape" && (popupElement.classList.contains('popup_opened')))) {
      closePopup(popupElement);
      reserInputForm(formElement);
    }
  });
}

// функция добавления возможности закрытия popup при нажатии на Esc всем popup
function setClosePopupByEsc() {
  const popapsList = Array.from(document.querySelectorAll('.popup'));

  popapsList.forEach((popupElement) => {
    closePopupByEsc(popupElement);
  });
}

// добавление карточек из массива в elements
addElementsFromArrey(initialCards);

// открытие popup в profile__info
buttonEdit.addEventListener('click', () => {
  setValuesPopupProfileInfo();
  if(buttonFormSubmitPopupProfileInfo.hasAttribute('disabled')) {
    buttonFormSubmitPopupProfileInfo.removeAttribute('disabled');
    buttonFormSubmitPopupProfileInfo.classList.remove('form__button_disabled');
  }
  openPopup(popupProfileInfo);

});

// закрытие popup в profile__info
buttonClosePopupProfileInfo.addEventListener('click', () => {
  const formElement = popupProfileInfo.querySelector('.form');

  closePopup(popupProfileInfo);
  resetInputForm(formElement);
});

// прикрепляем обработчик к форме в profile__info
popupProfileInfo.addEventListener('submit', submitHandlerFormProfileInfo);

// открытие popup для добавления карточки в elements
buttonAdd.addEventListener('click', () => {
  openPopup(popupElementCard);
});

// закрытие popup для добавления карточки в elements
buttonClosePopupElementCard.addEventListener('click', () => {
  const formElement = popupElementCard.querySelector('.form');

  closePopup(popupElementCard);
  resetInputForm(formElement);
});

// прикрепляем обработчик к форме в popup для добавления карточки в elements
// имя карточки для теста Холмогорский район
// ссылка карточки для теста https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg
popupElementCard.addEventListener('submit', submitHandlerFormElementCard);

// закрытие превью для image
buttonClosePreviewElementCard.addEventListener('click', () => {
  closePopup(popupElementImage);
});

// добавлениe возможности закрытия popup при клике на overlay всем popup
setClosePopupByClickOverlayToPopups();

// добавлениe возможности закрытия popup при нажатии на Esc
setClosePopupByEsc();
