export default class FormValidator {
  constructor(config, formSelector) {
    this._formSelector = formSelector;
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
    this._formElement = document.querySelector(this._formSelector);
    this._inputsList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    this._buttonElement = this._formElement.querySelector('.form__button');
    this._popupElement = this._formElement.parentNode.parentNode;
    this._buttonsList = Array.from(document.querySelectorAll('.button'));
  }

  // метод выборa элемента ошибки на основе уникального класса
  _getInputElementError(inputElement) {
    return this._formElement.querySelector(`.${inputElement.id}-input-error`);
  }

  // метод добавления класса с ошибкой к input
  _showInputError(inputElement) {
    inputElement.classList.add(this._inputErrorClass);
    this._getInputElementError(inputElement).textContent = inputElement.validationMessage;
    this._getInputElementError(inputElement).classList.add(this._errorClass);
  }

  // метод удаления класса с ошибкой из input
  _hideInputError(inputElement) {
    inputElement.classList.remove(this._inputErrorClass);
    this._getInputElementError(inputElement).classList.remove(this._errorClass);
    this._getInputElementError(inputElement).textContent = '';
  }

  // метод проверки валидности поля
  _isValid(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement);
    } else {
      this._hideInputError(inputElement);
    }
  }

  // метод очистки сообщений об ошибки из input
  _hideError(inputElement) {
    this._getInputElementError(inputElement).textContent = '';
  }

  // метод добавления неактивного состояния кнопке в форме с учетом проверки по умолчанию заполненных полей при открытии формы
  _checkInputEmpty() {
    if (this._popupElement.classList.contains('popup_opened')) {
      const resultCheckInput = this._inputsList.every(inputElement => inputElement.value === '');
      if (resultCheckInput) {
        this._toggleButtonState();
      }
    }
  }

  // метод добавления проверки заполненных полей с изменением состояния кнопки при открытии для каждой кнопки, открывающей popup
  _setCheckInputEmptyToButton() {
    this._buttonsList.forEach(buttonElement => {
      buttonElement.addEventListener('click', () => {
        this._checkInputEmpty();
      });
    });
  }

  // метод добавления обработчиков всем полям формы
  _setEventListenersToInputs() {
    this._setCheckInputEmptyToButton();

    this._inputsList.forEach(inputElement => {
      inputElement.addEventListener('input', () => {
        this._isValid(inputElement);
        this._toggleButtonState();
      });
    });
  }

  // метод проверки валидности всех полей формы
  _hasInvalidInput() {
    return this._inputsList.some(inputElement => {
      return !inputElement.validity.valid;
    });
  }

  // метод переключения кнопки
  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._buttonElement.classList.add(this._inactiveButtonClass);
      this._buttonElement.setAttribute('disabled', 'disabled');
    } else {
      this._buttonElement.classList.remove(this._inactiveButtonClass);
      this._buttonElement.removeAttribute('disabled');
    }
  }

  // метод для очистки ошибок и управления кнопкой
  resetValidation() {
    this._toggleButtonState();
    this._inputsList.forEach(inputElement => this._hideError(inputElement));
  }

  // метод включения валидации
  enableValidation() {
    this._setEventListenersToInputs();
  }
}
