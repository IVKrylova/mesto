export default class UserInfo {
  constructor({ profileNameSelector, profileProfessionSelector }) {
    this._profileName = document.querySelector(profileNameSelector);
    this._profileProfession = document.querySelector(profileProfessionSelector);
  }

  // метод, который возвращает объект с данными пользователя
  getUserInfo() {
    const name = this._profileName.textContent;
    const profession = this._profileProfession.textContent;

    return { name, profession }
  }

  // метод, который принимает новые данные пользователя и добавляет их на страницу
  setUserInfo({ name, profession }) {
    this._profileName.textContent = name;
    this._profileProfession.textContent = profession;
  }
}
