import Popup from "./Popup.js";
import { formSelector } from "../utils/constants.js";

export default class PopupWithConfirmDelete extends Popup {
  constructor(popupSelector, submitHandlerForm) {
    super(popupSelector);
    this._submitHandlerForm = submitHandlerForm;
    this._formElement = this._elementPopup.querySelector(formSelector);
    this._inputWithIdCard = this._formElement.querySelector('.form__input-id');
  }

  // метод закрытия popup
  close() {
    super.close();
    this._formElement.reset();
  }

  // метод открытия popup
  open(data) {
    super.open();
    this._inputWithIdCard.value = data._id;
  }

  // метод получения id карточки
  getCardId() {
    return this._inputWithIdCard.value;
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
