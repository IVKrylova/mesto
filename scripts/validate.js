/* // включение валидации вызовом enableValidation
// все настройки передаются при вызове

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.form__item',
  submitButtonSelector: '.form__button',
  inactiveButtonClass: 'form__button_disabled',
  inputErrorClass: 'form__item_type_error',
  errorClass: 'form__error_visible'
}); */

// переменные, необходимые валидации формы в в profile__info
const formProfileInfo = document.querySelector('#form-edit-profile');
const inputFormProfileInfo = formProfileInfo.querySelector('.form__item');

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

  inputsList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement);
    });
  });
}

function enableValidation() {
  const formsList = Array.from(document.querySelectorAll('.form'));

  formsList.forEach((formElement) => {
    setEventListeners(formElement);
  });
}



enableValidation()
