const buttonDeleteList = document.querySelectorAll('.button-delete');

// обработчик удаления карточки из elements для кнопки из NodeList, на которой произошло событие
buttonDeleteList.forEach((button) => {
  button.addEventListener('click', (evt) => {
    const eventTarget = evt.target;
    const elementCardDelete = eventTarget.closest('.element');
    elementCardDelete.remove();
  });
});
