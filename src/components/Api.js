export default class Api {
  constructor(options) {
    this.baseUrl = options.baseUrl;
    this.authorization = options.headers.authorization;
    this.contentType = options.headers['Content-Type'];
  }

  // метод получения информации о пользователе
  getUserInfo(renderUserInfo) {
    return fetch(`https://nomoreparties.co/v1/cohort-34/users/me`, {
      headers: {
        authorization: this.authorization
      }
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then(data => {
      const { name, about, avatar } = data;
      renderUserInfo({ name, about, avatar });
    })
    .catch(err => console.log(err));
  }

  // метод получения массива карточек
  _getArrayCard() {
    return fetch(`${this.baseUrl}/cards`, {
      headers: {
        authorization: this.authorization
      }
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then(data => data)
    .catch(err => console.log(err));
  }

  // метод отправки новой карточки на сервер
  sendNewCard(data) {
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
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then(data => {
      const { link, name, _id } = data;

      return { link, name, _id };
    })
    .catch(err => console.log(err));
  }

  // метод для редактирования информации о пользователе
  editProfileInfo(data) {
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
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then(data => {
      const { name, about } = data;

      return { name, about };
    })
    .catch(err => console.log(err));
  }

  // метод получения id пользователя
  _getUserId() {
    return fetch(`https://nomoreparties.co/v1/cohort-34/users/me`, {
      headers: {
        authorization: this.authorization
      }
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then(data => {
      const { _id } = data;

      return _id;
    })
    .catch(err => console.log(err));
  }

  // метод получения массива карточек со свойствами isOwner и isLiked
  getInitialCards() {
   return Promise.all([this._getUserId(), this._getArrayCard()])
      .then(res => {
        const userId = res[0];
        const arrayCard = res[1];
        const cardsListWithIsOwner = arrayCard.map(card => {
          if(userId == card.owner._id) {
            card.isOwner = true;
            return card;
          } else {
            card.isOwner = false;
            return card;
          }
        });
        const checkLike = function(like) {
          return userId == like._id;
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
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then(res => console.log(`status: ${res.status}`))
    .catch(err => console.log(err));
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
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then(card => {
      return card
    })
    .catch(err => console.log(err));
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
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then(card => {
      return card;
    })
    .catch(err => console.log(err));
  }

  // метод редактирования аватара
  editAvatar(newAvatarUrl) {
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
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then(data => {
      const { avatar } = data;

      return avatar;
    })
    .catch(err => console.log(err));
  }



}
