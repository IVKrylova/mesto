export default class Api {
  constructor(options) {
    this.baseUrl = options.baseUrl;
    this.authorization = options.headers.authorization;
    this.contentType = options.headers['Content-Type'];
  }

  // метод проверки ошибок
  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  // метод получения информации о пользователе
  getUserInfo() {
    return fetch(`https://nomoreparties.co/v1/cohort-34/users/me`, {
      headers: {
        authorization: this.authorization
      }
    })
    .then(this._checkResponse)
  }

  // метод получения массива карточек
  _getArrayCard() {
    return fetch(`${this.baseUrl}/cards`, {
      headers: {
        authorization: this.authorization
      }
    })
    .then(this._checkResponse)
    .then(data => data)
  }

  // метод отправки новой карточки на сервер
  sendNewCard(data, renderLoading) {
    return fetch(`${this.baseUrl}/cards`, {
      method: 'POST',
      headers: {
        authorization: this.authorization,
        'Content-Type': this.contentType
      },
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    })
    .then(this._checkResponse)
    .then(data => {
      renderLoading();
      const { link, name, _id } = data;

      return { link, name, _id };
    })
  }

  // метод для редактирования информации о пользователе
  editProfileInfo(data, renderLoading) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this.authorization,
        'Content-Type': this.contentType
      },
      body: JSON.stringify({
        name: data.name,
        about: data.profession
      })
    })
    .then(this._checkResponse)
    .then(data => {
      renderLoading();
      const { name, about } = data;

      return { name, about };
    })
  }

  // метод получения массива карточек со свойствами isOwner и isLiked
  getInitialCards() {
   return Promise.all([this.getUserInfo(), this._getArrayCard()])
      .then(res => {
        const userInfo = res[0];
        const arrayCards = res[1];
        const cardsListWithIsOwner = arrayCards.map(card => {
          if(userInfo._id === card.owner._id) {
            card.isOwner = true;
            return card;
          } else {
            card.isOwner = false;
            return card;
          }
        });
        const checkLike = function(like) {
          return userInfo._id === like._id;
        }

        return cardsListWithIsOwner.map(card => {
          if(card.likes.some(checkLike)) {
            card.isLiked = true;
              return card;
          } else {
            card.isLiked = false;
            return card;
          }
        });
      })
      .then(data => {
        return data.map(card => {
          const { name, link, likes, isOwner, isLiked, _id } = card;

          return { name, link, likes, isOwner, isLiked, _id };
        });
      })
  }

  // метод удаления карточки
  deleteCard(cardId) {
    const idCard = cardId;
    return fetch(`${this.baseUrl}/cards/${idCard}`, {
      method: 'DELETE',
      headers: {
        authorization: this.authorization,
        'Content-Type': this.contentType
      }
    })
    .then(this._checkResponse)
    .then(res => res)
  }

  // метод для постановки лайка карточке
  putLike(cardId) {
    const idCard = cardId;
    return fetch(`${this.baseUrl}/cards/${idCard}/likes`, {
      method: 'PUT',
      headers: {
        authorization: this.authorization,
        'Content-Type': this.contentType
      }
    })
    .then(this._checkResponse)
    .then(card => {
      return card
    })
  }

  // метод для удаления лайка у карточки
  deleteLike(cardId) {
    const idCard = cardId;
    return fetch(`${this.baseUrl}/cards/${idCard}/likes`, {
      method: 'DELETE',
      headers: {
        authorization: this.authorization,
        'Content-Type': this.contentType
      }
    })
    .then(this._checkResponse)
    .then(card => {
      return card;
    })
  }

  // метод редактирования аватара
  editAvatar(newAvatarUrl, renderLoading) {
    return fetch(`${this.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: this.authorization,
        'Content-Type': this.contentType
      },
      body: JSON.stringify({
        avatar: newAvatarUrl
      })
    })
    .then(this._checkResponse)
    .then(data => {
      renderLoading();
      const { avatar } = data;

      return avatar;
    })
  }
}
