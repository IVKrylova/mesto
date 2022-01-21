export default class UserInfo {
  constructor({ profileNameSelector, profileProfessionSelector }) {
    this._profileName = document.querySelector(profileNameSelector);
    this._profileProfession = document.querySelector(profileProfessionSelector);

    this._profileAvatar = document.querySelector('.profile__avatar-image');
   /*  this._name = data.name;
    this._about = data.about;
    this._avatar = data.avatar; */
  }

  // метод, который возвращает объект с данными пользователя
  getUserInfo() {
    const name = this._profileName.textContent;
    const profession = this._profileProfession.textContent;

    return { name, profession }
  }

  // метод, который принимает новые данные пользователя и добавляет их на страницу
  setUserInfo({ name, about }) {
    this._profileName.textContent = name;
    this._profileProfession.textContent = about;
  }

  // метод редактирования аватара
  editAvatar(avatar) {
    this._profileAvatar.src = avatar;
  }

  // метод установки данных о пользователе
  renderUserInfo(data) {
   /*  document.querySelector(profileNameSelector).textContent = data.name; */
    this._profileName.textContent = data.name;
    this._profileProfession.textContent = data.about;
    /* document.querySelector(profileProfessionSelector).textContent = data.about; */
    /* profileAvatar.src = data.avatar; */
    this.editAvatar(data.avatar);
  }
}
