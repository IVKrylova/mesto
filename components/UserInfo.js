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
  setUserInfo(profileNameSelector, profileProfessionSelector) {
    console.log(this._inputName)

    const profileName = document.querySelector(profileNameSelector);
    const profileProfession = document.querySelector(profileProfessionSelector);

    profileName.textContent = this._inputName.value;
    profileProfession.textContent = this._inputProfession.value;
  }
}


/* // функция установки значений для popup в profile__info
function setValuesPopupProfileInfo() {
  inputName.value = profileName.textContent;
  inputProfession.value = profileProfession.textContent;
} */
