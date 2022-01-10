export default class Api {
  constructor(options) {
    this.baseUrl = options.baseUrl;
    this.headers = options.headers;
  }

  getIdUser() {
    return fetch('https://nomoreparties.co/v1/cohort-34/users/me', {
      headers: {
        authorization: 'e8b623b1-ae65-4d07-9972-4d21425b16b6'
      }
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then(data => {
      console.log(data);
    })
    .catch(err => console.log(err));
  }

  // другие методы работы с API
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
