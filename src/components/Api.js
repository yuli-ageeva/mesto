class Api {
  constructor({baseUrl, headers}) {
    // тело конструктора
    this.baseUrl = baseUrl;
    this.headers = headers;
  }

  getUserInfo() {
    return fetch(this.baseUrl + '/users/me', {
      headers: this.headers
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка при загрузке пользовательской информации: ${res.status}`);
      })

  }

  getCards() {
    return fetch(this.baseUrl + '/cards', {
      headers: this.headers
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка при загрузке карточек: ${res.status}`);
      })
  }

  setNewInfo(data) {
    return fetch(this.baseUrl + '/users/me', {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        name: data.name,
        about: data.description,
      })
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка при обновлении информации: ${res.status}`);
      })
  }

  addNewCard(data) {
    return fetch(this.baseUrl + '/cards', {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      })
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка при добавлении новой карточки: ${res.status}`);
      })
  }

  deleteCard(id) {
    return fetch(this.baseUrl + '/cards/' + id, {
      method: 'DELETE',
      headers: this.headers,
    })
      .then(res => {
        if (res.ok) {
          return
        }
        return Promise.reject(`Ошибка при удалении карточки: ${res.status}`);
      })
  }

  setNewAvatar(data) {
    return fetch(this.baseUrl + '/users/me/avatar', {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка при загрузке аватара: ${res.status}`);
      })
  }

  _setLike(id) {
    return fetch(this.baseUrl + '/cards/' + id + '/likes', {
      method: 'PUT',
      headers: this.headers
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка при загрузке лайков: ${res.status}`);
      })
  }

  _deleteLike(id) {
    return fetch(this.baseUrl + '/cards/' + id + '/likes', {
      method: 'DELETE',
      headers: this.headers
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка при удалении лайка: ${res.status}`);
      })
  }

  toggleLike(id, isLiked) {
    if (isLiked) {
      return this._deleteLike(id)
    } else {
      return this._setLike(id)
    }
  }

}


export const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-64',
  headers: {
    authorization: '40628a77-ac74-4254-98ee-88b5912799a6',
    'Content-Type': 'application/json'
  }
});
