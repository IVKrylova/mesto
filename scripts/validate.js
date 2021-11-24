// функция включения валидации
function enableValidation({ formSelector, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass }) {

  // функция добавления класса с ошибкой к input
  function showInputError(formElement, inputElement, errorMessage) {
    // выбор элемента ошибки на основе уникального класса
    const errorElement = formElement.querySelector(`.${inputElement.id}-input-error`);

    inputElement.classList.add(inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(errorClass);
  }

  // функция удаления класса с ошибкой из input
  function hideInputError(formElement, inputElement) {
    // выбор элемента ошибки на основе уникального класса
    const errorElement = formElement.querySelector(`.${inputElement.id}-input-error`);

    inputElement.classList.remove(inputErrorClass);
    errorElement.classList.remove(errorClass);
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
  function setEventListenersToInputs(formElement) {
    const inputsList = Array.from(formElement.querySelectorAll(inputSelector));
    const buttonElement = formElement.querySelector(submitButtonSelector);

    toggleButtonState(inputsList, buttonElement);

    inputsList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        isValid(formElement, inputElement);
        toggleButtonState(inputsList, buttonElement);
      });
    });
  }

  // функция проверки валидности всех полей формы
  function hasInvalidInput (inputsList) {
    return inputsList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  // функция переключения кнопки
  function toggleButtonState(inputsList, buttonElement) {
    if (hasInvalidInput(inputsList)) {
      buttonElement.classList.add(inactiveButtonClass);
      buttonElement.setAttribute('disabled', 'disabled');
    } else {
      buttonElement.classList.remove(inactiveButtonClass);
      buttonElement.removeAttribute('disabled');
    }
  }

  // функция добавления обработчиков всем формам
  function setEventListenersToForms() {
    const formsList = Array.from(document.querySelectorAll(formSelector));

    formsList.forEach((inputElement) => {
      setEventListenersToInputs(inputElement);
    });
  }

  // добавлениe обработчиков всем формам
  setEventListenersToForms();
}

// включение валидации
enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.form__item',
  submitButtonSelector: '.form__button',
  inactiveButtonClass: 'form__button_disabled',
  inputErrorClass: 'form__item_type_error',
  errorClass: 'form__input-error_active'
});
