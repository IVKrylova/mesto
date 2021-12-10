export default class Card {
  constructor(data, openPopup, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._openPopup = openPopup;
    this._cardSelector = cardSelector;
  }

  // метод, который получает элемент карточки из разметки
  _getElementCard() {
  	const elementTemplate = document.querySelector('#element-template').content;
    const elementCard = elementTemplate.querySelector('.element').cloneNode(true);

    return elementCard;
  }

  // обработчик переключения цвета лайка при клике
  _handleToggleLike() {
    this._element.querySelector('.element__like').classList.toggle('element__like_active');
  }

  // обработчик удаления карточки
  _handleDeleteElementCard() {
    const elementCardDelete = this._element.querySelector('.button-delete').closest('.element');
    elementCardDelete.remove();
  }

  // метод выбора элемента popup для image
  _getPopupElementImage() {
    return document.querySelector('#element-popup');
  }

  // обработчик открытия popup для image
  _handleOpenpopupElementImage() {
    const popupElementImage = this._getPopupElementImage();
    popupElementImage.querySelector('.popup__image').src = this._link;
    popupElementImage.querySelector('.popup__image').alt = this._name;
    popupElementImage.querySelector('.popup__description').textContent = this._name;
    this._openPopup(popupElementImage);
  }

  // установка слушателей событий
  _setEventListeners() {
    this._element.querySelector('.element__like').addEventListener('click', (evt) => {
      this._handleToggleLike();
    });

    this._element.querySelector('.button-delete').addEventListener('click', (evt) => {
      this._handleDeleteElementCard();
    });

    this._element.querySelector('.element__link-to-popup').addEventListener('click', (evt) => {
      this._handleOpenpopupElementImage();
    });
  }

  // метод, который генерирует карточку
  generateElementCard() {
    this._element = this._getElementCard();
    this._setEventListeners();
    this._element.querySelector('.element__image').src = this._link;
    this._element.querySelector('.element__image').alt = this._name;
    this._element.querySelector('.element__title').textContent = this._name;

    return this._element;
  }
}
