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
const errorFormProfileInfo = formProfileInfo.querySelector(`.${inputFormProfileInfo.id}-input-error`);

// функция добавления класса с ошибкой к input
function showInputError(element, errorMessage) {
  element.classList.add('form__item_type_error');
  errorFormProfileInfo.textContent = errorMessage;
  errorFormProfileInfo.classList.add('form__input-error_active');
};

// функция удаления класса с ошибкой из input
function hideInputError(element) {
  element.classList.remove('form__item_type_error');
  errorFormProfileInfo.classList.remove('form__input-error_active');
  errorFormProfileInfo.textContent = '';
};

// функция проверки валидности поля
function isValid() {
  if (!inputFormProfileInfo.validity.valid) {
    showInputError(inputFormProfileInfo, inputFormProfileInfo.validationMessage);
  } else {
    hideInputError(inputFormProfileInfo);
  }
};

inputFormProfileInfo.addEventListener('input', isValid);
