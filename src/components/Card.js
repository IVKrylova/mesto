export default class Card {
  constructor(data, cardSelector, handleCardClick, elementTemplateSelector, handleButtonDelete, handlePutLike, handleDeleteLike) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._elementTemplateSelector = elementTemplateSelector;
    this._handleButtonDelete = handleButtonDelete;
    this._id = data._id;
    this._likes = data.likes;
    this._isOwner = data.isOwner;
    this._handlePutLike = handlePutLike;
    this._handleDeleteLike = handleDeleteLike;
    this._item = data;
    this._isLiked = data.isLiked;
  }

  // метод, который получает элемент карточки из разметки
  _getElementCard() {
  	const elementTemplate = document.querySelector(this._elementTemplateSelector).content;
    const elementCard = elementTemplate.querySelector(this._cardSelector).cloneNode(true);

    return elementCard;
  }

  // обработчик переключения цвета лайка при клике
  handleToggleLike() {
    this._elementLike.classList.toggle('element__like_active');
  }

  // установка слушателей событий
  _setEventListeners() {
    this._elementLike.addEventListener('click', evt => {
      if(this._elementLike.closest('.element__like_active')) {
        this._handleDeleteLike(this._item)
      } else {
        this._handlePutLike(this._item);
      }
    });

    this._buttonDelete.addEventListener('click', evt => {
      this._handleButtonDelete();
    });

    this._elementLinkToPopup.addEventListener('click', evt => {
      this._handleCardClick();
    });
  }

  // метод установки колличества лайков
  putCountLikes(countLikes) {
    if(countLikes == 0) {
      this._elementCountLikes.textContent = '';
    } else
    {
      this._elementCountLikes.textContent = countLikes;
    }
  }

  // метод, который генерирует карточку
  generateElementCard() {
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
    if(this._likes !== undefined && this._likes.length > 0) {
      this.putCountLikes(this._likes.length);
    }

    // убрать кнопку удаления карточки, если карточка создана не мной
    if(!this._isOwner) {
      this._buttonDelete.className = 'button-delete_invisible';
    }

    // установка цвета лайка при начальной загрузке карточек
    if(this._isLiked) {
      this._elementLike.classList.add('element__like_active');
    }

    return this._element;
  }
}
