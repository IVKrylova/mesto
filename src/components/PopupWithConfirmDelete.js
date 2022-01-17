import Popup from "./Popup.js";
import { formSelector } from "../utils/constants.js";

export default class PopupWithConfirmDelete extends Popup {
  constructor(popupSelector, submitHandlerForm) {
    super(popupSelector);
    this._submitHandlerForm = submitHandlerForm;
    this._formElement = this._elementPopup.querySelector(formSelector);
    this._inputWithIdCard = this._formElement.querySelector('.form__input-id');
    this._buttonForm = this._formElement.querySelector('.form__button');
    this._buttonFormValue = this._buttonForm.textContent;
  }

  // метод закрытия popup
  close() {
    super.close();
    this._formElement.reset();
  }

  // метод открытия popup
  openPopupWithCardId(data) {
    super.open();
    this._reportButtonText();
    this._inputWithIdCard.value = data._id;
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
      this._submitHandlerForm();
      this.close();
    });
  }
}
