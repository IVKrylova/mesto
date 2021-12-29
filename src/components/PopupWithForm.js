import Popup from "./Popup.js";
import { formSelector } from "../utils/constants.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitHandlerForm) {
    super(popupSelector);
    this._submitHandlerForm = submitHandlerForm;
    this._formElement = this._elementPopup.querySelector(formSelector);
    this._inputsList = Array.from(this._formElement.querySelectorAll('.form__item'));
  }

  // метод, который собирает данные всех полей формы
  _getInputValues() {
    this._formValues = {};
    this._inputsList.forEach(input => this._formValues[input.name] = input.value);

    return this._formValues;
  }

  // метод закрытия popup
  close() {
    super.close();
    this._formElement.reset();
  }

  setEventListeners() {
    super.setEventListeners();
    // прикрепляем обработчик к форме
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitHandlerForm(this._getInputValues());
      this.close();
    });
  }
}
