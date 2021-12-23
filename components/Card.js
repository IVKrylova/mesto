export default class Card {
  constructor(data, cardSelector, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._popupElementImage = document.querySelector('#element-popup');
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

  // установка слушателей событий
  _setEventListeners() {
    this._element.querySelector('.element__like').addEventListener('click', evt => {
      this._handleToggleLike();
    });

    this._element.querySelector('.button-delete').addEventListener('click', evt => {
      this._handleDeleteElementCard();
    });

    this._element.querySelector('.element__link-to-popup').addEventListener('click', evt => {
      this._handleCardClick();
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
