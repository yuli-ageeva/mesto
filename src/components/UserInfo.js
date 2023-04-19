export default class UserInfo {
  constructor({nameSelector, descriptionSelector, avatarSelector}) {
    this._name = document.querySelector(nameSelector);
    this._description = document.querySelector(descriptionSelector);
    this._avatar = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      description: this._description.textContent,
    };
  }

  setUserInfo(data) {
    this._name.textContent = data.name;
    this._description.textContent = data.description;

  }

  setUserAvatar(data) {
    this._avatar.src = data.avatar;
  }
}
