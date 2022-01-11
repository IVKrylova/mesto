export default class Api {
  constructor(options) {
    this.baseUrl = options.baseUrl;
    this.authorization = options.headers.authorization;
    this.contentType = options.headers.authorization['Content-Type'];
  }

  getUserInfo(renderUserInfo) {
    return fetch('https://nomoreparties.co/v1/cohort-34/users/me', {
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

}


/* getInitialCards() {
  //Не забывайте проверять, всё ли в порядке с ответом
  return fetch('https://mesto.nomoreparties.co/v1/cohort-42/cards', {
    headers: {
      authorization: 'c56e30dc-2883-4270-a59e-b2f7bae969c6'
    }
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }

      // Учитывайте случай, когда сервер вернул ошибку - если ошибка, отклоняем промис
      return Promise.reject(`Ошибка: ${res.status}`);
    });
} */


/* //Обрабатывайте ошибки, попадающие в catch
api.getInitialCards()
  .then((result) => {
    // обрабатываем результат
  })
  .catch((err) => {
    console.log(err); // выведем ошибку в консоль
  }); */
