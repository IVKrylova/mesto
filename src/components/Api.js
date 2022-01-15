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
      const { link, name } = data;

      return { link, name };
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

  // метод получения массива карточек со свойством isOwner
  getInitialCards() {
   return Promise.all([this._getUserId(), this._getArrayCard()])
      .then(res => {
        const userId = res[0];
        const arrayCard = res[1];

        return arrayCard.map(card => {
          if(userId == card.owner._id) {
            card.isOwner = true;
            return card;
          } else {
            card.isOwner = false;
            return card;
          }
        });
      })
      .then(data => {
        return data.map(card => {
          const { name, link, likes, isOwner } = card;

          return { name, link, likes, isOwner };
        });
      })
  }


}
