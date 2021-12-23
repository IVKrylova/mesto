export default class Popup {
  constructor(popupSelector) {
    /* this._popupSelector = popupSelector;
    this._elementPopup = document.querySelector(this._popupSelector); */

    this._elementPopup = document.querySelector(popupSelector);
    //this._openedPopup = document.querySelector('.popup_opened');


  }

  // метод закрытия popup при нажатии на Esc
  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this._openedPopup = document.querySelector('.popup_opened');
      this._openedPopup.classList.remove('popup_opened');
    }
  }

  // метод открытия popup
  open() {
    this._elementPopup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
  }

  // метод закрытия popup
  close() {
    this._elementPopup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }

  // установка слушателей событий
  setEventListeners() {
    // закрытие popup при клике на overlay и крeстик
    this._elementPopup.addEventListener('click', evt => {

//console.log(this._elementPopup)

      if (evt.target.classList.contains('popup_opened')) {
        this.close();
      }
      if (evt.target.classList.contains('button-close')) {
        this.close();
      }
    });
  }
}
