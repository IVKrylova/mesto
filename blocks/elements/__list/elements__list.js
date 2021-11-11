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

// функция добавления карточек в elements
function addElements(imageSrc, titleValue) {
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

  elementsList.append(elementCard);
}

// добавление карточек из массива в elements
initialCards.forEach((card) => {
  return addElements(card.link, card.name);
});
