export default class Card {
  constructor(data, cardSelector, handleCardClick, elementTemplateSelector, handleButtonDelete) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._elementTemplateSelector = elementTemplateSelector;
    this._handleButtonDelete = handleButtonDelete;
  }

  // метод, который получает элемент карточки из разметки
  _getElementCard() {
  	const elementTemplate = document.querySelector(this._elementTemplateSelector).content;
    const elementCard = elementTemplate.querySelector(this._cardSelector).cloneNode(true);

    return elementCard;
  }

  // обработчик переключения цвета лайка при клике
  _handleToggleLike() {
    this._elementLike.classList.toggle('element__like_active');
  }

  // обработчик удаления карточки
  _handleDeleteElementCard() {
    const elementCardDelete = this._buttonDelete.closest(this._cardSelector);
    elementCardDelete.remove();
  }

  // установка слушателей событий
  _setEventListeners() {
    this._elementLike.addEventListener('click', evt => {
      this._handleToggleLike();
    });

    this._buttonDelete.addEventListener('click', evt => {
      this._handleButtonDelete();
    });

    this._elementLinkToPopup.addEventListener('click', evt => {
      this._handleCardClick();
    });
  }

  // метод, который генерирует карточку
  generateElementCard(item) {
    this._element = this._getElementCard();
    this._elementLike = this._element.querySelector('.element__like');
    this._buttonDelete = this._element.querySelector('.button-delete');
    this._elementImage = this._element.querySelector('.element__image');
    this._elementTitle = this._element.querySelector('.element__title');
    this._elementLinkToPopup = this._element.querySelector('.element__link-to-popup');
    this._elementCountLikes = this._element.querySelector('.element__count-like');

    this._setEventListeners();
    this._elementImage.src = this._link;
    this._elementImage.alt = this._name;
    this._elementTitle.textContent = this._name;

    // установка колличества лайков
    if(item.likes !== undefined && item.likes.length > 0) {
      this._elementCountLikes.textContent = item.likes.length;
    }

    // убрать кнопку удаления карточки, если карточка создана не мной
    if(!item.isOwner) {
      this._buttonDelete.className = 'button-delete_invisible';
    }

    return this._element;
  }
}
