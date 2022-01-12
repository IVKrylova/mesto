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

  // метод получения начального массива карточек
  getInitialCards() {
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
    .then(data => {
      return data.map(card => {
        const { name, link } = card;

        return { name, link };
      });
    })
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
}

