import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector, data) {
    super(popupSelector);
    this._name = data.name;
    this._link = data.link;
    this._elementPopup = document.querySelector(popupSelector);
    this._popupImage = this._elementPopup.querySelector('.popup__image');
    this._popupDescription = this._elementPopup.querySelector('.popup__description');

  //console.log(this)
  }

  // метод открытия popup
  open() {
   // console.log(this)


    this._popupImage.src = this._link;
    this._popupImage.alt = this._name;
    this._popupDescription.textContent = this._name;
    super.open();
  }
}
