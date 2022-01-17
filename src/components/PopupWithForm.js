import Popup from "./Popup.js";
import { formSelector } from "../utils/constants.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitHandlerForm) {
    super(popupSelector);
    this._submitHandlerForm = submitHandlerForm;
    this._formElement = this._elementPopup.querySelector(formSelector);
    this._inputsList = Array.from(this._formElement.querySelectorAll('.form__item'));
    this._inputWithIdCard = this._elementPopup.querySelector('.form__input-id');
    this._buttonForm = this._formElement.querySelector('.form__button');
    this._buttonFormValue = this._buttonForm.textContent;
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

  // метод открытия popup для удаления карточки
  openPopupWithCardId(data) {
    super.open();
    this._reportButtonText();
    this._inputWithIdCard.value = data._id;
  }

  // метод открытия popup
  open() {
    super.open();
    this._reportButtonText();
  }

  // метод получения id карточки
  getCardId() {
    return this._inputWithIdCard.value;
  }

  // метод для изменения кнопки при загрузке данных с сервера
  reportDownload() {
    this._buttonForm.textContent = 'Сохранение...'
  }

  // метод для возвращения значения кнопки после загрузки
  _reportButtonText() {
    this._buttonForm.textContent = this._buttonFormValue;
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
