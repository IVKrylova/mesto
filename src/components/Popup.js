export default class Popup {
  constructor(popupSelector) {
    this._elementPopup = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  // метод закрытия popup при нажатии на Esc
  _handleEscClose = (evt) => {
    if (evt.key === 'Escape') {
      this.close();
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
      if (evt.target.classList.contains('popup_opened')) {
        this.close();
      }
      if (evt.target.classList.contains('button-close')) {
        this.close();
      }
    });
  }
}
