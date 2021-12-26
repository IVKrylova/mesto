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
    this._buttonElement = this._formElement.querySelector(this._submitButtonSelector);
  }

  // метод выборa элемента ошибки на основе уникального класса
  _getInputElementError(inputElement) {
    return this._formElement.querySelector(`.${inputElement.id}-input-error`);
  }

  // метод добавления класса с ошибкой к input
  _showInputError(inputElement) {
    inputElement.classList.add(this._inputErrorClass);
    this._inputElement.textContent = inputElement.validationMessage;
    this._inputElement.classList.add(this._errorClass);
  }

  // метод удаления класса с ошибкой из input
  _hideInputError(inputElement) {
    inputElement.classList.remove(this._inputErrorClass);
    this._inputElement.classList.remove(this._errorClass);
    this._inputElement.textContent = '';
  }

  // метод проверки валидности поля
  _isValid(inputElement) {
    this._inputElement = this._getInputElementError(inputElement);

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

  // метод очистки полей формы
  _resetInputForm() {
    if(this._formElement) {
      this._formElement.reset();
      this._inputsList.forEach((inputElement) => {
        inputElement.classList.remove('form__item_type_error');
      });
    }
  }

  // метод добавления обработчиков всем полям формы
  _setEventListenersToInputs() {
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

  // метод удаления неактивного состояния кнопки при валидных Input
  removeInactiveStateOfButton() {
    const resultCheckInput = this._inputsList.every(inputElement => inputElement.validity.valid);
    if(resultCheckInput && this._buttonElement.hasAttribute('disabled')) {
      this._buttonElement.removeAttribute('disabled');
      this._buttonElement.classList.remove('form__button_disabled');
    }
  }

  // метод для очистки ошибок и управления кнопкой
  resetValidation() {
    this._toggleButtonState();
    this._resetInputForm();
    this._inputsList.forEach(inputElement => this._hideError(inputElement));
  }

  // метод включения валидации
  enableValidation() {
    this._setEventListenersToInputs();
  }
}
