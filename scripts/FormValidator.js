export default class FormValidator {
  constructor(config, formSelector) {
    this._formSelector = formSelector;
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
  }

  // метод получения формы
  _getFormElement() {
    return document.querySelector(`#${this._formSelector}`);
  }

  // метод получения списка полей формы
  _getInputsList() {
    return Array.from(this._getFormElement().querySelectorAll(this._inputSelector));
  }

  // метод выборa элемента ошибки на основе уникального класса
  _getInputElementError(inputElement) {
    return this._getFormElement().querySelector(`.${inputElement.id}-input-error`);
  }

  // метод добавления класса с ошибкой к input
  _showInputError(inputElement) {
    const errorElement = this._getInputElementError(inputElement);

    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(this._errorClass);
  }

  // метод удаления класса с ошибкой из input
  _hideInputError(inputElement) {
    const errorElement = this._getInputElementError(inputElement);

    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  }

  // метод проверки валидности поля
  _isValid(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement);
    } else {
      this._hideInputError(inputElement);
    }
  }

  // метод добавления неактивного состояния кнопке в форме с учетом проверки по умолчанию заполненных полей при открытии формы
  _checkInputEmpty() {
    const popupContainer = this._getFormElement().parentNode;
    const popupElement = popupContainer.parentNode;

    if (popupElement.classList.contains('popup_opened')) {
      const inputsList = Array.from(this._getFormElement().querySelectorAll(this._inputSelector));
      const resultCheckInput = inputsList.every((inputElement) => {
        return inputElement.value === '';
      });
      const buttonElement = this._getFormElement().querySelector('.form__button');

      if (resultCheckInput) {
        this._toggleButtonState(inputsList, buttonElement);
      }
    }
  }

  // метод добавления проверки заполненных полей с изменением состояния кнопки при открытии для каждой кнопки, открывающей popup
  _setCheckInputEmptyToButton() {
    const buttonsList = Array.from(document.querySelectorAll('.button'));

    buttonsList.forEach((buttonElement) => {
      buttonElement.addEventListener('click', () => {
        this._checkInputEmpty();
      });
    });
  }

  // метод добавления обработчиков всем полям формы
  _setEventListenersToInputs() {
    this._setCheckInputEmptyToButton();

    this._getInputsList().forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._isValid(inputElement);
        this._toggleButtonState();
      });
    });
  }

  // метод проверки валидности всех полей формы
  _hasInvalidInput() {
    return this._getInputsList().some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  // метод переключения кнопки
  _toggleButtonState() {
    const buttonElement = this._getFormElement().querySelector(this._submitButtonSelector);

    if (this._hasInvalidInput()) {
      buttonElement.classList.add(this._inactiveButtonClass);
      buttonElement.setAttribute('disabled', 'disabled');
    } else {
      buttonElement.classList.remove(this._inactiveButtonClass);
      buttonElement.removeAttribute('disabled');
    }
  }

  // метод включения валидации
  enableValidation() {
    this._setEventListenersToInputs();
  }
}
