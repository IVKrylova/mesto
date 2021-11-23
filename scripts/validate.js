// функция добавления класса с ошибкой к input
function showInputError(formElement, inputElement, errorMessage) {
  // выбор элемента ошибки на основе уникального класса
  const errorElement = formElement.querySelector(`.${inputElement.id}-input-error`);

  inputElement.classList.add('form__item_type_error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('form__input-error_active');
}

// функция удаления класса с ошибкой из input
function hideInputError(formElement, inputElement) {
  // выбор элемента ошибки на основе уникального класса
  const errorElement = formElement.querySelector(`.${inputElement.id}-input-error`);

  inputElement.classList.remove('form__item_type_error');
  errorElement.classList.remove('form__input-error_active');
  errorElement.textContent = '';
}

// функция проверки валидности поля
function isValid(formElement, inputElement) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
}

// функция добавления обработчиков всем полям формы
function setEventListeners(formElement) {
  const inputsList = Array.from(formElement.querySelectorAll('.form__item'));
  const buttonElement = formElement.querySelector('.form__button');

  toggleButtonState(inputsList, buttonElement);

  inputsList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement);
      toggleButtonState(inputsList, buttonElement);
    });
  });
}

// функция добавления обработчиков всем формам
function enableValidation() {
  const formsList = Array.from(document.querySelectorAll('.form'));

  formsList.forEach((formElement) => {
    setEventListeners(formElement);
  });
}

// функция проверки валидности всех полей формы
function hasInvalidInput(inputsList) {
  return inputsList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

// функция переключения кнопки
function toggleButtonState(inputsList, buttonElement) {
  if (hasInvalidInput(inputsList)) {
    buttonElement.classList.add('form__button_disabled');
  } else {
    buttonElement.classList.remove('form__button_disabled');
  }
};



enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.form__item',
  submitButtonSelector: '.form__button',
  inactiveButtonClass: 'form__button_disabled',
  inputErrorClass: 'form__item_type_error',
  errorClass: 'form__error_visible'
});
