export default class UserInfo {
  constructor({ profileNameSelector, profileProfessionSelector }) {
    this._profileName = document.querySelector(profileNameSelector);
    this._profileProfession = document.querySelector(profileProfessionSelector);
    this._inputName = document.querySelector('#name');
    this._inputProfession = document.querySelector('#profession');
  }

  // метод, который возвращает объект с данными пользователя
  getUserInfo() {
    const name = this._profileName.textContent;
    const profession = this._profileProfession.textContent;

    return { name, profession }
  }

  // метод, который принимает новые данные пользователя и добавляет их на страницу
  setUserInfo() {
    this._profileName.textContent = this._inputName.value;
    this._profileProfession.textContent = this._inputProfession.value;
  }
}
