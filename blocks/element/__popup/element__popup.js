const elementImageList = document.querySelectorAll('.element__image');

// открытие popup для image из NodeList, на котором произошло событие
elementImageList.forEach((image) => {
  image.addEventListener('click', (evt) => {
    const eventTarget = evt.target;
    const elementCard = eventTarget.closest('.element');
    const popupElementImage = elementCard.querySelector('.element__popup');
    const buttonClose = elementCard.querySelector('.button-close');

    // функция открытия popup
    function popupElementImageOpened() {
      popupElementImage.classList.add('popup_opened');
    }

    // функция закрытия popup
    function popupElementImageClouse() {
      popupElementImage.classList.remove('popup_opened');
    }

    // открытие popup
    image.addEventListener('click', popupElementImageOpened);

    // закрытие popup в profile__info
    buttonClose.addEventListener('click', popupElementImageClouse);
  });
});
